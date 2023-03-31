using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Transaction;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.File;
using TurkcellDigitalSchool.Core.Utilities.File.Model;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Dtos.OrganisationChangeRequestDtos;
using TurkcellDigitalSchool.Entities.Enums;
using TurkcellDigitalSchool.Shared.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Commands
{
    public class UpdateOrganisationChangeRequestCommand : IRequest<Core.Utilities.Results.IResult>
    {
        public string? ContentType { get; set; }

        public UpdateOrganisationInfoChangeRequestDto OrganisationInfoChangeRequest { get; set; }

        public class UpdateOrganisationChangeRequestCommandHandler : IRequestHandler<UpdateOrganisationChangeRequestCommand, Core.Utilities.Results.IResult>
        {
            private readonly IOrganisationInfoChangeRequestRepository _organisationInfoChangeRequestRepository;
            private readonly IOrganisationChangeReqContentRepository _organisationChangeReqContentRepository;
            private readonly IOrganisationRepository _organisationRepository;

            private readonly IFileRepository _fileRepository;
            private readonly IFileService _fileService;
            private readonly IPathHelper _pathHelper;
            private readonly ITokenHelper _tokenHelper;
            public readonly IMapper _mapper;
            public readonly IMediator _mediator;

            private readonly string _filePath = "OrganisationLogo";

            public UpdateOrganisationChangeRequestCommandHandler(IOrganisationInfoChangeRequestRepository organisationInfoChangeRequestRepository, IOrganisationChangeReqContentRepository organisationChangeReqContentRepository,
                IOrganisationRepository organisationRepository, ITokenHelper tokenHelper, IMapper mapper, IFileRepository fileRepository, IFileService fileService, IPathHelper pathHelper, IMediator mediator)
            {
                _organisationInfoChangeRequestRepository = organisationInfoChangeRequestRepository;
                _organisationChangeReqContentRepository = organisationChangeReqContentRepository;
                _fileRepository = fileRepository;
                _fileService = fileService;
                _pathHelper = pathHelper;
                _tokenHelper = tokenHelper;
                _mapper = mapper;
                _mediator = mediator;
            }
            
            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(UpdateOrganisationChangeRequestValidator), Priority = 2)]
            [TransactionScopeAspectAsync]

            public async Task<Core.Utilities.Results.IResult> Handle(UpdateOrganisationChangeRequestCommand request, CancellationToken cancellationToken)
            {

                var entity = await _organisationInfoChangeRequestRepository.GetAsync(x => x.Id == request.OrganisationInfoChangeRequest.Id);
                if (entity == null)
                    return new ErrorResult(Common.Constants.Messages.RecordDoesNotExist);

                if (entity.RequestState != Entities.Enums.OrganisationChangeRequestState.Forwarded)
                    return new ErrorResult(Common.Constants.Messages.ErrorInUpdatingProcess);

                var organisationId = _tokenHelper.GetCurrentOrganisationId();

                var name = request.OrganisationInfoChangeRequest.OrganisationChangeReqContents.FirstOrDefault(w => w.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationName).PropertyValue;

                var organisation = await _organisationRepository.Query().AnyAsync(x => x.Name.Trim().ToLower() == name.Trim().ToLower() && x.Id != organisationId);
                if (organisation)
                    return new ErrorResult(Messages.SameNameAlreadyExist);

                var changeContent = await _organisationChangeReqContentRepository.GetListAsync(x => x.RequestId == request.OrganisationInfoChangeRequest.Id);
                _organisationChangeReqContentRepository.DeleteRange(changeContent);

                var changeRequest = _mapper.Map(request.OrganisationInfoChangeRequest,entity);

                var logo = request.OrganisationInfoChangeRequest.OrganisationChangeReqContents.FirstOrDefault(w => w.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.Logo).PropertyValue;
                if (logo != "" && logo != null && !string.IsNullOrEmpty(request.ContentType))
                {

                    byte[] contentBytes = Encoding.UTF8.GetBytes(logo);

                    MemoryStream stream = new MemoryStream(contentBytes);
                    var filename = Guid.NewGuid().ToString();

                    IFormFile file = new FormFile(stream, 0, contentBytes.Length, "name", filename);

                    string[] logoType = new string[] { "image/jpeg", "image/png" };

                    if (!logoType.Contains(request.ContentType))
                    {
                        return new ErrorResult(Messages.FileTypeError);
                    }
                    if (file.Length > 5000000)
                    {
                        return new ErrorResult(Messages.FileSizeError);
                    }

                    var fullPath = _pathHelper.GetPath(_filePath);
                    var saveFileResult = await _fileService.SaveFile(new SaveFileRequest { File = file, Path = fullPath });
                    if (!saveFileResult.Success)
                    {
                        return new ErrorResult(saveFileResult.Message);
                    }

                    var recordLogo = _fileRepository.Add(new Entities.Concrete.File()
                    {
                        FileType = FileType.OrganisationLogo,
                        FilePath = saveFileResult.Data,
                        FileName = filename,
                        ContentType = request.ContentType
                    });

                    await _fileRepository.SaveChangesAsync();
                    //Üretilen FileId logo içeriðine setleniyor.
                    changeRequest.OrganisationChangeReqContents.FirstOrDefault(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.Logo).PropertyValue = recordLogo.Id.ToString();

                }
                else if (logo != null && string.IsNullOrEmpty(request.ContentType))
                {
                    return new ErrorResult(Messages.FileTypeNull);

                }

                var record = _organisationInfoChangeRequestRepository.Update(changeRequest);
                await _organisationInfoChangeRequestRepository.SaveChangesAsync();

                return new SuccessDataResult<OrganisationInfoChangeRequest>(record, Messages.SuccessfulOperation);
            }
        }
    }
}


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
using TurkcellDigitalSchool.File.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Commands
{
    public class CreateOrganisationChangeRequestCommand : IRequest<Core.Utilities.Results.IResult>
    {
        public string? ContentType { get; set; }
        public AddOrganisationInfoChangeRequestDto OrganisationInfoChangeRequest { get; set; }

        public class CreateOrganisationChangeRequestCommandHandler : IRequestHandler<CreateOrganisationChangeRequestCommand, Core.Utilities.Results.IResult>
        {
            private readonly IOrganisationInfoChangeRequestRepository _organisationInfoChangeRequestRepository;
            private readonly IOrganisationRepository _organisationRepository;
            private readonly IFileRepository _fileRepository;
            private readonly IFileService _fileService;
            private readonly IPathHelper _pathHelper;
            private readonly ITokenHelper _tokenHelper;
            public readonly IMapper _mapper;

            private readonly string _filePath = "OrganisationLogo";

            public CreateOrganisationChangeRequestCommandHandler(IOrganisationInfoChangeRequestRepository organisationInfoChangeRequestRepository, IOrganisationRepository organisationRepository,
                ITokenHelper tokenHelper, IMapper mapper, IFileRepository fileRepository, IFileService fileService, IPathHelper pathHelper)
            {
                _organisationInfoChangeRequestRepository = organisationInfoChangeRequestRepository;
                _organisationRepository = organisationRepository;
                _tokenHelper = tokenHelper;
                _mapper = mapper;
                _fileRepository = fileRepository;
                _fileService = fileService;
                _pathHelper = pathHelper;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(CreateOrganisationChangeRequestValidator), Priority = 2)]
            [TransactionScopeAspectAsync]

            public async Task<Core.Utilities.Results.IResult> Handle(CreateOrganisationChangeRequestCommand request, CancellationToken cancellationToken)
            {
                var organisationId = _tokenHelper.GetCurrentOrganisationId();

                var name = request.OrganisationInfoChangeRequest.OrganisationChangeReqContents.FirstOrDefault(w => w.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationName).PropertyValue;

                var organisation = await _organisationRepository.Query().AnyAsync(x => x.Name.Trim().ToLower() == name.Trim().ToLower() && x.Id != organisationId);
                if (organisation)
                    return new ErrorResult(Messages.SameNameAlreadyExist);

                var entity = _mapper.Map<OrganisationInfoChangeRequest>(request.OrganisationInfoChangeRequest);

                entity.OrganisationId = organisationId;
                entity.RequestDate = DateTime.Now;
                entity.RequestState = Entities.Enums.OrganisationChangeRequestState.Forwarded;
                entity.ResponseState = Entities.Enums.OrganisationChangeResponseState.BeingEvaluated;
                var logo = request.OrganisationInfoChangeRequest.OrganisationChangeReqContents.FirstOrDefault(w => w.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.Logo).PropertyValue;
                if (logo != "" && logo!=null && !string.IsNullOrEmpty(request.ContentType))
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

                    //todo:#MS_DUZENLEMESI   
                    // Bu entity için düzenleme burada yapýlamaz Servis entegrasyonu kullanýlmalý      IFileServices   
                    throw new Exception("Yazýlýmsal düzenleme yapýlmasý");


                    var recordLogo = _fileRepository.Add(new Entities.Concrete.File()
                    {
                        FileType = FileType.OrganisationLogo,
                        FilePath = saveFileResult.Data,
                        FileName = filename,
                        ContentType = request.ContentType
                    });

                    await _fileRepository.SaveChangesAsync();



                    //Üretilen FileId logo içeriðine setleniyor.
                    entity.OrganisationChangeReqContents.FirstOrDefault(x=>x.PropertyEnum== Entities.Enums.OrganisationChangePropertyEnum.Logo).PropertyValue= recordLogo.Id.ToString();

                }
                else if (logo != null && string.IsNullOrEmpty(request.ContentType))
                {
                    return new ErrorResult(Messages.FileTypeNull);

                }
                var record = _organisationInfoChangeRequestRepository.Add(entity);
                await _organisationInfoChangeRequestRepository.SaveChangesAsync();

                return new SuccessDataResult<OrganisationInfoChangeRequest>(record, Messages.SuccessfulOperation);
            }
        }
    }
}


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
using Refit;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants; 
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt; 
using TurkcellDigitalSchool.Integration.IntegrationServices.FileServices;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Commands
{
    [TransactionScope]
    public class UpdateOrganisationChangeRequestCommand : IRequest<Core.Utilities.Results.IResult>
    {
        public string? ContentType { get; set; }

        public UpdateOrganisationInfoChangeRequestDto OrganisationInfoChangeRequest { get; set; }

        public class UpdateOrganisationChangeRequestCommandHandler : IRequestHandler<UpdateOrganisationChangeRequestCommand, Core.Utilities.Results.IResult>
        {
            private readonly IOrganisationInfoChangeRequestRepository _organisationInfoChangeRequestRepository;
            private readonly IOrganisationChangeReqContentRepository _organisationChangeReqContentRepository;
            private readonly IOrganisationRepository _organisationRepository;
            private readonly IFileServices _fileService;
            private readonly ITokenHelper _tokenHelper;
            public readonly IMapper _mapper;
            public readonly IMediator _mediator;


            public UpdateOrganisationChangeRequestCommandHandler(IOrganisationInfoChangeRequestRepository organisationInfoChangeRequestRepository, IOrganisationChangeReqContentRepository organisationChangeReqContentRepository,
                IOrganisationRepository organisationRepository, ITokenHelper tokenHelper, IMapper mapper, IFileServices fileService, IMediator mediator)
            {
                _organisationInfoChangeRequestRepository = organisationInfoChangeRequestRepository;
                _organisationChangeReqContentRepository = organisationChangeReqContentRepository;
                _organisationRepository= organisationRepository;
                _fileService = fileService;
                _tokenHelper = tokenHelper;
                _mapper = mapper;
                _mediator = mediator;
            }
            
            [SecuredOperation]   
            public async Task<Core.Utilities.Results.IResult> Handle(UpdateOrganisationChangeRequestCommand request, CancellationToken cancellationToken)
            {

                var entity = await _organisationInfoChangeRequestRepository.GetAsync(x => x.Id == request.OrganisationInfoChangeRequest.Id);
                if (entity == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                if (entity.RequestState !=  OrganisationChangeRequestState.Forwarded)
                    return new ErrorResult(Messages.ErrorInUpdatingProcess);

                var organisationId = _tokenHelper.GetCurrentOrganisationId();

                var name = request.OrganisationInfoChangeRequest.OrganisationChangeReqContents.FirstOrDefault(w => w.PropertyEnum == OrganisationChangePropertyEnum.OrganisationName).PropertyValue;

                var organisation = await _organisationRepository.Query().AnyAsync(x => x.Name.Trim().ToLower() == name.Trim().ToLower() && x.Id != organisationId);
                if (organisation)
                    return new ErrorResult(Messages.SameNameAlreadyExist);

                var changeContent = await _organisationChangeReqContentRepository.GetListAsync(x => x.RequestId == request.OrganisationInfoChangeRequest.Id);
                _organisationChangeReqContentRepository.DeleteRange(changeContent);

                var changeRequest = _mapper.Map(request.OrganisationInfoChangeRequest,entity);

                var logo = request.OrganisationInfoChangeRequest.OrganisationChangeReqContents.FirstOrDefault(w => w.PropertyEnum == OrganisationChangePropertyEnum.Logo).PropertyValue;
                if (logo != "" && logo != null && !string.IsNullOrEmpty(request.ContentType))
                {

                    byte[] contentBytes = Encoding.UTF8.GetBytes(logo);

                    MemoryStream stream = new MemoryStream(contentBytes);
                    var filename = Guid.NewGuid().ToString();

                    IFormFile file = new FormFile(stream, 0, contentBytes.Length, "name", filename);

                    using (var ms = new MemoryStream())
                    {
                        ms.Position = 0;
                        file.CopyTo(ms);
                        var bytePartFile = new ByteArrayPart(ms.ToArray(), filename, request.ContentType);
                        var resulImageSolution = await _fileService.CreateFileCommand(
                            bytePartFile,
                            FileType.OrganisationLogo.GetHashCode(),
                            filename, "");
                        entity.OrganisationChangeReqContents.FirstOrDefault(x => x.PropertyEnum == OrganisationChangePropertyEnum.Logo).PropertyValue = resulImageSolution.Data.Id.ToString();
                    }
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


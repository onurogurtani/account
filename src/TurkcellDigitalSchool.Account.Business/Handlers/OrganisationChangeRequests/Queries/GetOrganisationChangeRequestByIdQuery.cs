using System;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Integration.IntegrationServices.FileServices;
using TurkcellDigitalSchool.Integration.IntegrationServices.FileServices.Model.Request;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Queries
{
    [LogScope]
    public class GetOrganisationChangeRequestByIdQuery : IRequest<IDataResult<GetOrganisationInfoChangeRequestDto>>
    {
        public long Id { get; set; }

        public class GetOrganisationChangeRequestByIdQueryHandler : IRequestHandler<GetOrganisationChangeRequestByIdQuery, IDataResult<GetOrganisationInfoChangeRequestDto>>
        {
            private readonly IOrganisationInfoChangeRequestRepository _organisationInfoChangeRequestRepository;
            private readonly ICityRepository _cityRepository;
            private readonly ICountyRepository _countyRepository;
            private readonly IFileServices _fileService;
            private readonly IMapper _mapper;

            public GetOrganisationChangeRequestByIdQueryHandler(IOrganisationInfoChangeRequestRepository organisationInfoChangeRequestRepository, ICityRepository cityRepository,
                ICountyRepository countyRepository, IFileServices fileService, IMapper mapper)
            {
                _organisationInfoChangeRequestRepository = organisationInfoChangeRequestRepository;
                _cityRepository = cityRepository;
                _countyRepository = countyRepository;
                _fileService = fileService;
                _mapper = mapper;
            }
             
            [SecuredOperation]
            public virtual async Task<IDataResult<GetOrganisationInfoChangeRequestDto>> Handle(GetOrganisationChangeRequestByIdQuery request, CancellationToken cancellationToken)
            {
                var query = _organisationInfoChangeRequestRepository.Query()
                    .Include(x => x.Organisation).ThenInclude(x => x.OrganisationType)
                    .Include(x => x.OrganisationChangeReqContents)
                    .AsQueryable();

                var data = await query.FirstOrDefaultAsync(x => x.Id == request.Id);

                if (data == null)
                    return new ErrorDataResult<GetOrganisationInfoChangeRequestDto>(null, Messages.RecordIsNotFound);

                var organisationInfoDto = _mapper.Map<GetOrganisationInfoChangeRequestDto>(data);

                var getCity = await _cityRepository.GetAsync(x => x.Id == organisationInfoDto.Organisation.CityId);
                organisationInfoDto.CityName = getCity.Name;
                var getCounty = await _countyRepository.GetAsync(x => x.Id == organisationInfoDto.Organisation.CountyId);
                organisationInfoDto.CountyName = getCounty.Name;

                var logo = organisationInfoDto.OrganisationChangeReqContents.FirstOrDefault(w => w.PropertyEnum == OrganisationChangePropertyEnum.Logo).PropertyValue;
                var fileResult = _fileService.GetFileQuery(new GetFileIntegrationRequest { Id = Convert.ToInt32(logo) }).Result.Data;

                if (fileResult != null)
                {
                    string decodedString = Encoding.UTF8.GetString(fileResult.File);
                    organisationInfoDto.OrganisationChangeReqContents.FirstOrDefault(x => x.PropertyEnum == OrganisationChangePropertyEnum.Logo).PropertyValue = decodedString;
                }

                return new SuccessDataResult<GetOrganisationInfoChangeRequestDto>(organisationInfoDto, Messages.SuccessfulOperation);
            }
        }
    }
}
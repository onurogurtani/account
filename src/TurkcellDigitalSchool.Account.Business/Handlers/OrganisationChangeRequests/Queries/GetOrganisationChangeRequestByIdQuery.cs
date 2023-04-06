using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos.OrganisationChangeRequestDtos; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Queries
{
    public class GetOrganisationChangeRequestByIdQuery : IRequest<IDataResult<GetOrganisationInfoChangeRequestDto>>
    {
        public long Id { get; set; }

        public class GetOrganisationChangeRequestByIdQueryHandler : IRequestHandler<GetOrganisationChangeRequestByIdQuery, IDataResult<GetOrganisationInfoChangeRequestDto>>
        {
            private readonly IOrganisationInfoChangeRequestRepository _organisationInfoChangeRequestRepository;
            private readonly ICityRepository _cityRepository;
            private readonly ICountyRepository _countyRepository;
            private readonly IMapper _mapper;

            public GetOrganisationChangeRequestByIdQueryHandler(IOrganisationInfoChangeRequestRepository organisationInfoChangeRequestRepository, ICityRepository cityRepository, ICountyRepository countyRepository, IMapper mapper)
            {
                _organisationInfoChangeRequestRepository = organisationInfoChangeRequestRepository;
                _cityRepository = cityRepository;
                _countyRepository = countyRepository;
                _mapper = mapper;
            }

            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public virtual async Task<IDataResult<GetOrganisationInfoChangeRequestDto>> Handle(GetOrganisationChangeRequestByIdQuery request, CancellationToken cancellationToken)
            {
                var query = _organisationInfoChangeRequestRepository.Query()
                    .Include(x => x.Organisation).ThenInclude(x=>x.OrganisationType)
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

                return new SuccessDataResult<GetOrganisationInfoChangeRequestDto>(organisationInfoDto, Messages.SuccessfulOperation);
            }
        }
    }
}
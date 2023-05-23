using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries
{
    [LogScope]
    public class GetOrganisationQuery : IRequest<IDataResult<OrganisationDto>>
    {
        public long Id { get; set; }

        [MessageClassAttr("Kurum Görüntüleme")]
        public class GetOrganisationQueryHandler : IRequestHandler<GetOrganisationQuery, IDataResult<OrganisationDto>>
        {
            private readonly IOrganisationRepository _organisationRepository;
            private readonly IUserRepository _userRepository;
            private readonly ICityRepository _cityRepository;
            private readonly ICountyRepository _countyRepository;
            private readonly IMapper _mapper;

            public GetOrganisationQueryHandler(IOrganisationRepository organisationRepository, IUserRepository userRepository, ICityRepository cityRepository, ICountyRepository countyRepository, IMapper mapper)
            {
                _organisationRepository = organisationRepository;
                _userRepository = userRepository;
                _cityRepository = cityRepository;
                _countyRepository = countyRepository;
                _mapper = mapper;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
              
            [SecuredOperation]
            public virtual async Task<IDataResult<OrganisationDto>> Handle(GetOrganisationQuery request, CancellationToken cancellationToken)
            {
                var query = _organisationRepository.Query()
                    .Include(x => x.OrganisationType)
                    .AsQueryable();

                var data = await query.FirstOrDefaultAsync(x => x.Id == request.Id);

                if (data == null)
                    return new ErrorDataResult<OrganisationDto>(null, RecordIsNotFound.PrepareRedisMessage());

                var organisationDto = _mapper.Map<OrganisationDto>(data);

                organisationDto.SegmentName = Enum.GetName(organisationDto.SegmentType).ToString();
                var getCity = await _cityRepository.GetAsync(x => x.Id == organisationDto.CityId);
                organisationDto.CityName = getCity.Name;
                var getCounty = await _countyRepository.GetAsync(x => x.Id == organisationDto.CountyId);
                organisationDto.CountyName = getCounty.Name;

                if (organisationDto.UpdateUserId != null)
                {
                    var user = await _userRepository.GetAsync(x => x.Id == (long)organisationDto.UpdateUserId);
                    organisationDto.UpdateUserFullName = user.Name + " " + user.SurName;
                }
                if (organisationDto.InsertUserId != null)
                {
                    var user = await _userRepository.GetAsync(x => x.Id == (long)organisationDto.InsertUserId);
                    organisationDto.InsertUserFullName = user.Name + " " + user.SurName;
                }

                return new SuccessDataResult<OrganisationDto>(organisationDto, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}
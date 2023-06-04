using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries
{
    [LogScope]
    public class GetUserOrganisationInfoByOrganisationIdQuery : IRequest<DataResult<OrganisationUserDto>>
    {
        [MessageClassAttr("Kullanýcý Kurum Görüntüleme")]
        public class GetUserOrganisationInfoByOrganisationIdQueryHandler : IRequestHandler<GetUserOrganisationInfoByOrganisationIdQuery, DataResult<OrganisationUserDto>>
        {
            private readonly ICityRepository _cityRepository;
            private readonly ICountyRepository _countyRepository;
            private readonly IMediator _mediator;
            private readonly ITokenHelper _tokenHelper;

            public GetUserOrganisationInfoByOrganisationIdQueryHandler(ICityRepository cityRepository, ICountyRepository countyRepository, IMediator mediator, ITokenHelper tokenHelper)
            {

                _cityRepository = cityRepository;
                _countyRepository = countyRepository;
                _mediator = mediator;
                _tokenHelper = tokenHelper;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string AutorizationRoleError = Messages.AutorizationRoleError;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
             
            [SecuredOperation]
            public virtual async Task<DataResult<OrganisationUserDto>> Handle(GetUserOrganisationInfoByOrganisationIdQuery request, CancellationToken cancellationToken)
            {
                var organisationId = _tokenHelper.GetCurrentOrganisationId();

                var checkClaim = await _mediator.Send(new GetOrganisationByUserIdQuery { }, cancellationToken);

                var res = checkClaim.Data.OrganisationUsers.Any(x => x.Id == organisationId);

                if (!res)
                    return new ErrorDataResult<OrganisationUserDto>(null, AutorizationRoleError.PrepareRedisMessage());

                var result = checkClaim.Data.OrganisationUsers.Where(x => x.Id == organisationId).Select(x => new OrganisationUserDto
                {
                    Id = x.Id,
                    CrmId = x.CrmId,
                    Name = x.Name,
                    CityId = x.CityId,
                    CountyId = x.CountyId,
                    LicenceNumber = x.LicenceNumber,
                    OrganisationAddress = x.OrganisationAddress,
                    OrganisationMail = x.OrganisationMail,
                    OrganisationTypeId = x.OrganisationTypeId,
                    OrganisationWebSite = x.OrganisationWebSite,
                    OrganisationImageId = x.OrganisationImageId,
                    PackageId = x.PackageId,
                    PackageName = x.PackageName,
                    ContractNumber = x.ContractNumber,
                    PackageKind = x.PackageKind,
                    OrganisationType = x.OrganisationType,
                    CityName = _cityRepository.GetAsync(y => y.Id == x.CityId).Result.Name,
                    CountyName = _countyRepository.GetAsync(z => z.Id == x.CountyId).Result.Name
                }).FirstOrDefault();

                return new SuccessDataResult<OrganisationUserDto>(result, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}


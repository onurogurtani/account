using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Admins.Queries
{
    [LogScope] 
    public class GetOrganisationByAdminTypeQuery : IRequest<DataResult<OrganisationUsersDto>>
    {
        [MessageClassAttr("Admin Tipine Göre Kullanýcý Kurumlarýný Listeleme")]
        public class GetOrganisationByAdminTypeQueryHandler : IRequestHandler<GetOrganisationByAdminTypeQuery, DataResult<OrganisationUsersDto>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IOrganisationUserRepository _organisationUserRepository;
            private readonly IOrganisationRepository _organisationRepository;
            private readonly ITokenHelper _tokenHelper;

            public GetOrganisationByAdminTypeQueryHandler(IUserRepository userRepository, IOrganisationUserRepository organisationUserRepository, IOrganisationRepository organisationRepository, ITokenHelper tokenHelper)
            {
                _userRepository = userRepository;
                _organisationUserRepository = organisationUserRepository;
                _organisationRepository = organisationRepository;
                _tokenHelper = tokenHelper;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public virtual async Task<DataResult<OrganisationUsersDto>> Handle(GetOrganisationByAdminTypeQuery request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();
                var user = await _userRepository.GetAsync(w => w.Id == userId);

                var data = new List<Organisation>();

                if (UserType.Admin == user.UserType)
                {
                    data = (List<Organisation>)await _organisationRepository.GetListAsync();
                }

                if (UserType.FranchiseAdmin == user.UserType || UserType.OrganisationAdmin == user.UserType)
                {
                    var organisationUser = _organisationUserRepository.Query()
                                .Include(x => x.User)
                                .Include(x => x.Organisation).ThenInclude(x => x.OrganisationType)
                                .Where(x => x.UserId == userId)
                                .AsQueryable();
                    data = organisationUser.Select(s => s.Organisation).Distinct().ToList();
                }

                var organisationList = new List<OrganisationUserDto>();
                foreach (var organisation in data)
                {
                    organisationList.Add(new OrganisationUserDto
                    {
                        Id = organisation.Id,
                        CrmId = organisation.CrmId,
                        Name = organisation.Name,
                        CityId = organisation.CityId,
                        CountyId = organisation.CountyId,
                        LicenceNumber = organisation.LicenceNumber,
                        OrganisationAddress = organisation.OrganisationAddress,
                        OrganisationMail = organisation.OrganisationMail,
                        OrganisationTypeId = organisation.OrganisationTypeId,
                        OrganisationWebSite = organisation.OrganisationWebSite,
                        OrganisationImageId = organisation.OrganisationImageId,
                        PackageId = organisation.PackageId,
                        PackageName = organisation.PackageName,
                        ContractNumber = organisation.ContractNumber,
                        PackageKind = organisation.PackageKind,
                        OrganisationType = organisation.OrganisationType,
                    });
                }

                var organisationUsersDto = new OrganisationUsersDto
                {
                    OrganisationUsers = organisationList,
                    UserId = userId,
                };

                return new SuccessDataResult<OrganisationUsersDto>(organisationUsersDto, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}
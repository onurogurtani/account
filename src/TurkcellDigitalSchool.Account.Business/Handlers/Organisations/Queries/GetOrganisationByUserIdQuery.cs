using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Entities.Dtos.OrganisationDtos;
using TurkcellDigitalSchool.Entities.Dtos.OrganisationUserDtos;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries
{
    public class GetOrganisationByUserIdQuery : IRequest<IDataResult<OrganisationUsersDto>>
    {

        public class GetOrganisationByUserIdQueryHandler : IRequestHandler<GetOrganisationByUserIdQuery, IDataResult<OrganisationUsersDto>>
        {
            private readonly IOrganisationUserRepository _organisationUserRepository;
            private readonly ITokenHelper _tokenHelper;

            public GetOrganisationByUserIdQueryHandler(IOrganisationUserRepository organisationUserRepository, ITokenHelper tokenHelper)
            {
                _organisationUserRepository = organisationUserRepository;
                _tokenHelper = tokenHelper;
            }

            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public virtual async Task<IDataResult<OrganisationUsersDto>> Handle(GetOrganisationByUserIdQuery request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();

                var query = _organisationUserRepository.Query()
                    .Include(x => x.User)
                    .Include(x => x.Organisation).ThenInclude(x => x.OrganisationType)
                    .Where(x => x.UserId == userId)
                    .AsQueryable();

                var data = await query.ToListAsync();

                if (data == null || data.Count() ==0)
                    return new ErrorDataResult<OrganisationUsersDto>(null, Messages.RecordIsNotFound);

                var organisationList = new List<OrganisationUserDto>();

                foreach (var organisation in data)
                {
                    organisationList.Add(new OrganisationUserDto
                    {
                        Id = organisation.Organisation.Id,
                        CrmId = organisation.Organisation.CrmId,
                        Name = organisation.Organisation.Name,
                        CityId = organisation.Organisation.CityId,
                        CountyId = organisation.Organisation.CountyId,
                        LicenceNumber = organisation.Organisation.LicenceNumber,
                        OrganisationAddress = organisation.Organisation.OrganisationAddress,
                        OrganisationMail = organisation.Organisation.OrganisationMail,
                        OrganisationTypeId = organisation.Organisation.OrganisationTypeId,
                        OrganisationWebSite = organisation.Organisation.OrganisationWebSite,
                        OrganisationImageId = organisation.Organisation.OrganisationImageId,
                        PackageId = organisation.Organisation.PackageId,
                        PackageKind = organisation.Organisation.PackageKind,
                        OrganisationType = organisation.Organisation.OrganisationType,
                    });
                }

                var organisationUsersDto = new OrganisationUsersDto
                {
                    OrganisationUsers = organisationList,
                    UserId = userId,
                };

                return new SuccessDataResult<OrganisationUsersDto>(organisationUsersDto, Messages.SuccessfulOperation);
            }
        }
    }
}
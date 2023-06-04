using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.Queries
{
    public class PassiveCheckControlRoleQuery : IRequest<DataResult<RolePassiveCheckResult>>
    {
        public long RoleId { get; set; }

        [MessageClassAttr("Pasif Rol Kontrolü")]
        public class PassiveCheckControlRoleQueryHandler : IRequestHandler<PassiveCheckControlRoleQuery, DataResult<RolePassiveCheckResult>>
        {
            private readonly IUserRoleRepository _userRoleRepository;
            private readonly IPackageRoleRepository _packageRoleRepository;
            private readonly IMediator _mediator;

            public PassiveCheckControlRoleQueryHandler(IUserRoleRepository userRoleRepository, IPackageRoleRepository packageRoleRepository, IMediator mediator)
            {
                _userRoleRepository = userRoleRepository;
                _packageRoleRepository = packageRoleRepository;
                _mediator = mediator;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            public async Task<DataResult<RolePassiveCheckResult>> Handle(PassiveCheckControlRoleQuery request, CancellationToken cancellationToken)
            {
                RolePassiveCheckResult result = new RolePassiveCheckResult();

                var role = await _mediator.Send(new GetRoleQuery { Id = request.RoleId }, cancellationToken);
                if (role.Data.RecordStatus == RecordStatus.Passive)
                {
                    result.IsPassiveCheck = false;
                    result.Message = "Bu rol zaten pasif.";
                    return new SuccessDataResult<RolePassiveCheckResult>(result, SuccessfulOperation.PrepareRedisMessage());
                }

                var userRoles = (ICollection<UserRole>)await _userRoleRepository.GetListAsync(x => x.RoleId == request.RoleId && x.User.Status == true);

                var packageRoles = (ICollection<PackageRole>)await _packageRoleRepository.GetListAsync(x => x.RoleId == request.RoleId && x.Package.IsActive == false && x.Package.FinishDate > DateTime.Now);

                result.IsPassiveCheck = true;

                if (packageRoles.Count > 0 || userRoles.Count > 0)
                {
                    result.Message = "Bu rolü";

                    if (packageRoles.Count > 0)
                        result.Message += $" {packageRoles.Count} aktif paket";

                    if (userRoles.Count > 0)
                        result.Message += $" {userRoles.Count} aktif kullanıcı";

                    result.Message += " kullanıyor.";
                    result.IsPassiveCheck = false;
                }
                return new SuccessDataResult<RolePassiveCheckResult>(result, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

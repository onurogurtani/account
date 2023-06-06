using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Parents.Queries
{
    [LogScope]
    [SecuredOperation]
    public class GetParentPackageInformationQuery : IRequest<DataResult<List<PackageInfoDto>>>
    {
        public long? UserId { get; set; }
        public class GetStudentPackageInformationQueryHandler : IRequestHandler<GetParentPackageInformationQuery, DataResult<List<PackageInfoDto>>>
        {
            private readonly IUserService _userService;

            public GetStudentPackageInformationQueryHandler(IUserService userService)
            {
                _userService = userService;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;

            public virtual async Task<DataResult<List<PackageInfoDto>>> Handle(GetParentPackageInformationQuery request, CancellationToken cancellationToken)
            {
                if (request.UserId == null)
                {
                    return new ErrorDataResult<List<PackageInfoDto>>(RecordIsNotFound.PrepareRedisMessage());
                }
                return new SuccessDataResult<List<PackageInfoDto>>(_userService.GetByParentPackageInformation((int)request.UserId));
            }

        }
    }
}

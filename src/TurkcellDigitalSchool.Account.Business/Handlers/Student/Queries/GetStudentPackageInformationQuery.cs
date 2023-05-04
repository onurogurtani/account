using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Queries
{
    public class GetStudentPackageInformationQuery : IRequest<IDataResult<PackageInfoDto>>
    {
        public long? UserId { get; set; }
        public class GetStudentPackageInformationQueryHandler : IRequestHandler<GetStudentPackageInformationQuery, IDataResult<PackageInfoDto>>
        {
            private readonly IUserService _userService;

            public GetStudentPackageInformationQueryHandler(IUserService userService)
            {
                _userService = userService;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;

            public virtual async Task<IDataResult<PackageInfoDto>> Handle(GetStudentPackageInformationQuery request, CancellationToken cancellationToken)
            {
                if (request.UserId == null)
                {
                    return new ErrorDataResult<PackageInfoDto>(RecordIsNotFound.PrepareRedisMessage());
                }
                return new SuccessDataResult<PackageInfoDto>(_userService.GetByStudentPackageInformation((int)request.UserId));
            }

        }
    }
}

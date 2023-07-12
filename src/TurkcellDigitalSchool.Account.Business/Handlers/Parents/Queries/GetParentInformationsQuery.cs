using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Parents.Queries
{
    [LogScope]
    [SecuredOperationScope]
    public class GetParentInformationsQuery : IRequest<DataResult<UserProfileInfoDto>>
    {
        public class GetStudentInformationsQueryHandler : IRequestHandler<GetParentInformationsQuery, DataResult<UserProfileInfoDto>>
        {
            private readonly IUserService _userService;
            private readonly ITokenHelper _tokenHelper;

            public GetStudentInformationsQueryHandler(IUserService userService, ITokenHelper tokenHelper)
            {
                _userService = userService;
                _tokenHelper = tokenHelper;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            public virtual async Task<DataResult<UserProfileInfoDto>> Handle(GetParentInformationsQuery request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();
                if (userId == 0)
                {
                    return new ErrorDataResult<UserProfileInfoDto>(RecordIsNotFound.PrepareRedisMessage());
                }
                await _userService.SetDefaultSettingValues(userId);

                var packages = _userService.GetByStudentPackageInformation((int)userId);
                var parent = _userService.GetByStudentParentInfoInformation((int)userId);
                var personal = _userService.GetByPersonalInformation((int)userId);
                var settings = _userService.GetByUserSettingsInfoInformation(userId);

                var studentInfoResult = new UserProfileInfoDto
                {
                    Packages = packages,
                    Parents = parent,
                    Personal = personal,
                    Settings = settings
                };
                return new SuccessDataResult<UserProfileInfoDto>(studentInfoResult);
            }

        }
    }
}

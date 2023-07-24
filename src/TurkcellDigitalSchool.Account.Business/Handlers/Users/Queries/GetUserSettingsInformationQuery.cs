using MediatR;
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

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    [LogScope]

    public class GetUserSettingsInformationQuery : IRequest<DataResult<SettingsInfoDto>>
    {
        public class GetStudentSettingsInformationQueryHandler : IRequestHandler<GetUserSettingsInformationQuery, DataResult<SettingsInfoDto>>
        {
            private readonly IUserService _userService;
            private readonly ITokenHelper _tokenHelper;

            public GetStudentSettingsInformationQueryHandler(IUserService userService, ITokenHelper tokenHelper)
            {
                _userService = userService;
                _tokenHelper = tokenHelper;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            public virtual async Task<DataResult<SettingsInfoDto>> Handle(GetUserSettingsInformationQuery request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();

                if (userId == 0)
                {
                    return new ErrorDataResult<SettingsInfoDto>(RecordIsNotFound.PrepareRedisMessage());
                }
                await _userService.SetDefaultSettingValues(userId);
                return new SuccessDataResult<SettingsInfoDto>(await _userService.GetByUserSettingsInfoInformation(userId));
            }

        }
    }
}

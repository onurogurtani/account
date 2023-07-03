using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Queries
{
    [LogScope]
     
    public class GetStudentSettingsInformationQuery : IRequest<DataResult<SettingsInfoDto>>
    {
        public long? UserId { get; set; }
        public class GetStudentSettingsInformationQueryHandler : IRequestHandler<GetStudentSettingsInformationQuery, DataResult<SettingsInfoDto>>
        {
            private readonly IUserService _userService;

            public GetStudentSettingsInformationQueryHandler(IUserService userService)
            {
                _userService = userService;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            public virtual async Task<DataResult<SettingsInfoDto>> Handle(GetStudentSettingsInformationQuery request, CancellationToken cancellationToken)
            {
                if (request.UserId == null)
                {
                    return new ErrorDataResult<SettingsInfoDto>(RecordIsNotFound.PrepareRedisMessage());
                }
                await _userService.SetDefaultSettingValues((long)request.UserId);
                return new SuccessDataResult<SettingsInfoDto>(_userService.GetByStudentSettingsInfoInformation((long)request.UserId));
            }

        }
    }
}

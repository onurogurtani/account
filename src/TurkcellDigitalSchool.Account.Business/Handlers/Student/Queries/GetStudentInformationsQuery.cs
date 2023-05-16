using MediatR;
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
    public class GetStudentInformationsQuery : IRequest<IDataResult<StudentInfoDto>>
    {
        public long? UserId { get; set; }
        public class GetStudentInformationsQueryHandler : IRequestHandler<GetStudentInformationsQuery, IDataResult<StudentInfoDto>>
        {
            private readonly IUserService _userService;

            public GetStudentInformationsQueryHandler(IUserService userService)
            {
                _userService = userService;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            public virtual async Task<IDataResult<StudentInfoDto>> Handle(GetStudentInformationsQuery request, CancellationToken cancellationToken)
            {
                if (request.UserId == null)
                {
                    return new ErrorDataResult<StudentInfoDto>(RecordIsNotFound.PrepareRedisMessage());
                }
                await _userService.SetDefaultSettingValues((long)request.UserId);

                var education = _userService.GetByStudentEducationInformation((int)request.UserId);
                var packages = _userService.GetByStudentPackageInformation((int)request.UserId);
                var parent = _userService.GetByStudentParentInfoInformation((int)request.UserId);
                var personal = _userService.GetByStudentPersonalInformation((int)request.UserId);
                var settings = _userService.GetByStudentSettingsInfoInformation((long)request.UserId);

                var studentInfoResult = new StudentInfoDto
                {
                    Education = education,
                    Packages = packages,
                    Parents = parent,
                    Personal = personal,
                    Settings = settings
                };
                return new SuccessDataResult<StudentInfoDto>(studentInfoResult);
            }

        }
    }
}

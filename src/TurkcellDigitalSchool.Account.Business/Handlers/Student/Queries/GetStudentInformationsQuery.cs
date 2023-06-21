﻿using MediatR;
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

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Queries
{
    [LogScope]
    [SecuredOperationScope]
    public class GetStudentInformationsQuery : IRequest<DataResult<StudentInfoDto>>
    {
        public long? UserId { get; set; }
        public class GetStudentInformationsQueryHandler : IRequestHandler<GetStudentInformationsQuery, DataResult<StudentInfoDto>>
        {
            private readonly IUserService _userService;

            public GetStudentInformationsQueryHandler(IUserService userService)
            {
                _userService = userService;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            public virtual async Task<DataResult<StudentInfoDto>> Handle(GetStudentInformationsQuery request, CancellationToken cancellationToken)
            {
                if (request.UserId == null)
                {
                    return new ErrorDataResult<StudentInfoDto>(RecordIsNotFound.PrepareRedisMessage());
                }
                await _userService.SetDefaultSettingValues((long)request.UserId);

                var packages = _userService.GetByStudentPackageInformation((int)request.UserId);
                var parent = _userService.GetByStudentParentInfoInformation((int)request.UserId);
                var personal = _userService.GetByStudentPersonalInformation((int)request.UserId);
                var settings = _userService.GetByStudentSettingsInfoInformation((long)request.UserId);

                var studentInfoResult = new StudentInfoDto
                {
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

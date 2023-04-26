﻿using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos.UserDtos;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Queries
{
    public class GetStudentSettingsInformationQuery : IRequest<IDataResult<SettingsInfoDto>>
    {
        public long? UserId { get; set; }
        public class GetStudentSettingsInformationQueryHandler : IRequestHandler<GetStudentSettingsInformationQuery, IDataResult<SettingsInfoDto>>
        {
            private readonly IUserService _userService;

            public GetStudentSettingsInformationQueryHandler(IUserService userService)
            {
                _userService = userService;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            public virtual async Task<IDataResult<SettingsInfoDto>> Handle(GetStudentSettingsInformationQuery request, CancellationToken cancellationToken)
            {
                if (request.UserId == null)
                {
                    return new ErrorDataResult<SettingsInfoDto>(RecordIsNotFound.PrepareRedisMessage());
                }
                return new SuccessDataResult<SettingsInfoDto>(_userService.GetByStudentSettingsInfoInformation((int)request.UserId));
            }

        }
    }
}

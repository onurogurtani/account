﻿using MediatR;
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
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Queries
{
    [LogScope]
    [SecuredOperationScope]
    public class GetStudentPersonalInformationQuery : IRequest<DataResult<PersonalInfoDto>>
    {
        public long? UserId { get; set; }
        public class GetStudentPersonalInformationQueryHandler : IRequestHandler<GetStudentPersonalInformationQuery, DataResult<PersonalInfoDto>>
        {
            private readonly IUserService _userService;

            public GetStudentPersonalInformationQueryHandler(IUserService userService)
            {
                _userService = userService;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;

            public virtual async Task<DataResult<PersonalInfoDto>> Handle(GetStudentPersonalInformationQuery request, CancellationToken cancellationToken)
            {
                if (request.UserId == null)
                {
                    return new ErrorDataResult<PersonalInfoDto>(RecordIsNotFound.PrepareRedisMessage());
                }
                return new SuccessDataResult<PersonalInfoDto>(_userService.GetByStudentPersonalInformation((int)request.UserId));
            }

        }
    }
}

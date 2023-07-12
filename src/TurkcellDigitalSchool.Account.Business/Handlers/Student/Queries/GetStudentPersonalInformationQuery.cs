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
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Queries
{
    [LogScope]
     
    public class GetStudentPersonalInformationQuery : IRequest<DataResult<PersonalInfoDto>>
    {
        public class GetStudentPersonalInformationQueryHandler : IRequestHandler<GetStudentPersonalInformationQuery, DataResult<PersonalInfoDto>>
        {
            private readonly IUserService _userService;
            private readonly ITokenHelper _tokenHelper;


            public GetStudentPersonalInformationQueryHandler(IUserService userService, ITokenHelper tokenHelper)
            {
                _userService = userService;
                _tokenHelper = tokenHelper;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;

            public virtual async Task<DataResult<PersonalInfoDto>> Handle(GetStudentPersonalInformationQuery request, CancellationToken cancellationToken)
            {

                var userId = _tokenHelper.GetUserIdByCurrentToken();
                if (userId == 0)
                {
                    return new ErrorDataResult<PersonalInfoDto>(RecordIsNotFound.PrepareRedisMessage());
                }
                return new SuccessDataResult<PersonalInfoDto>(_userService.GetByPersonalInformation(userId));

               
            }

        }
    }
}

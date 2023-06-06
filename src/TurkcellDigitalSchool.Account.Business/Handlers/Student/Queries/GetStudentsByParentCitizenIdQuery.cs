﻿using MediatR;
using System.Collections.Generic;
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

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Queries
{
    [LogScope]
    [SecuredOperation]
    public class GetStudentsByParentCitizenIdQuery : IRequest<DataResult<List<ParentInfoDto>>>
    {
        public long? CitizenId { get; set; }
        public class GetStudentsByParentCitizenIdQueryHandler : IRequestHandler<GetStudentsByParentCitizenIdQuery, DataResult<List<ParentInfoDto>>>
        {
            private readonly IUserService _userService;

            public GetStudentsByParentCitizenIdQueryHandler(IUserService userService)
            {
                _userService = userService;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;

            public virtual async Task<DataResult<List<ParentInfoDto>>> Handle(GetStudentsByParentCitizenIdQuery request, CancellationToken cancellationToken)
            {
                if (request.CitizenId == null)
                {
                    return new ErrorDataResult<List<ParentInfoDto>>(RecordIsNotFound.PrepareRedisMessage());
                }
                return new SuccessDataResult<List<ParentInfoDto>>(_userService.GetStudentsByParentCitizenId(request.CitizenId));
            }

        }
    }
}

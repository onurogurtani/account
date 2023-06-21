using MediatR;
using System.Collections.Generic;
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
    public class GetStudentsByParentIdQuery : IRequest<DataResult<List<ParentInfoDto>>>
    {
        public long? ParentId { get; set; }
        public class GetStudentsByParentIdQueryHandler : IRequestHandler<GetStudentsByParentIdQuery, DataResult<List<ParentInfoDto>>>
        {
            private readonly IUserService _userService;

            public GetStudentsByParentIdQueryHandler(IUserService userService)
            {
                _userService = userService;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;

            public virtual async Task<DataResult<List<ParentInfoDto>>> Handle(GetStudentsByParentIdQuery request, CancellationToken cancellationToken)
            {
                if (request.ParentId == null)
                {
                    return new ErrorDataResult<List<ParentInfoDto>>(RecordIsNotFound.PrepareRedisMessage());
                }
                return new SuccessDataResult<List<ParentInfoDto>>(_userService.GetStudentsByParentId(request.ParentId));
            }

        }
    }
}

using MediatR;
using System.Collections.Generic;
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
    public class GetStudentParentInformationQuery : IRequest<DataResult<List<ParentInfoDto>>>
    {
        public long? UserId { get; set; }
        public class GetStudentParentInformationQueryHandler : IRequestHandler<GetStudentParentInformationQuery, DataResult<List<ParentInfoDto>>>
        {
            private readonly IUserService _userService;

            public GetStudentParentInformationQueryHandler(IUserService userService)
            {
                _userService = userService;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;

            public virtual async Task<DataResult<List<ParentInfoDto>>> Handle(GetStudentParentInformationQuery request, CancellationToken cancellationToken)
            {
                if (request.UserId == null)
                {
                    return new ErrorDataResult<List<ParentInfoDto>>(RecordIsNotFound.PrepareRedisMessage());
                }
                return new SuccessDataResult<List<ParentInfoDto>>(_userService.GetByStudentParentInfoInformation((int)request.UserId));
            }

        }
    }
}

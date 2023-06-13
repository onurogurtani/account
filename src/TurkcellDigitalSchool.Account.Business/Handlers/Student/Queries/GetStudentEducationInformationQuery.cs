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
    [SecuredOperationScope]
    public class GetStudentEducationInformationQuery : IRequest<DataResult<EducationInfoDto>>
    {
        public long? UserId { get; set; }
        public class GetStudentEducationInformationQueryHandler : IRequestHandler<GetStudentEducationInformationQuery, DataResult<EducationInfoDto>>
        {
            private readonly IUserService _userService;

            public GetStudentEducationInformationQueryHandler(IUserService userService)
            {
                _userService = userService;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;

            public virtual async Task<DataResult<EducationInfoDto>> Handle(GetStudentEducationInformationQuery request, CancellationToken cancellationToken)
            {
                //TODO userId tokenden alınacak.
                if (request.UserId == null)
                {
                    return new ErrorDataResult<EducationInfoDto>(RecordIsNotFound.PrepareRedisMessage());
                }
                return new SuccessDataResult<EducationInfoDto>(_userService.GetByStudentEducationInformation((int)request.UserId));
            }

        }
    }
   
}

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
    public class GetStudentEducationInformationQuery : IRequest<IDataResult<EducationInfoDto>>
    {
        public long? UserId { get; set; }
        public class GetStudentEducationInformationQueryHandler : IRequestHandler<GetStudentEducationInformationQuery, IDataResult<EducationInfoDto>>
        {
            private readonly IUserService _userService;

            public GetStudentEducationInformationQueryHandler(IUserService userService)
            {
                _userService = userService;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;

            public virtual async Task<IDataResult<EducationInfoDto>> Handle(GetStudentEducationInformationQuery request, CancellationToken cancellationToken)
            {
                if (request.UserId == null)
                {
                    return new ErrorDataResult<EducationInfoDto>(RecordIsNotFound.PrepareRedisMessage());
                }
                return new SuccessDataResult<EducationInfoDto>(_userService.GetByStudentEducationInformation((int)request.UserId));
            }

        }
    }
   
}

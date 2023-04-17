using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos.UserDtos;

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
            public virtual async Task<IDataResult<EducationInfoDto>> Handle(GetStudentEducationInformationQuery request, CancellationToken cancellationToken)
            {
                if (request.UserId == null)
                {
                    return new ErrorDataResult<EducationInfoDto>("Boş olamaz.");
                }
                return new SuccessDataResult<EducationInfoDto>(_userService.GetByStudentEducationInformation((int)request.UserId));
            }

        }
    }
   
}

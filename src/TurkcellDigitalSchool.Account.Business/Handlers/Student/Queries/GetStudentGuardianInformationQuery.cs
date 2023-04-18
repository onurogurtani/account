using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos.UserDtos;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Queries
{
    public class GetStudentGuardianInformationQuery : IRequest<IDataResult<GuardianInfoDto>>
    {
        public long? UserId { get; set; }
        public class GetStudentGuardianInformationQueryHandler : IRequestHandler<GetStudentGuardianInformationQuery, IDataResult<GuardianInfoDto>>
        {
            private readonly IUserService _userService;

            public GetStudentGuardianInformationQueryHandler(IUserService userService)
            {
                _userService = userService;
            }
            public virtual async Task<IDataResult<GuardianInfoDto>> Handle(GetStudentGuardianInformationQuery request, CancellationToken cancellationToken)
            {
                if (request.UserId == null)
                {
                    return new ErrorDataResult<GuardianInfoDto>("Boş olamaz");
                }
                return new SuccessDataResult<GuardianInfoDto>(_userService.GetByStudentGuardianInfoInformation((int)request.UserId));
            }

        }
    }
}

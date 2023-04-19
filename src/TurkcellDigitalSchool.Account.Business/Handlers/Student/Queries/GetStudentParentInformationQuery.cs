using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos.UserDtos;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Queries
{
    public class GetStudentParentInformationQuery : IRequest<IDataResult<ParentInfoDto>>
    {
        public long? UserId { get; set; }
        public class GetStudentParentInformationQueryHandler : IRequestHandler<GetStudentParentInformationQuery, IDataResult<ParentInfoDto>>
        {
            private readonly IUserService _userService;

            public GetStudentParentInformationQueryHandler(IUserService userService)
            {
                _userService = userService;
            }
            public virtual async Task<IDataResult<ParentInfoDto>> Handle(GetStudentParentInformationQuery request, CancellationToken cancellationToken)
            {
                if (request.UserId == null)
                {
                    return new ErrorDataResult<ParentInfoDto>("Boş olamaz");
                }
                return new SuccessDataResult<ParentInfoDto>(_userService.GetByStudentParentInfoInformation((int)request.UserId));
            }

        }
    }
}

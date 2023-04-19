using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos.UserDtos;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Queries
{
    public class GetStudentPersonalInformationQuery : IRequest<IDataResult<PersonalInfoDto>>
    {
        public long? UserId { get; set; }
        public class GetStudentPersonalInformationQueryHandler : IRequestHandler<GetStudentPersonalInformationQuery, IDataResult<PersonalInfoDto>>
        {
            private readonly IUserService _userService;

            public GetStudentPersonalInformationQueryHandler(IUserService userService)
            {
                _userService = userService;
            }
            public virtual async Task<IDataResult<PersonalInfoDto>> Handle(GetStudentPersonalInformationQuery request, CancellationToken cancellationToken)
            {
                if (request.UserId == null)
                {
                    return new ErrorDataResult<PersonalInfoDto>("Boş olamaz.");
                }
                return new SuccessDataResult<PersonalInfoDto>(_userService.GetByStudentPersonalInformation((int)request.UserId));
            }

        }
    }
}

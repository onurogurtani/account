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
    public class GetStudentPackageInformationQuery : IRequest<IDataResult<PackageInfoDto>>
    {
        public long? UserId { get; set; }
        public class GetStudentPackageInformationQueryHandler : IRequestHandler<GetStudentPackageInformationQuery, IDataResult<PackageInfoDto>>
        {
            private readonly IUserService _userService;

            public GetStudentPackageInformationQueryHandler(IUserService userService)
            {
                _userService = userService;
            }
            public virtual async Task<IDataResult<PackageInfoDto>> Handle(GetStudentPackageInformationQuery request, CancellationToken cancellationToken)
            {
                if (request.UserId == null)
                {
                    return new ErrorDataResult<PackageInfoDto>("Boş olamaz");
                }
                return new SuccessDataResult<PackageInfoDto>(_userService.GetByStudentPackageInformation((int)request.UserId));
            }

        }
    }
}

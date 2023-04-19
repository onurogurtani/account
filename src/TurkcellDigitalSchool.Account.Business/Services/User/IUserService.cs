using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Entities.Dtos.UserDtos;

namespace TurkcellDigitalSchool.Account.Business.Services.User
{
    public interface IUserService
    {
        PersonalInfoDto GetByStudentPersonalInformation(long userId);
        EducationInfoDto GetByStudentEducationInformation(long userId);
        GuardianInfoDto GetByStudentGuardianInfoInformation(long userId);
        bool IsExistEmail(long UserId, string Email);
        bool IsExistUserName(long UserId, string UserName);

        TurkcellDigitalSchool.Entities.Concrete.Core.User GetUserById(long UserId);
    }
}

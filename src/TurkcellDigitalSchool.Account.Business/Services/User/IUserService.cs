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
        ParentInfoDto GetByStudentParentInfoInformation(long userId);
        PackageInfoDto GetByStudentPackageInformation(long userId);
        SettingsInfoDto GetByStudentSettingsInfoInformation(long userId);
        bool IsExistEmail(long userId, string email);
        bool IsExistUserName(long userId, string userName);
        TurkcellDigitalSchool.Entities.Concrete.Core.User GetUserById(long userId);
        string StudentEducationValidationRules(StudentEducationRequestDto studentEducationRequestDto);
        bool IsExistCity(long cityId);
        bool IsExistCounty(long cityId, long countyId);

    }
}

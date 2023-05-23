using System.Collections.Generic;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Domain.Dtos;

namespace TurkcellDigitalSchool.Account.Business.Services.User
{
    public interface IUserService
    {
        PersonalInfoDto GetByStudentPersonalInformation(long userId);
        EducationInfoDto GetByStudentEducationInformation(long userId);
        List<ParentInfoDto> GetByStudentParentInfoInformation(long userId);
        List<PackageInfoDto> GetByStudentPackageInformation(long userId);
        List<PackageInfoDto> GetByParentPackageInformation(long userId);
        SettingsInfoDto GetByStudentSettingsInfoInformation(long userId);
        bool IsExistEmail(long userId, string email);
        bool IsExistUserName(long userId, string userName);
        Domain.Concrete.User GetUserById(long userId);
        string StudentEducationValidationRules(StudentEducationRequestDto studentEducationRequestDto);
        string StudentCommunicationPreferencesValidationRules(StudentCommunicationPreferencesDto studentCommunicationPreferencesDto);
        bool IsExistCity(long cityId);
        bool IsExistCounty(long cityId, long countyId);
        Task SetDefaultSettingValues(long UserId);
        List<ParentInfoDto> GetStudentsByParentCitizenId(long? citizenId);
        List<ParentInfoDto> GetByStudentParentsInformation(long userId);
        List<ParentInfoDto> GetStudentsByParentId(long? parentId);
    }
}

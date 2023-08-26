using System.Collections.Generic;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Services.User
{
    public interface IUserService
    {
       
        PersonalInfoDto GetByPersonalInformation(long userId);
        List<ParentInfoDto> GetByStudentParentInfoInformation(long userId);
        List<PackageInfoDto> GetByStudentPackageInformation(long userId);
        Task<SettingsInfoDto> GetByUserSettingsInfoInformation(long userId);
        bool IsExistEmail(long userId, string email);
        bool IsExistUserName(long userId, string userName);
        Domain.Concrete.User GetUserById(long userId);
        string StudentCommunicationPreferencesValidationRules(StudentCommunicationPreferencesDto studentCommunicationPreferencesDto);
        bool IsExistCity(long cityId);
        bool IsExistCounty(long cityId, long countyId);
        Task SetDefaultSettingValues(long UserId);
        List<ParentInfoDto> GetStudentsByParentCitizenId(long? citizenId);
        List<ParentInfoDto> GetByStudentParentsInformation(long userId);
        List<ParentInfoDto> GetStudentsByParentId(long? parentId);
        List<ParentInfoDto> GetParentInformation(long userId);
        Task<IResult> UpdateAvatarAsync(long userId, long avatarId);
        List<StudentsOfParentDto> GetStudentsOfParentByParentId(long parentId);
        List<PackageInfoDto> GetParentPackagesByParentId(long parentId);
    }
}

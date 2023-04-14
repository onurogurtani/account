using TurkcellDigitalSchool.IdentityServerService.Services.Model;

namespace TurkcellDigitalSchool.IdentityServerService.Services.Contract
{
    public interface ICustomUserSvc
    {
        Task<bool> Validate(string userName, string password);
        Task<CustomUserDto> FindById(long id);
        Task<CustomUserDto> FindByUserName(string userName);  
        Task<List<OrganisationUsersDto>> GetUserOrganisation(long id);
        Task<bool> UserHasPackage (long id);
        Task ResetUserOtpFailount (long userId);

        Task<string> GenerateUserOldPassChange(long userId);


    }
}

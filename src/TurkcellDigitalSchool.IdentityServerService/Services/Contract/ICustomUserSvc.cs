using TurkcellDigitalSchool.IdentityServerService.Services.Model;

namespace TurkcellDigitalSchool.IdentityServerService.Services.Contract
{
    public interface ICustomUserSvc
    {
        Task<bool> Validate(string userName, string password);
        Task<CustomUserDto> FindById(long id);
        Task<CustomUserDto> FindByUserName(string userName); 

        Task<List<OrganisationUsersDto>> GetUserOrganisation(long id);

        Task ResetUserFailLoginCount(long id);
        Task<int> IncUserFailLoginCount(long id);

        Task ResetCsrfTokenFailLoginCount(string csrfToken);
        Task<int> IncCsrfTokenFailLoginCount(string csrfToken);

        Task<int> GetCsrfTokenFailLoginCount(string csrfToken);
    }
}

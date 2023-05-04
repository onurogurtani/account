using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Services.Authentication
{
    public interface IAuthenticationCoordinator
    {
        IAuthenticationProvider SelectProvider(AuthenticationProviderType type);
    }
}
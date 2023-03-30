using System.Threading.Tasks;

namespace TurkcellDigitalSchool.Account.Business.Services.Authentication.LdapLoginService
{
    internal interface ILdapLoginService
    {
        Task<LdapResultModel> ValidateAsync(string username, string password);
    }
}

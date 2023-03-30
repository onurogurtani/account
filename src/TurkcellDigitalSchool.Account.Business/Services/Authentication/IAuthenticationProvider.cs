using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.Authentication.Model;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Services.Authentication
{
    public interface IAuthenticationProvider
    {
        Task<LoginUserResult> Login(LoginUserCommand command);
        Task<IDataResult<DArchToken>> Verify(VerifyOtpCommand command);
    }
}
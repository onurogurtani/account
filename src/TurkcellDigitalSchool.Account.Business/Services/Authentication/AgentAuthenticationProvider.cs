using System;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.Authentication.Model;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Services.Authentication
{
    public class AgentAuthenticationProvider : IAuthenticationProvider
    {
        public Task<LoginUserResult> Login(LoginUserCommand command)
        {
            throw new NotImplementedException();
        }

        public virtual Task<DataResult<DArchToken>> Verify(VerifyOtpCommand command)
        {
            throw new NotImplementedException();
        }

    }
}

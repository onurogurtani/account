using System;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Services.Authentication.Model;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Services.Authentication
{
    public abstract class AuthenticationProviderBase : IAuthenticationProvider
    {
        private readonly IMobileLoginRepository _logins;
        private readonly ISmsOtpRepository _smsOtpRepository;

        protected AuthenticationProviderBase(IMobileLoginRepository logins)
        {
            _logins = logins;
        }

        public virtual async Task<IDataResult<DArchToken>> Verify(VerifyOtpCommand command)
        {
            var userId = command.UserId;
            var date = DateTime.Now;
            var login = await _logins.GetAsync(m => m.Provider == command.Provider && m.Code == command.Code &&

                                                    m.UserId == userId && m.SendDate.AddSeconds(100) > date);

            if (login == null)
            {
                return new ErrorDataResult<DArchToken>(Messages.InvalidCode);
            }
            var accessToken = await CreateToken(command);


            if (accessToken.Provider == AuthenticationProviderType.Unknown)
            {
                throw new ArgumentException(Messages.TokenProviderException);
            }

            login.Status = MobileSendStatus.Used;
            login.UsedDate = date;
            _logins.Update(login);
            await _logins.SaveChangesAsync();


            return new SuccessDataResult<DArchToken>(accessToken, Messages.SuccessfulLogin);
        }


        public abstract Task<LoginUserResult> Login(LoginUserCommand command);

        public abstract Task<DArchToken> CreateToken(VerifyOtpCommand command);

    }
}
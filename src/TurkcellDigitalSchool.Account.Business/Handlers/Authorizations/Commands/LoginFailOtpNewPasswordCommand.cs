using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Integration.IntegrationServices.IdentityServerServices.Model.Response;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [LogScope]
    public class LoginFailOtpNewPasswordCommand : IRequest<IDataResult<TokenIntegraitonResponse>>
    {
        public long MobileLoginId { get; set; }
        public string Guid { get; set; }
        public string NewPass { get; set; }
        public string NewPassAgain { get; set; }
        public string CsrfToken { get; set; }
        public string ClientId { get; set; }

        public class LoginFailOtpNewPasswordCommandHandler : IRequestHandler<LoginFailOtpNewPasswordCommand, IDataResult<TokenIntegraitonResponse>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IMobileLoginRepository _mobileLoginRepository;
            private readonly ILoginFailCounterRepository _loginFailCounterRepository;
            private readonly IMediator _mediator;

            public LoginFailOtpNewPasswordCommandHandler(IUserRepository userRepository, IMobileLoginRepository mobileLoginRepository, ILoginFailCounterRepository loginFailCounterRepository, IMediator mediator)
            {
                _userRepository = userRepository;
                _mobileLoginRepository = mobileLoginRepository;
                _loginFailCounterRepository = loginFailCounterRepository;
                _mediator = mediator;
            } 

            public async Task<IDataResult<TokenIntegraitonResponse>> Handle(LoginFailOtpNewPasswordCommand request, CancellationToken cancellationToken)
            {
                if (request.NewPass != request.NewPassAgain)
                {
                    return new ErrorDataResult<TokenIntegraitonResponse>(Messages.PasswordNotEqual);
                }

                var now = DateTime.Now;
                MobileLogin mobileLogin = await _mobileLoginRepository.GetAsync(w => w.Id == request.MobileLoginId && w.NewPassGuid == request.Guid && w.NewPassGuidExp >= now && w.NewPassStatus == UsedStatus.Send);

                if (mobileLogin == null)
                {
                    return new ErrorDataResult<TokenIntegraitonResponse>(Messages.PasswordChangeTimeExpired);
                }

                var query = _userRepository.Query().Where(u => u.Id == mobileLogin.UserId);

                var user = query.FirstOrDefault();
                if (user == null)
                {
                    return new ErrorDataResult<TokenIntegraitonResponse>(Messages.UserNotFound);
                }

                HashingHelper.CreatePasswordHash(request.NewPass, out var passwordSalt, out var passwordHash);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.FailOtpCount = 0;
                user.LastPasswordDate = DateTime.Now;
                await _userRepository.UpdateAndSaveAsync(user);

                mobileLogin.NewPassStatus = UsedStatus.Used;
                await _mobileLoginRepository.UpdateAndSaveAsync(mobileLogin);

                await _loginFailCounterRepository.ResetCsrfTokenFailLoginCount(request.CsrfToken);

                var tokenResponse = await _mediator.Send(new GetTokenQuery
                {
                    UserId = user.Id,
                    Password = request.NewPass,
                    ClientId = request.ClientId,
                });

                return new SuccessDataResult<TokenIntegraitonResponse>(tokenResponse.Data, Messages.PasswordChanged);
            }
        }
    }
}

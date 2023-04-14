using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract; 
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using IResult = TurkcellDigitalSchool.Core.Utilities.Results.IResult;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    public class LoginFailOtpNewPasswordCommand : IRequest<IResult>
    {
        public long MobileLoginId { get; set; }
        public string Guid { get; set; }
        public string NewPass { get; set; }
        public string NewPassAgain { get; set; }
        public string CsrfToken { get; set; }

        public class LoginFailOtpNewPasswordCommandHandler : IRequestHandler<LoginFailOtpNewPasswordCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly IMobileLoginRepository _mobileLoginRepository;
            private readonly ILoginFailCounterRepository _loginFailCounterRepository;
            public LoginFailOtpNewPasswordCommandHandler(IUserRepository userRepository, IMobileLoginRepository mobileLoginRepository, ILoginFailCounterRepository loginFailCounterRepository)
            {
                _userRepository = userRepository;
                _mobileLoginRepository = mobileLoginRepository;
                _loginFailCounterRepository = loginFailCounterRepository;
            }


            [LogAspect(typeof(FileLogger))]
            [ValidationAspect(typeof(LoginFailOtpNewPasswordCommandValidator))]
            public async Task<IResult> Handle(LoginFailOtpNewPasswordCommand request, CancellationToken cancellationToken)
            {
                if (request.NewPass != request.NewPassAgain)
                {
                    return new ErrorResult(Messages.PasswordNotEqual);
                }

                var now = DateTime.Now;
                MobileLogin mobileLogin = await _mobileLoginRepository.GetAsync(w => w.Id == request.MobileLoginId && w.NewPassGuid == request.Guid && w.NewPassGuidExp >= now && w.NewPassStatus == UsedStatus.Send);

                if (mobileLogin == null)
                {
                    return new ErrorDataResult<string>(Messages.PasswordChangeTimeExpired);
                }

                var query = _userRepository.Query().Where(u => u.Id == mobileLogin.UserId);

                var user = query.FirstOrDefault();
                if (user == null)
                {
                    return new ErrorDataResult<string>(Messages.UserNotFound);
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

                return new SuccessResult(Messages.PasswordChanged);
            } 
        }
    }
}

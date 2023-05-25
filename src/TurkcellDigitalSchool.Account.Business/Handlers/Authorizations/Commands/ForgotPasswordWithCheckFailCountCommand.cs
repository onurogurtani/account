﻿using System;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Constants.IdentityServer;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Mail;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Captcha;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [LogScope]
    public class ForgotPasswordWithCheckFailCountCommand : IRequest<IResult>
    {
        public string SendingAdress { get; set; }
        public string CsrfToken { get; set; }
        public string CaptchaKey { get; set; }

        public class ForgotPasswordWithCheckFailCountCommandHandler : IRequestHandler<ForgotPasswordWithCheckFailCountCommand, IResult>
        {

            private readonly IUserRepository _userRepository;
            private readonly IForgetPasswordFailCounterRepository _forgetPasswordFailCounterRepository;
            private readonly IConfiguration _configuration;
            private readonly IMailService _mailService;
            private readonly ISmsOtpRepository _smsOtpRepository;
            private readonly ILoginFailForgetPassSendLinkRepository _loginFailForgetPassSendLinkRepository;
            private readonly ICaptchaManager _captchaManager;
            private readonly string _environment;
            public ForgotPasswordWithCheckFailCountCommandHandler(IUserRepository userRepository, IForgetPasswordFailCounterRepository forgetPasswordFailCounterRepository, IConfiguration configuration,
                ISmsOtpRepository smsOtpRepository, ILoginFailForgetPassSendLinkRepository loginFailForgetPassSendLinkRepository, IMailService mailService, ICaptchaManager captchaManager)
            {
                _userRepository = userRepository;
                _forgetPasswordFailCounterRepository = forgetPasswordFailCounterRepository;
                _configuration = configuration;
                _smsOtpRepository = smsOtpRepository;
                _loginFailForgetPassSendLinkRepository = loginFailForgetPassSendLinkRepository;
                _mailService = mailService;
                _environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                _captchaManager = captchaManager;
            }

            /// <summary>
            /// Forgot Password
            /// Email address is checked.
            /// If there is an e-mail address, a token is created and sent to the password reset link to the e-mail address.
            /// </summary>
             
            public async Task<IResult> Handle(ForgotPasswordWithCheckFailCountCommand request, CancellationToken cancellationToken)
            {

                var isMail = request.SendingAdress.IndexOf("@") > -1;

                Expression<Func<User, bool>> expression = isMail
                    ? u => u.Email == request.SendingAdress
                    : u => u.MobilePhones == request.SendingAdress;

                expression = expression.And(a => !a.IsDeleted && a.Status);

                var errorCount = await _forgetPasswordFailCounterRepository.GetCsrfTokenForgetPasswordFailCount(request.CsrfToken);

                var result = true;
                var message = "";

                if (errorCount>=5)
                { 
                    if (string.IsNullOrEmpty(request.CaptchaKey))
                    { 
                        result = false;
                        message = Messages.InvalidCaptchaKey;
                    }

                    if (!((_environment == ApplicationMode.DEV.ToString() || _environment == ApplicationMode.DEV.ToString()) && request.CaptchaKey == "kg"))
                    {
                        if (!_captchaManager.Validate(request.CaptchaKey))
                        {
                            result = false;
                            message = Messages.InvalidCaptchaKey;
                        }
                    }
                }

                User user = null;
                if (result)
                {
                    user = await _userRepository.GetAsync(expression); 

                    if (user == null)
                    {
                        result = false;
                        message = Messages.UserNotFound;
                    }

                    if (user != null && isMail && !user.EmailVerify)
                    {
                        result = false;
                        message = Messages.MailIsNotVerify;
                    }

                    if (user != null && !isMail && !user.MobilePhonesVerify)
                    {
                        result = false;
                        message = Messages.PhoneNotVerify;
                    }
                }

               

                if (!result)
                {
                    errorCount = await _forgetPasswordFailCounterRepository.IncCsrfTokenForgetPasswordFailCount(request.CsrfToken);
                    return new DataResult<ForgotPasswordWithCheckFailCountCommandResponse>(new ForgotPasswordWithCheckFailCountCommandResponse
                    {
                        ErrorCount = errorCount,
                        IsCaptchaShow = errorCount >= 5
                    }, false, message);
                }

                var guid = Guid.NewGuid().ToString();
                var expDate = DateTime.Now.AddHours(OtpConst.NewPassLinkExpHour);
                _loginFailForgetPassSendLinkRepository.Add(new LoginFailForgetPassSendLink
                {
                    Guid = guid,
                    UserId = user.Id,
                    UsedStatus = UsedStatus.Send,
                    ExpDate = expDate
                });
                await _loginFailForgetPassSendLinkRepository.SaveChangesAsync();
                var userId = Base64UrlEncoder.Encode(user.Id.ToString());

                var link = _configuration.GetSection("ResetPasswordSetting").GetSection("ResetPasswordUserLink").Value +
                           guid + "&XId=" + userId;

                var content = " Şifrenizi yenilemek için  <a href=\"" + link + "\"> tıklayınız </a>. ";

                var messsgePach = "";
                if (isMail)
                {
                    _mailService.Send(new EmailMessage
                    {
                        Subject = "Şifre Yenileme",
                        ToAddresses = new System.Collections.Generic.List<EmailAddress> { new EmailAddress { Address = user.Email } },
                        Content = content
                    });

                    messsgePach = user.Email.MaskEMail() + " e-posta adresine";
                }
                else
                {   // Eski boş SMS kodu
                    // await _smsOtpRepository.ExecInsertSpForSms(user.MobilePhones, user.Id, guid);
                    // SMS servisi
                    await _smsOtpRepository.Send(user.MobilePhones, content);

                    messsgePach = user.MobilePhones.MaskPhoneNumber() + " mobil hattına";
                }
                return new SuccessResult(string.Format(Messages.PasswordChangeLinkSended, messsgePach));
            }
             
            public class ForgotPasswordWithCheckFailCountCommandResponse
            {
                public bool IsCaptchaShow { get; set; }
                public int ErrorCount { get; set; }
            }
        }
    }
}

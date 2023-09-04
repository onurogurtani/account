using System;
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

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [LogScope]
    public class ForgotPasswordSendLinkCommand : IRequest<IResult>
    {
        public long UserId { get; set; }
        public SendType SendingType { get; set; }

        public class ForgotPasswordSendLinkCommandHandler : IRequestHandler<ForgotPasswordSendLinkCommand, IResult>
        {
            
            private readonly IUserRepository _userRepository;
            private readonly IMailService _mailService;
            private readonly IConfiguration _configuration;
            private readonly ISmsOtpRepository _smsOtpRepository;
            private readonly ILoginFailForgetPassSendLinkRepository _loginFailForgetPassSendLinkRepository;

            public ForgotPasswordSendLinkCommandHandler(IUserRepository userRepository, IMailService mailService, IConfiguration configuration,
                ISmsOtpRepository smsOtpRepository, ILoginFailForgetPassSendLinkRepository loginFailForgetPassSendLinkRepository)
            {
                _userRepository = userRepository;
                _mailService = mailService;
                _configuration = configuration;
                _smsOtpRepository = smsOtpRepository;
                _loginFailForgetPassSendLinkRepository = loginFailForgetPassSendLinkRepository;
            }

            /// <summary>
            /// Forgot Password
            /// Email address is checked.
            /// If there is an e-mail address, a token is created and sent to the password reset link to the e-mail address.
            /// </summary>

          
            public async Task<IResult> Handle(ForgotPasswordSendLinkCommand request, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetAsync(w => w.Id == request.UserId);
                if (user == null)
                {
                    return new ErrorResult(Messages.UserNotFound);
                }

                if (request.SendingType == SendType.Mail && !user.EmailVerify)
                {
                    return new ErrorResult(Messages.MailIsNotVerify);
                }

                if (request.SendingType == SendType.MobilPhone && !user.MobilePhonesVerify)
                {
                    return new ErrorResult(Messages.PhoneNotVerify);
                }

                var guid = Guid.NewGuid().ToString();
                var expDate = DateTime.Now.AddHours(OtpConst.NewPassLinkExpHour);
                _loginFailForgetPassSendLinkRepository.Add(new LoginFailForgetPassSendLink
                {
                    Guid = guid,
                    UserId = request.UserId,
                    UsedStatus = UsedStatus.Send,
                    ExpDate = expDate
                });
                await _loginFailForgetPassSendLinkRepository.SaveChangesAsync();
                var userId = Base64UrlEncoder.Encode(request.UserId.ToString());

                var link = _configuration.GetSection("ResetPasswordSetting").GetSection("ResetPasswordUserLink").Value +
                           guid + "&XId=" + userId;

                var content = " Şifrenizi yenilemek için  <a href=\"" + link + "\"> tıklayınız </a>. ";

                var messsgePach = "";
                if (request.SendingType == SendType.Mail)
                {
                    _mailService.Send(new EmailMessage
                    {
                        Subject = "Şifre Yenileme",
                        ToAddresses = new System.Collections.Generic.List<EmailAddress> { new EmailAddress { Address = user.Email } },
                        Content = content
                    });

                    messsgePach = user.Email.MaskEMail() +  " e-posta adresine";
                }
                else if (request.SendingType == SendType.MobilPhone)
                {
                    // Eski boş SMS kodu
                    // await _smsOtpRepository.ExecInsertSpForSms(user.MobilePhones, user.Id, guid);
                    // SMS servisi
                    await _smsOtpRepository.Send(user.MobilePhones, $"Şifrenizi yenilemek için {link} tıklayınız.");
                    

                    messsgePach = user.MobilePhones.MaskPhoneNumber() + " mobil hattına";
                } 
                return new SuccessResult(string.Format(Messages.PasswordChangeLinkSended, messsgePach));
            }
        }
    }
}

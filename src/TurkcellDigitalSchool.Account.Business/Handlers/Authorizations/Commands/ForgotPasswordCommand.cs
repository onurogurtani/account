using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Services.Authentication;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
 
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Mail;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Captcha;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using IResult = TurkcellDigitalSchool.Core.Utilities.Results.IResult;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [LogScope]
    public class ForgotPasswordCommand : IRequest<IResult>
    {
        public string Email { get; set; }
        public string CaptchaKey { get; set; }
        public int IsAdmin { get; set; } = 0;
        public SessionType SessionType { get; set; }

        public class ForgotPasswordCommandHandler : IRequestHandler<ForgotPasswordCommand, IResult>
        {
            private readonly IConfiguration _configuration;
            private readonly IUserRepository _userRepository;
            private readonly ICaptchaManager _captchaManager;
            private readonly ITokenHelper _tokenHelper;
            private readonly IMailService _mailService;
            private readonly IUserSessionRepository _userSessionRepository;
            private readonly IHttpContextAccessor _httpContextAccessor;


            public ForgotPasswordCommandHandler(IUserRepository userRepository, ICaptchaManager captchaManager, ITokenHelper tokenHelper, IMailService mailService, IUserSessionRepository userSessionRepository, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
            {
                _userRepository = userRepository;
                _captchaManager = captchaManager;
                _tokenHelper = tokenHelper;
                _mailService = mailService;
                _userSessionRepository = userSessionRepository;
                _configuration = configuration;
                _httpContextAccessor = httpContextAccessor;
            }

            /// <summary>
            /// Forgot Password
            /// Email address is checked.
            /// If there is an e-mail address, a token is created and sent to the password reset link to the e-mail address.
            /// </summary>
              
            public async Task<IResult> Handle(ForgotPasswordCommand request, CancellationToken cancellationToken)
            {
                if (request.CaptchaKey != null)
                {
                    if (!_captchaManager.Validate(request.CaptchaKey))
                    {
                        return new ErrorResult(Messages.InvalidCaptchaKey);
                    }
                }

                var users = await _userRepository.GetListAsync(w => w.Email == request.Email);
                if (users == null)
                {
                    return new ErrorResult("Lütfen e-posta adresinizi kontrol ediniz.");
                }

                var user = users.FirstOrDefault(); 

                var ip = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();

                var addedSessionRecord = _userSessionRepository.AddUserSession(new UserSession
                {
                    UserId = user.Id,
                    LastTokenDate = DateTime.Now,// accessToken.LastTokenDate,
                    SessionType = request.SessionType,
                    StartTime = DateTime.Now,
                    IpAdress = ip 
                });
                var accessToken = _tokenHelper.CreateChangePasswordToken<DArchToken>(new TokenDto
                {
                    User = user, 
                    SessionType = SessionType.Web,
                    SessionId = addedSessionRecord.Id
                });
                addedSessionRecord.LastTokenDate = accessToken.LastTokenDate;
                
                _userSessionRepository.UpdateAndSave(addedSessionRecord);

                var link = ((request.IsAdmin == 0) ?
                          _configuration.GetSection("ResetPasswordSetting").GetSection("ResetPasswordUserLink").Value :
                          _configuration.GetSection("ResetPasswordSetting").GetSection("ResetPasswordAdminLink").Value) + accessToken.Token;
                var content = " Şifrenizi yenilemek için  <a href=\"" + link + "\"> tıklayınız </a>. ";

                _mailService.Send(new EmailMessage
                {
                    Subject = "Şifre Yenileme",
                    ToAddresses = new System.Collections.Generic.List<EmailAddress> { new EmailAddress { Address = user.Email } },
                    Content = content
                });

                return new SuccessResult("Şifre sıfırlama linkiniz e-posta adresinize gönderildi!<br><br>Lütfen e-postanızı kontrol ediniz.");
            }
        }
    }
}

using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Common;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Captcha;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    public class LoginCheckCaptchaKeyQuery : IRequest<IResult>
    { 
        public string CaptchaKey { get; set; }

        public class LoginCheckCaptchaKeyQueryHandler : IRequestHandler<LoginCheckCaptchaKeyQuery, IResult>
        {
            private readonly ConfigurationManager _configurationManager; 
            private readonly ICaptchaManager _captchaManager;

            public LoginCheckCaptchaKeyQueryHandler(ConfigurationManager configurationManager, ICaptchaManager captchaManager)
            { 
                _configurationManager = configurationManager;
                _captchaManager = captchaManager;
            }


            [LogAspect(typeof(FileLogger))]
            public async Task<IResult> Handle(LoginCheckCaptchaKeyQuery request, CancellationToken cancellationToken)
            {
                if (!(_configurationManager.Mode != ApplicationMode.PROD && request.CaptchaKey == "kg"))
                {
                    if (!_captchaManager.Validate(request.CaptchaKey))
                    {
                        return new ErrorDataResult<AccessToken>(Messages.InvalidCaptchaKey);
                    }
                } 
                return new SuccessResult();
            } 
        }
    }
}

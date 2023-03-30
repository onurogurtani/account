﻿using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Services.Authentication.LdapLoginService;
using TurkcellDigitalSchool.Common;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Captcha;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    public class LoginUserByLdapQuery : IRequest<IDataResult<AccessToken>>
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string CaptchaKey { get; set; }

        public class LoginUserByLdapQueryHandler : IRequestHandler<LoginUserByLdapQuery, IDataResult<AccessToken>>
        {
            private readonly LdapLoginService _ldapLoginService;
            private readonly ConfigurationManager _configurationManager;
            private readonly IUserRepository _userRepository;
            private readonly ITokenHelper _tokenHelper;
            private readonly IMediator _mediator;
            private readonly ICacheManager _cacheManager;
            private readonly IMobileLoginRepository _mobileLoginRepository;
            private readonly ISmsOtpRepository _smsOtpRepository;
            private readonly ICaptchaManager _captchaManager;

            public LoginUserByLdapQueryHandler(LdapLoginService ldapLoginService, IUserRepository userRepository, ITokenHelper tokenHelper, IMediator mediator, ICacheManager cacheManager, IMobileLoginRepository mobileLoginRepository, ISmsOtpRepository smsOtpRepository, ConfigurationManager configurationManager, ICaptchaManager captchaManager)
            {
                _ldapLoginService = ldapLoginService;
                _userRepository = userRepository;
                _tokenHelper = tokenHelper;
                _mediator = mediator;
                _cacheManager = cacheManager;
                _mobileLoginRepository = mobileLoginRepository;
                _smsOtpRepository = smsOtpRepository;
                _configurationManager = configurationManager;
                _captchaManager = captchaManager;
            }


            [LogAspect(typeof(FileLogger))]
            public async Task<IDataResult<AccessToken>> Handle(LoginUserByLdapQuery request, CancellationToken cancellationToken)
            {
                // Daha sonra yapılacak
                throw new NotImplementedException();
            }

        }
    }
}

using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using TurkcellDigitalSchool.Account.Business.Services.Authentication;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    [LogScope]
    public class LoginUserTryQuery : IRequest<string>, ITokenRequest
    {
        public string UserName { get; set; }
        public long UserId { get; set; } = 1;
        public SessionType SessionType { get; set; } = SessionType.Web;

        public class LoginUserTryQueryHandler : IRequestHandler<LoginUserTryQuery, string>
        {
            private readonly ConfigurationManager _configurationManager;
            private readonly IUserRepository _userRepository;
            private readonly ITokenHelper _tokenHelper;
            private readonly ICacheManager _cacheManager;
            private readonly IUserSessionRepository _userSessionRepository;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public LoginUserTryQueryHandler(IUserRepository userRepository, ITokenHelper tokenHelper, IMediator mediator, ICacheManager cacheManager, ConfigurationManager configurationManager, IUserSessionRepository userSessionRepository, IHttpContextAccessor httpContextAccessor)
            {
                _userRepository = userRepository;
                _tokenHelper = tokenHelper;
                _cacheManager = cacheManager;
                _configurationManager = configurationManager;
                _userSessionRepository = userSessionRepository;
                _httpContextAccessor = httpContextAccessor;
            }


        
            public async Task<string> Handle(LoginUserTryQuery request, CancellationToken cancellationToken)
            { 
                var user = await _userRepository
                    .GetAsync(u => u.Status
                                && (request.UserId > 0 ? u.Id == request.UserId : u.UserName == request.UserName));

                if (user == null)
                {
                    return "Kullanıcı Bulunamadı";
                }

                var ip = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
                var addedSessionRecord = _userSessionRepository.AddUserSession(new UserSession
                {
                    UserId = user.Id,
                    NotBefore = 1,
                    SessionType = request.SessionType,
                    StartTime = DateTime.Now,
                    IpAdress = ip
                });

                var accessToken = _tokenHelper.CreateToken<DArchToken>(new TokenDto
                {
                    User = user,
                    SessionType = request.SessionType,
                    SessionId = addedSessionRecord.Id
                });

                addedSessionRecord.NotBefore = accessToken.NotBefore;
                _userSessionRepository.UpdateAndSave(addedSessionRecord);

                return accessToken.Token;
            }

        }
    }
}

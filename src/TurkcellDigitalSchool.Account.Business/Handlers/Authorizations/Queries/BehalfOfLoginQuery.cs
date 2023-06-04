using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Services.Authentication;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    [LogScope]
    public class BehalfOfLoginQuery : IRequest<DataResult<DArchToken>>, ITokenRequest
    {
        public long UserId { get; set; }
        public SessionType SessionType { get; set; }

        public class BehalfOfLoginQueryHandler : IRequestHandler<BehalfOfLoginQuery, DataResult<DArchToken>>
        {
            private readonly IUserRepository _userRepository; 
            private readonly ITokenHelper _tokenHelper;
            private readonly ICacheManager _cacheManager;
            private readonly IUserSessionRepository _userSessionRepository;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public BehalfOfLoginQueryHandler(IUserRepository userRepository,  ITokenHelper tokenHelper, ICacheManager cacheManager, IUserSessionRepository userSessionRepository, IHttpContextAccessor httpContextAccessor)
            {
                _userRepository = userRepository; 
                _tokenHelper = tokenHelper;
                _cacheManager = cacheManager;
                _userSessionRepository = userSessionRepository;
                _httpContextAccessor = httpContextAccessor;
            }

            /// <summary>
            /// Login instead of user
            /// When the user says the support team can see my data, the administrator can log into the user account.
            /// It is taken from the ViewMyData field in the user table.
            /// If true, the token is created.
            /// </summary> 
            [SecuredOperation]
            public async Task<DataResult<DArchToken>> Handle(BehalfOfLoginQuery request, CancellationToken cancellationToken)
            {
             
                var targetUser = await _userRepository.GetAsync(u => u.Status && u.ViewMyData && (u.Id == request.UserId));
                if (targetUser == null)
                {
                    return new ErrorDataResult<DArchToken>(Messages.UserNotFound);
                }

                var ip = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();

                var addedSessionRecord = _userSessionRepository.AddUserSession(new UserSession
                {
                    UserId = targetUser.Id,
                    NotBefore = 0,
                    SessionType = request.SessionType,
                    StartTime = DateTime.Now,
                    IpAdress = ip
                });

                var accessToken = _tokenHelper.CreateToken<DArchToken>(new TokenDto
                {
                    User = targetUser,
                    SessionType = request.SessionType,
                    SessionId = addedSessionRecord.Id
                });

                addedSessionRecord.NotBefore = accessToken.NotBefore;
                _userSessionRepository.UpdateAndSave(addedSessionRecord);

                return new SuccessDataResult<DArchToken>(accessToken, Messages.SuccessfulLogin);
            }
        }
    }
}

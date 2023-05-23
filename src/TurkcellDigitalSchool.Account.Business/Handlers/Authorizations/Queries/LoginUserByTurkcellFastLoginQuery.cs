using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Services.Authentication;
using TurkcellDigitalSchool.Account.Business.Services.Authentication.TurkcellFastLoginService;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    [LogScope]
    public class LoginUserByTurkcellFastLoginQuery : IRequest<IDataResult<AccessToken>>, ITokenRequest
    {
        public string AuthenticationCode { get; set; }
        public SessionType SessionType { get; set; }

        public class LoginUserByTurkcellFastLoginQueryHandler : IRequestHandler<LoginUserByTurkcellFastLoginQuery, IDataResult<AccessToken>>
        {
            private readonly TurkcellFastLoginService _turkcellFastLoginService;
            private readonly IUserRepository _userRepository;
            private readonly IUserSessionRepository _userSessionRepository;
            private readonly ITokenHelper _tokenHelper;
            private readonly ICacheManager _cacheManager;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public LoginUserByTurkcellFastLoginQueryHandler(TurkcellFastLoginService turkcellFastLoginService, IUserRepository userRepository, IUserSessionRepository userSessionRepository, ITokenHelper tokenHelper, ICacheManager cacheManager, IHttpContextAccessor httpContextAccessor)
            {
                _turkcellFastLoginService = turkcellFastLoginService;
                _userRepository = userRepository;
                _userSessionRepository = userSessionRepository;
                _tokenHelper = tokenHelper;
                _cacheManager = cacheManager;
                _httpContextAccessor = httpContextAccessor;
            }
             
            public async Task<IDataResult<AccessToken>> Handle(LoginUserByTurkcellFastLoginQuery request, CancellationToken cancellationToken)
            {
                try
                {
                    var authResult = await _turkcellFastLoginService.ValidateAndGetUserInfoAsync(request.AuthenticationCode);

                    if (authResult == null || authResult.Result == false)
                    {
                        return new ErrorDataResult<AccessToken>(Messages.CouldNotValidate);
                    }

                    var validationInformation = authResult.ValidationInformation;
                    var userInformation = authResult.UserInformation;

                    var targetUser = _userRepository.AddOrUpdateForExternalLogin(UserAddingType.TurkcellFastLogin, userInformation.Sub, validationInformation.AccessToken, validationInformation.IdToken, userInformation.Name, userInformation.Surname, userInformation.Email, userInformation.PhoneNumber);

                    if (targetUser == null)
                    {
                        return new ErrorDataResult<AccessToken>(Messages.PassError);
                    }

                    var ip = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
                    var addedSessionRecord = _userSessionRepository.AddUserSession(new UserSession
                    {
                        UserId = targetUser.Id, 
                        NotBefore = 1,
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
                catch (Exception e)
                {
                    return new ErrorDataResult<DArchToken>(e.Message);
                }
            }
        }
    }
}

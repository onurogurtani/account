﻿using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using IResult = TurkcellDigitalSchool.Core.Utilities.Results.IResult;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    public class LogoutUserQuery : IRequest<IResult>
    {
        public class LogoutUserQueryHandler : IRequestHandler<LogoutUserQuery, IResult>
        {
            private readonly ITokenHelper _tokenHelper;
            private readonly IUserSessionRepository _userSession;
            public LogoutUserQueryHandler(ITokenHelper tokenHelper, IUserSessionRepository userSession)
            {
                _tokenHelper = tokenHelper;
                _userSession = userSession;
            }

            [LogAspect(typeof(FileLogger))]
            public async Task<IResult> Handle(LogoutUserQuery request, CancellationToken cancellationToken)
            {
                var userId = await Task.FromResult(_tokenHelper.GetUserIdByCurrentToken());
                var sessionId = _tokenHelper.GetUserSessionIdByCurrentToken();
                await _userSession.Logout(sessionId);
                return new SuccessResult();
            } 
        }
    }
}

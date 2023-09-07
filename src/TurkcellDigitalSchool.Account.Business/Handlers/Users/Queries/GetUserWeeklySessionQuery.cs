using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Account.Business.Helpers;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    ///<summary>
    ///Get Weekly User Session
    /// </summary>
    [LogScope]

    public class GetUserWeeklySessionQuery : IRequest<DataResult<UserSessionWeeklyDto>>
    {
        public long? UserId { get; set; }

        public class GetUserWeeklySessionQueryHandler : IRequestHandler<GetUserWeeklySessionQuery, DataResult<UserSessionWeeklyDto>>
        {
            private readonly IUserSessionRepository _userSessionRepository;
            private readonly ITokenHelper _tokenHelper;
            public GetUserWeeklySessionQueryHandler(IUserSessionRepository userSessionRepository, ITokenHelper tokenHelper)
            {
                _userSessionRepository = userSessionRepository;
                _tokenHelper = tokenHelper;
            }

            public virtual async Task<DataResult<UserSessionWeeklyDto>> Handle(GetUserWeeklySessionQuery request, CancellationToken cancellationToken)
            {
                long currentuserId = request.UserId > 0 ? request.UserId.Value : _tokenHelper.GetUserIdByCurrentToken();
 
                var forUserTimeWastring = "";
                if (request.UserId > 0)
                    forUserTimeWastring = "geçirdi";
                else
                    forUserTimeWastring = "geçirdin";

                var startOfWeek = UserSessionHelper.StartOfWeek();

 

                var list = await _userSessionRepository
                    .Query()
                    .Where(w => w.UserId == currentuserId)
                    .Where(w => w.StartTime >= startOfWeek || w.EndTime >= startOfWeek ||  w.EndTime == null) 
                     
                    .OrderByDescending(o => o.StartTime)
                    .ToListAsync();

                var totalTimeString = UserSessionHelper.TotalTimeToString(UserSessionHelper.TotalTime(list, startOfWeek, startOfWeek.AddDays(7).AddTicks(-1)));

                UserSessionWeeklyDto dto = new UserSessionWeeklyDto
                {
                    TotalSessionTimeText = $"Bu hafta LearnUp' ta {totalTimeString} zaman {forUserTimeWastring}."
                };
                return new SuccessDataResult<UserSessionWeeklyDto>(dto);
            }

        }
    }
}
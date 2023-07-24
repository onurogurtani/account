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
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Common.Helpers;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    ///<summary>
    ///Get User Session Time Avarage 
    /// </summary>
    [LogScope]

    public class GetUserSessionTimeAvarageQuery : IRequest<DataResult<SessionTimeAvarageserSessionAvarageTime>>
    {
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }

        public class GetUserSessionTimeAvarageQueryHandler : IRequestHandler<GetUserSessionTimeAvarageQuery, DataResult<SessionTimeAvarageserSessionAvarageTime>>
        {
            private readonly IUserPackageRepository _userPackageRepository;
            private readonly IUserSessionRepository _userSessionRepository;
            private readonly ITokenHelper _tokenHelper;
            public GetUserSessionTimeAvarageQueryHandler(IUserSessionRepository userSessionRepository, ITokenHelper tokenHelper, IUserPackageRepository userPackageRepository)
            {
                _userSessionRepository = userSessionRepository;
                _tokenHelper = tokenHelper;
                _userPackageRepository = userPackageRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string UserPackageNotFound = Business.Constants.Messages.UserPackageNotFound;
            public virtual async Task<DataResult<SessionTimeAvarageserSessionAvarageTime>> Handle(GetUserSessionTimeAvarageQuery request, CancellationToken cancellationToken)
            {
                long currentuserId = _tokenHelper.GetUserIdByCurrentToken();

                /// request date clean
                request.StartDateTime = request.StartDateTime.Date;
                request.EndDateTime = request.EndDateTime.Date.AddDays(1);

                /// package date get
                var package = _userPackageRepository.Query().Where(x => x.UserId == currentuserId).OrderBy(x => x.PurchaseDate).FirstOrDefault();
                if (package == null)
                    return new ErrorDataResult<SessionTimeAvarageserSessionAvarageTime>(null, UserPackageNotFound.PrepareRedisMessage());

                DateTime purchaseDate = package.PurchaseDate.Date;

                var totalDays = (DateTime.Now - purchaseDate).TotalDays;

                /// all time   calculate
                var allSessionlist = await _userSessionRepository
                    .Query()
                    .Where(w => w.UserId == currentuserId)
                    .Where(w => w.StartTime >= purchaseDate || w.EndTime >= purchaseDate || w.EndTime == null)
                    .OrderByDescending(o => o.StartTime)
                    .ToListAsync();

                var allWastingTime = UserSessionHelper.TotalTime(allSessionlist, purchaseDate, DateTime.MaxValue);
                var dailyAvarageWastingTime = (double)allWastingTime / totalDays;



                /// date Filtered calculate
                var dateFilteredlist = await _userSessionRepository
                    .Query()
                    .Where(w => w.UserId == currentuserId)
                    .Where(w => w.StartTime >= request.StartDateTime || w.EndTime >= request.StartDateTime || w.EndTime == null)
                    .OrderByDescending(o => o.StartTime)
                    .ToListAsync();

                var dateFilteredwastingTime = UserSessionHelper.TotalTime(dateFilteredlist, request.StartDateTime, request.EndDateTime);
                var dateFilteredAvarageWastingTime = (double)dateFilteredwastingTime / (request.EndDateTime - request.StartDateTime).TotalDays;


                /// diff
                var overOrUnderTime = dateFilteredAvarageWastingTime - dailyAvarageWastingTime;


                var messageOverOrUnderTime = "";
                if (overOrUnderTime > 0)
                    messageOverOrUnderTime = $"{UserSessionHelper.TotalTimeToString2((int)overOrUnderTime)} daha fazla ";
                else
                    messageOverOrUnderTime = $"{UserSessionHelper.TotalTimeToString2((int)overOrUnderTime)} daha az ";
                
                
                SessionTimeAvarageserSessionAvarageTime dto = new SessionTimeAvarageserSessionAvarageTime
                {
                    WastingTime = UserSessionHelper.TotalTimeToString2(dateFilteredwastingTime),
                    OverOrUnderTime = messageOverOrUnderTime
                };

                return new SuccessDataResult<SessionTimeAvarageserSessionAvarageTime>(dto);
            }

        }
    }
}
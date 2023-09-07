using DotNetCore.CAP;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Services.SMS;
using TurkcellDigitalSchool.Core.Services.SMS.Turkcell;
using TurkcellDigitalSchool.Core.SubServiceConst;
using TurkcellDigitalSchool.Core.Utilities.Mail;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [TransactionScope]
    [LogScope]
    [SecuredOperationScope]
    public class CheckForNeverLoggedCommand : IRequest<IResult>
    {


        /// <summary>
        /// Send User Notification
        /// </summary>

        [MessageClassAttr("Hiç Giriş Yapmamış Bildirimi Gönderme")]
        public class CheckForNeverLoggedCommandHandler : IRequestHandler<CheckForNeverLoggedCommand, IResult>
        {
            private readonly IUserSessionRepository _userSessionRepository;
            private readonly IUserPackageRepository _userPackageRepository;
            private readonly ICapPublisher _capPublisher;

            public CheckForNeverLoggedCommandHandler(IUserSessionRepository userSessionRepository, IUserPackageRepository userPackageRepository, ICapPublisher capPublisher)
            {
                _userSessionRepository = userSessionRepository;
                _userPackageRepository = userPackageRepository;
                _capPublisher = capPublisher;
            }


            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Core.Common.Constants.Messages.SuccessfulOperation;

            public async Task<IResult> Handle(CheckForNeverLoggedCommand request, CancellationToken cancellationToken)
            {
                var users = _userPackageRepository.Query().Include(x=>x.User).Where(x=>x.User.UserType == UserType.Student);
                var userSessions = _userSessionRepository.Query();

                var usersWithNoSessions = from user in users
                                          join session in userSessions on user.Id equals session.UserId into userGroup
                                          where !userGroup.Any()
                                          select user;

                await _capPublisher.PublishAsync(SubServiceConst.NEVER_LOGGED_REQUEST, new NeverLoggedUsers { UserIds = usersWithNoSessions.Select(x=>x.UserId).ToList()}, cancellationToken: cancellationToken);


                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }


        }
        public class NeverLoggedUsers {
            public List<long> UserIds { get; set; }
        }
    }
}


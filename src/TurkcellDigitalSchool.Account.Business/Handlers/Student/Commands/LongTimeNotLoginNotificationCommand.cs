using MediatR;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands
{

    public class LongTimeNotLoginNotificationCommand : IRequest<IResult>
    {

        /// <summary>
        /// Create Announcement
        /// </summary>

        [MessageClassAttr("Uzun Süre Giriş Yapmayan Bildirimi")]
        public class LongTimeNotLoginNotificationCommandHandler : IRequestHandler<LongTimeNotLoginNotificationCommand, IResult>
        {
            private readonly IUserRepository _userRepository;

            public LongTimeNotLoginNotificationCommandHandler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string AnnouncementTypeIsNotFound = Core.Common.Constants.Messages.UnableToProccess;


            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Core.Common.Constants.Messages.SuccessfulOperation;

             
            public async Task<IResult> Handle(LongTimeNotLoginNotificationCommand request, CancellationToken cancellationToken)
            {

                var notActiveUsers = await _userRepository.GetListAsync(x => x.UserType == UserType.Student);

                foreach (var user in notActiveUsers)
                {
                    // Push bildirim servisi eklenecek
                    // sms servisi
                    // Email servisi
                }
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

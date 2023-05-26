﻿using DocumentFormat.OpenXml.Drawing.Charts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Exam.Business.Handlers.TestExams.Commands
{


    public class BirthDayNotificationCommand : IRequest<IResult>
    {

        /// <summary>
        /// Create Announcement
        /// </summary>

        [MessageClassAttr("Doğum Günü Bildirimi")]
        public class BirthDayNotificationCommandHandler : IRequestHandler<BirthDayNotificationCommand, IResult>
        {
            private readonly IUserRepository _userRepository;

            public BirthDayNotificationCommandHandler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string AnnouncementTypeIsNotFound = Common.Constants.Messages.UnableToProccess;


            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Common.Constants.Messages.SuccessfulOperation;

            [SecuredOperation]
            public async Task<IResult> Handle(BirthDayNotificationCommand request, CancellationToken cancellationToken)
            {


                
                // Öğrenci
                // veli
                // koç
                // özel Öğretmen
                // Öğretmen


                //foreach (var user in birth)
                //{
                //    // Push bildirim servisi eklenecek
                //    //  sms servisi
                //    // mail servisi
                //}
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

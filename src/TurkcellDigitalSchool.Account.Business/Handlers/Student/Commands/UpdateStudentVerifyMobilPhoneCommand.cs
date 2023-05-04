using DocumentFormat.OpenXml.Wordprocessing;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.ValidationRules;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands
{
    public class UpdateStudentVerifyMobilPhoneCommand : IRequest<IResult>
    {
        public long UserId { get; set; }

        public class UpdateStudentVerifyMobilPhoneCommandHandler : IRequestHandler<UpdateStudentVerifyMobilPhoneCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly IUserService _userService;
            public UpdateStudentVerifyMobilPhoneCommandHandler(IUserRepository userRepository, IUserService userService)
            {
                _userRepository = userRepository;
                _userService = userService;
            }


            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;

             
            public async Task<IResult> Handle(UpdateStudentVerifyMobilPhoneCommand request, CancellationToken cancellationToken)
            {
                //TODO UserId Tokendan alınacaktır?

                //TODO Generic OPT servisi yazılacak. ek efor istenecek.
                var getUser = _userService.GetUserById(request.UserId);
                if (getUser == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());
                getUser.MobilePhonesVerify = true;
                await _userRepository.UpdateAndSaveAsync(getUser);

                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

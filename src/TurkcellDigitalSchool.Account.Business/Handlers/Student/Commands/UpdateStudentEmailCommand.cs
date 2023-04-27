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
    public class UpdateStudentEmailCommand : IRequest<IResult>
    {
        public long UserId { get; set; }
        public string Email { get; set; }

        [MessageClassAttr("Öğrenci Profil Email Bilgisi Ekleme/Güncelleme")]
        public class UpdateStudentEmailCommandHandler : IRequestHandler<UpdateStudentEmailCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly IUserService _userService;
            public UpdateStudentEmailCommandHandler(IUserRepository userRepository, IUserService userService)
            {
                _userRepository = userRepository;
                _userService = userService;
            }


            [MessageConstAttr(MessageCodeType.Success)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string EmailAlreadyExist = Messages.EmailAlreadyExist;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string EnterDifferentEmail = Constants.Messages.EnterDifferentEmail;

            [ValidationAspect(typeof(UpdateStudentEmailValidator), Priority = 2)]
            public async Task<IResult> Handle(UpdateStudentEmailCommand request, CancellationToken cancellationToken)
            {

                //TODO Generic OPT servisi yazılacak. ek efor istenecek.

                var getUser = _userService.GetUserById(request.UserId);

                if (getUser == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());
                if (getUser.Email == request.Email)
                    return new ErrorResult(EnterDifferentEmail.PrepareRedisMessage());
                if (_userService.IsExistEmail(request.UserId, request.Email))
                    return new ErrorResult(EmailAlreadyExist.PrepareRedisMessage());

                getUser.Email = request.Email;
                getUser.EmailVerify = true;
                await _userRepository.UpdateAndSaveAsync(getUser);

                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

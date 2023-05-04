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
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands
{
    public class UpdateStudentCommunicationPreferencesCommand : IRequest<IResult>
    {
        public StudentCommunicationPreferencesDto StudentCommunicationPreferencesRequest { get; set; }

        public class UpdateStudentCommunicationPreferencesCommandHandler : IRequestHandler<UpdateStudentCommunicationPreferencesCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly IUserService _userService;
            private readonly IUserCommunicationPreferencesRepository _userCommunicationPreferencesRepository;
            public UpdateStudentCommunicationPreferencesCommandHandler(IUserRepository userRepository, IUserService userService, IUserCommunicationPreferencesRepository userCommunicationPreferencesRepository)
            {
                _userRepository = userRepository;
                _userService = userService;
                _userCommunicationPreferencesRepository = userCommunicationPreferencesRepository;
            }


            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;

            public async Task<IResult> Handle(UpdateStudentCommunicationPreferencesCommand request, CancellationToken cancellationToken)
            {
                //TODO UserId Tokendan alınacaktır?
                var getUser = _userService.GetUserById(request.StudentCommunicationPreferencesRequest.UserId);
                if (getUser == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                var getStudentCommunicationPreferences = _userCommunicationPreferencesRepository.Get(w => w.UserId == request.StudentCommunicationPreferencesRequest.UserId);

                var validationMessages = _userService.StudentCommunicationPreferencesValidationRules(request.StudentCommunicationPreferencesRequest);
                if (!string.IsNullOrWhiteSpace(validationMessages))
                {
                    return new ErrorResult(validationMessages);
                }

                getStudentCommunicationPreferences.IsCall = request.StudentCommunicationPreferencesRequest.IsCall;
                getStudentCommunicationPreferences.IsNotification = request.StudentCommunicationPreferencesRequest.IsNotification;
                getStudentCommunicationPreferences.IsEMail = request.StudentCommunicationPreferencesRequest.IsEMail;
                getStudentCommunicationPreferences.IsSms = request.StudentCommunicationPreferencesRequest.IsSms;
                await _userCommunicationPreferencesRepository.UpdateAndSaveAsync(getStudentCommunicationPreferences);

                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

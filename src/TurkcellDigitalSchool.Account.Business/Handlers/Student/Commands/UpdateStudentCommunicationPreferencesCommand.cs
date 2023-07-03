using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands
{
    [LogScope] 
    public class UpdateStudentCommunicationPreferencesCommand : IRequest<IResult>
    {
        public StudentCommunicationPreferencesDto StudentCommunicationPreferencesRequest { get; set; }

        public class UpdateStudentCommunicationPreferencesCommandHandler : IRequestHandler<UpdateStudentCommunicationPreferencesCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly IUserService _userService;
            private readonly IUserCommunicationPreferencesRepository _userCommunicationPreferencesRepository;
            private readonly ITokenHelper _tokenHelper;
            public UpdateStudentCommunicationPreferencesCommandHandler(IUserRepository userRepository, IUserService userService, IUserCommunicationPreferencesRepository userCommunicationPreferencesRepository, ITokenHelper tokenHelper)
            {
                _userRepository = userRepository;
                _userService = userService;
                _userCommunicationPreferencesRepository = userCommunicationPreferencesRepository;
                _tokenHelper = tokenHelper;
            }


            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;

            public async Task<IResult> Handle(UpdateStudentCommunicationPreferencesCommand request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();
                var getUser = _userService.GetUserById(userId);
                if (getUser == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                var getStudentCommunicationPreferences = _userCommunicationPreferencesRepository.Get(w => w.UserId == userId);

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

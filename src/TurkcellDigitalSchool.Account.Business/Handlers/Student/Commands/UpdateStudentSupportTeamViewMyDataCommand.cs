using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
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
    [SecuredOperationScope]
    public class UpdateStudentSupportTeamViewMyDataCommand : IRequest<IResult>
    {
        public bool IsViewMyData { get; set; }
        public bool IsFifteenMinutes { get; set; }
        public bool IsOneMonth { get; set; }
        public bool IsAlways { get; set; }

        public class UpdateStudentSupportTeamViewMyDataCommandHandler : IRequestHandler<UpdateStudentSupportTeamViewMyDataCommand, IResult>
        {
            private readonly IUserService _userService;
            private readonly IUserSupportTeamViewMyDataRepository _userSupportTeamViewMyDataRepository;
            private readonly ITokenHelper _tokenHelper;
            public UpdateStudentSupportTeamViewMyDataCommandHandler(IUserService userService, IUserSupportTeamViewMyDataRepository userSupportTeamViewMyDataRepository, ITokenHelper tokenHelper)
            {
                _userService = userService;
                _userSupportTeamViewMyDataRepository = userSupportTeamViewMyDataRepository;
                _tokenHelper = tokenHelper;
            }


            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;

            [MessageConstAttr(MessageCodeType.Error)]
            private static string OnlyOneCanBeSelected = Constants.Messages.OnlyOneCanBeSelected;

            [MessageConstAttr(MessageCodeType.Error)]
            private static string YouMustChoose = Constants.Messages.YouMustChoose;

            public async Task<IResult> Handle(UpdateStudentSupportTeamViewMyDataCommand request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();
                var getUser = _userService.GetUserById(userId);
                if (getUser == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                if (request.IsViewMyData && (!request.IsFifteenMinutes && !request.IsAlways && !request.IsOneMonth))
                {
                    return new ErrorResult(YouMustChoose.PrepareRedisMessage());
                }

                if (request.IsFifteenMinutes && (request.IsOneMonth || request.IsAlways))
                {
                    return new ErrorResult(OnlyOneCanBeSelected.PrepareRedisMessage());
                }

                if (request.IsOneMonth && (request.IsFifteenMinutes || request.IsAlways))
                {
                    return new ErrorResult(OnlyOneCanBeSelected.PrepareRedisMessage());
                }

                if (request.IsAlways && (request.IsFifteenMinutes || request.IsOneMonth))
                {
                    return new ErrorResult(OnlyOneCanBeSelected.PrepareRedisMessage());
                }

                var getStudentSupportTeamViewMyData = _userSupportTeamViewMyDataRepository.Get(w => w.UserId == userId);
                getStudentSupportTeamViewMyData.IsViewMyData = request.IsViewMyData;
                getStudentSupportTeamViewMyData.IsFifteenMinutes = request.IsViewMyData ? request.IsFifteenMinutes : null;
                getStudentSupportTeamViewMyData.IsOneMonth = request.IsViewMyData ? request.IsOneMonth : null;
                getStudentSupportTeamViewMyData.IsAlways = request.IsViewMyData ? request.IsAlways : null;
                await _userSupportTeamViewMyDataRepository.UpdateAndSaveAsync(getStudentSupportTeamViewMyData);

                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }

}

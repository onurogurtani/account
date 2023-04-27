using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos.UserDtos;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands
{
    public class UpdateStudentSupportTeamViewMyDataCommand : IRequest<IResult>
    {
        public long UserId { get; set; }
        public bool IsViewMyData { get; set; }
        public bool? IsFifteenMinutes { get; set; }
        public bool? IsOneMonth { get; set; }
        public bool? IsAlways { get; set; }

        public class UpdateStudentSupportTeamViewMyDataCommandHandler : IRequestHandler<UpdateStudentSupportTeamViewMyDataCommand, IResult>
        {
            private readonly IUserService _userService;
            private readonly IUserSupportTeamViewMyDataRepository _userSupportTeamViewMyDataRepository;
            public UpdateStudentSupportTeamViewMyDataCommandHandler(IUserService userService, IUserSupportTeamViewMyDataRepository userSupportTeamViewMyDataRepository)
            {
                _userService = userService;
                _userSupportTeamViewMyDataRepository = userSupportTeamViewMyDataRepository;
            }


            [MessageConstAttr(MessageCodeType.Success)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;

            [MessageConstAttr(MessageCodeType.Error)]
            private static string OnlyOneCanBeSelected = Constants.Messages.OnlyOneCanBeSelected;

            public async Task<IResult> Handle(UpdateStudentSupportTeamViewMyDataCommand request, CancellationToken cancellationToken)
            {
                //TODO UserId Tokendan alınacaktır?
                var getUser = _userService.GetUserById(request.UserId);
                if (getUser == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                if (request.IsFifteenMinutes is not null and true && (request.IsOneMonth is not null and true || request.IsAlways is not null and true))
                {
                    return new ErrorResult(OnlyOneCanBeSelected.PrepareRedisMessage());
                }

                if (request.IsOneMonth is not null and true && (request.IsFifteenMinutes is not null and true || request.IsAlways is not null and true))
                {
                    return new ErrorResult(OnlyOneCanBeSelected.PrepareRedisMessage());
                }

                if (request.IsAlways is not null and true && (request.IsFifteenMinutes is not null and true || request.IsOneMonth is not null and true))
                {
                    return new ErrorResult(OnlyOneCanBeSelected.PrepareRedisMessage());
                }

                var getStudentSupportTeamViewMyData = _userSupportTeamViewMyDataRepository.Get(w => w.UserId == request.UserId);
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

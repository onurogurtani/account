using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.CoachLeaderCoaches.Commands
{
    /// <summary>
    /// Create CoachLeaderCoach
    /// </summary>
    [TransactionScope]
    [LogScope]
    // 
    public class CreateCoachLeaderCoachCommand : IRequest<IResult>
    {
        public CoachLeaderCoach CoachLeaderCoach { get; set; }

        [MessageClassAttr("Koç Liderine Koç Ekle")]
        public class CreateCoachLeaderCoachCommandHandler : IRequestHandler<CreateCoachLeaderCoachCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly ICoachLeaderCoachRepository _coachLeaderCoachRepository;
            private readonly ITokenHelper _tokenHelper;

            public CreateCoachLeaderCoachCommandHandler(ICoachLeaderCoachRepository coachLeaderCoachRepository, IUserRepository userRepository, ITokenHelper tokenHelper)
            {
                _coachLeaderCoachRepository = coachLeaderCoachRepository;
                _userRepository = userRepository;
                _tokenHelper = tokenHelper;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordAlreadyExists = Messages.RecordAlreadyExists;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public async Task<IResult> Handle(CreateCoachLeaderCoachCommand request, CancellationToken cancellationToken)
            {
                long currentuserId = _tokenHelper.GetUserIdByCurrentToken();
                var currentUser = await _userRepository.GetAsync(p => p.Id == currentuserId);

                if (currentUser.UserType != UserType.Admin && currentUser.UserType != UserType.OrganisationAdmin && currentUser.UserType != UserType.FranchiseAdmin)
                    return new ErrorResult(Messages.AutorizationRoleError);

                var isThereCoachLeadar = _userRepository.Query().Where(w => w.Id == request.CoachLeaderCoach.UserId && w.UserType == UserType.CoachLeader);
                if (!isThereCoachLeadar.Any())
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                var isThereCoach = _userRepository.Query().Where(w => w.Id == request.CoachLeaderCoach.CoachId && w.UserType == UserType.Coach);
                if (!isThereCoach.Any())
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                var isThereRecord = _coachLeaderCoachRepository.Query().Where(w => w.UserId == request.CoachLeaderCoach.UserId && w.CoachId == request.CoachLeaderCoach.CoachId);
                if (isThereRecord.Any())
                    return new ErrorResult(RecordAlreadyExists.PrepareRedisMessage());

                _coachLeaderCoachRepository.Add(request.CoachLeaderCoach);
                await _coachLeaderCoachRepository.SaveChangesAsync();
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}


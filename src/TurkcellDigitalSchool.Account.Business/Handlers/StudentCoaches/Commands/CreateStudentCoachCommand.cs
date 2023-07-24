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

namespace TurkcellDigitalSchool.Account.Business.Handlers.StudentCoaches.Commands
{
    /// <summary>
    /// Create Student Coach
    /// </summary>
    [TransactionScope]
    [LogScope]
    // 
    public class CreateStudentCoachCommand : IRequest<IResult>
    {
        public StudentCoach StudentCoach { get; set; }

        [MessageClassAttr("Öðrenciye Koç Ekle")]
        public class CreateStudentCoachCommandHandler : IRequestHandler<CreateStudentCoachCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly IStudentCoachRepository _studentCoachRepository;
            private readonly ITokenHelper _tokenHelper;

            public CreateStudentCoachCommandHandler(IStudentCoachRepository studentCoachRepository, IUserRepository userRepository, ITokenHelper tokenHelper)
            {
                _studentCoachRepository = studentCoachRepository;
                _userRepository = userRepository;
                _tokenHelper = tokenHelper;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordAlreadyExists = Messages.RecordAlreadyExists;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public async Task<IResult> Handle(CreateStudentCoachCommand request, CancellationToken cancellationToken)
            {
                long currentuserId = _tokenHelper.GetUserIdByCurrentToken();
                var currentUser = await _userRepository.GetAsync(p => p.Id == currentuserId);

                if (currentUser.UserType != UserType.Admin && currentUser.UserType != UserType.OrganisationAdmin && currentUser.UserType != UserType.FranchiseAdmin)
                    return new ErrorResult(Messages.AutorizationRoleError);

                var isThereStudent = _userRepository.Query().Where(w => w.Id == request.StudentCoach.UserId && w.UserType == UserType.Student);
                if (!isThereStudent.Any())
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                var isThereCoach = _userRepository.Query().Where(w => w.Id == request.StudentCoach.CoachId && w.UserType == UserType.Coach);
                if (!isThereCoach.Any())
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                var isThereRecord = _studentCoachRepository.Query().Where(w => w.UserId == request.StudentCoach.UserId && w.CoachId == request.StudentCoach.CoachId);
                if (isThereRecord.Any())
                    return new ErrorResult(RecordAlreadyExists.PrepareRedisMessage());

                _studentCoachRepository.Add(request.StudentCoach);
                await _studentCoachRepository.SaveChangesAsync();
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}


using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands
{
    public class SetTeacherActivateStatusCommand : IRequest<IResult>
    {
        public long Id { get; set; }
        public bool Status { get; set; }

        [MessageClassAttr("Öðretmen Durum Set Etme")]
        public class SetTeacherActivateStatusCommandHandler : IRequestHandler<SetTeacherActivateStatusCommand, IResult>
        {
            private readonly IUserRepository _userRepository;

            public SetTeacherActivateStatusCommandHandler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string UserIsNotTeacher = Constants.Messages.UserIsNotTeacher;
            [MessageConstAttr(MessageCodeType.Success)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [SecuredOperation(Priority = 1)]
            [LogAspect(typeof(FileLogger))]
            public async Task<IResult> Handle(SetTeacherActivateStatusCommand request, CancellationToken cancellationToken)
            {
                var teacher = await _userRepository.GetAsync(x => x.Id == request.Id);
                if (teacher == null)
                {
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());
                }

                if (teacher.UserType != null && teacher.UserType != UserType.Teacher)
                    return new ErrorDataResult<User>(UserIsNotTeacher.PrepareRedisMessage());

                teacher.Status = request.Status;

                _userRepository.Update(teacher);
                await _userRepository.SaveChangesAsync();

                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}


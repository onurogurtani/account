using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands
{
    [LogScope]
    [SecuredOperation]
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
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
          
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


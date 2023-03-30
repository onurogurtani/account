using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands
{
    public class SetTeacherActivateStatusCommand : IRequest<IResult>
    {
        public long Id { get; set; }
        public bool Status { get; set; }

        public class SetTeacherActivateStatusCommandHandler : IRequestHandler<SetTeacherActivateStatusCommand, IResult>
        {
            private readonly IUserRepository _userRepository;

            public SetTeacherActivateStatusCommandHandler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }

            [SecuredOperation(Priority = 1)]
            [LogAspect(typeof(FileLogger))]
            public async Task<IResult> Handle(SetTeacherActivateStatusCommand request, CancellationToken cancellationToken)
            {
                var teacher = await _userRepository.GetAsync(x => x.Id == request.Id);
                if (teacher == null)
                {
                    return new ErrorResult(Messages.RecordDoesNotExist);
                }

                if (teacher.UserTypeEnum.HasValue && teacher.UserTypeEnum != UserTypeEnum.Teacher)
                    return new ErrorDataResult<User>(Account.Business.Constants.Messages.UserIsNotTeacher);

                teacher.Status = request.Status;

                _userRepository.Update(teacher);
                await _userRepository.SaveChangesAsync();

                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }
    }
}


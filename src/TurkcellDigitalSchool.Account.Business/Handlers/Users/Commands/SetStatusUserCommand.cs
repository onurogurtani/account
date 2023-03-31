using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.Users.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    /// <summary>
    /// SetStatus User
    /// </summary>
    public class SetStatusUserCommand : IRequest<IResult>
    {
        public long Id { get; set; }
        public bool Status { get; set; }

        public class SetStatusUserCommandHandler : IRequestHandler<SetStatusUserCommand, IResult>
        {
            private readonly IUserRepository _userRepository;

            public SetStatusUserCommandHandler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(SetStatusUserValidator), Priority = 2)]
            public async Task<IResult> Handle(SetStatusUserCommand request, CancellationToken cancellationToken)
            {
                var record = await _userRepository.GetAsync(x => x.Id == request.Id);
                if (record == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                record.Status = request.Status;

                _userRepository.Update(record);
                await _userRepository.SaveChangesAsync();
                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }
    }
}


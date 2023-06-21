using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands
{
    /// <summary>
    /// SetStatus Admin User
    /// </summary>
    [LogScope]
    [SecuredOperationScope]
    public class SetStatusAdminCommand : IRequest<IResult>
    {
        public long Id { get; set; }
        public bool Status { get; set; }


        public class SetStatusAdminCommandHandler : IRequestHandler<SetStatusAdminCommand, IResult>
        {
            private readonly IUserRepository _userRepository;

            public SetStatusAdminCommandHandler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }

            public async Task<IResult> Handle(SetStatusAdminCommand request, CancellationToken cancellationToken)
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


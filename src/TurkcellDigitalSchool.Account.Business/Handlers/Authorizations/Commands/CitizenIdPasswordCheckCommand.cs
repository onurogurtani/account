using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.DataAccess.Abstract; 
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [LogScope]
    public class CitizenIdPasswordCheckCommand : IRequest<IResult>
    {
        public long CitizenId { get; set; }
        public string CurrentPassword { get; set; }
        public class CitizenIdPasswordCheckCommandHandler : IRequestHandler<CitizenIdPasswordCheckCommand, IResult>
        {
            private readonly IUserRepository _userRepository;

            public CitizenIdPasswordCheckCommandHandler(IUserRepository userRepository )
            {
                _userRepository = userRepository;
            }

              
            public async Task<IResult> Handle(CitizenIdPasswordCheckCommand request, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetAsync(u => u.CitizenId == request.CitizenId && u.Status);
                if (user == null)
                {
                    return new ErrorResult(Messages.PassError);
                }

                if (!HashingHelper.VerifyPasswordHash(request.CurrentPassword, user.PasswordSalt, user.PasswordHash))
                {
                    return new ErrorResult(Messages.PassError);
                }

                return new SuccessResult(Messages.PassError);
            }
        }
    }
}
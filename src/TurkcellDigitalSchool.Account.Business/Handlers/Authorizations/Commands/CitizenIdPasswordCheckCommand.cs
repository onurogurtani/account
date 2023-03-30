using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
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

            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
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
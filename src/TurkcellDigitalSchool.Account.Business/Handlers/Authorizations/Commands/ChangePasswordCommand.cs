using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules;
using TurkcellDigitalSchool.Account.Business.Services.Authentication;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [LogScope]
    public class ChangePasswordCommand : IRequest<IResult>
    {
        public long CitizenId { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }

        public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly IMediator _mediator;

            public ChangePasswordCommandHandler(IUserRepository userRepository, IMediator mediator)
            {
                _userRepository = userRepository;
                _mediator = mediator;
            }

            [CacheRemoveAspect("Get")]
            
            public async Task<IResult> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
            {
                var result = await _mediator.Send(new CitizenIdPasswordCheckCommand { CitizenId = request.CitizenId, CurrentPassword = request.CurrentPassword }, cancellationToken);
                if (!result.Success)
                {
                    return new ErrorDataResult<DArchToken>(Messages.PassError);
                }

                try
                {
                    ValidationTool.Validate((IValidator)Activator.CreateInstance(typeof(ChangePasswordValidator)), request);
                }
                catch (Exception)
                {
                    return new ErrorDataResult<User>(Messages.InvalidPass);
                }

                HashingHelper.CreatePasswordHash(request.NewPassword, out var passwordSalt, out var passwordHash);
                var user = await _userRepository.GetAsync(u => u.CitizenId == request.CitizenId && u.Status);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.LastPasswordDate = DateTime.UtcNow;

                _userRepository.Update(user);
                await _userRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Updated);
            }
        }
    }
}

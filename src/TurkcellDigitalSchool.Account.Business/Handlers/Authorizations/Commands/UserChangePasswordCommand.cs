using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [LogScope]
    public class UserChangePasswordCommand : IRequest<IResult>
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public class UserChangePasswordCommandHandler : IRequestHandler<UserChangePasswordCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly ITokenHelper _tokenHelper;
            public UserChangePasswordCommandHandler(IUserRepository userRepository, ITokenHelper tokenHelper)
            {
                _userRepository = userRepository;
                _tokenHelper = tokenHelper;
            }

            /// <summary>
            /// User Change Password
            /// Current user password is checked.
            /// If the check is successful, the new password is updated to the user account.
            /// </summary>
          
            public async Task<IResult> Handle(UserChangePasswordCommand request, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetAsync(u => u.Id == _tokenHelper.GetUserIdByCurrentToken());

                if (user == null)
                {
                    return new ErrorResult(Messages.UserNotFound);
                }
                else if (!HashingHelper.VerifyPasswordHash(request.CurrentPassword, user.PasswordSalt, user.PasswordHash))
                {
                    return new ErrorDataResult<User>(Messages.CurrentPassError);
                }

                try
                {
                    ValidationTool.Validate((IValidator)Activator.CreateInstance(typeof(UserChangePasswordValidator)), request);
                }
                catch (ValidationException)
                {
                    return new ErrorDataResult<User>(Messages.InvalidPass);
                }

                HashingHelper.CreatePasswordHash(request.NewPassword, out var passwordSalt, out var passwordHash);

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
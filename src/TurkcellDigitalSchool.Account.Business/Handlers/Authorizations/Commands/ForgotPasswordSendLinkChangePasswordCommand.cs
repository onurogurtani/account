using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DotNetCore.CAP;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.IdentityServerServices.Model.Response;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [LogScope]
    [TransactionScope]
    public class ForgotPasswordSendLinkChangePasswordCommand : IRequest<IDataResult<TokenIntegraitonResponse>>
    {
        public string XId { get; set; }
        public string Guid { get; set; }
        public string CsrfToken { get; set; }
        public string ClientId { get; set; }
        public string NewPass { get; set; }
        public string NewPassAgain { get; set; }

        public class ForgotPasswordSendLinkCheckCommandHandler : IRequestHandler<ForgotPasswordSendLinkChangePasswordCommand, IDataResult<TokenIntegraitonResponse>>
        {
            private readonly IUserRepository _userRepository;
            private readonly ILoginFailCounterRepository _loginFailCounterRepository;
            private readonly ILoginFailForgetPassSendLinkRepository _loginFailForgetPassSendLinkRepository;
            private readonly IMediator _mediator;
            private readonly ICapPublisher _capPublisher;

            public ForgotPasswordSendLinkCheckCommandHandler(IUserRepository userRepository,
                ILoginFailCounterRepository loginFailCounterRepository, ILoginFailForgetPassSendLinkRepository loginFailForgetPassSendLinkRepository, IMediator mediator, ICapPublisher capPublisher)
            {
                _userRepository = userRepository;
                _loginFailCounterRepository = loginFailCounterRepository;
                _loginFailForgetPassSendLinkRepository = loginFailForgetPassSendLinkRepository;
                _mediator = mediator;
                _capPublisher = capPublisher;
            }


            public async Task<IDataResult<TokenIntegraitonResponse>> Handle(ForgotPasswordSendLinkChangePasswordCommand request, CancellationToken cancellationToken)
            {
                if (request.NewPass != request.NewPassAgain)
                {
                    return new ErrorDataResult<TokenIntegraitonResponse>(Messages.PasswordNotEqual);
                }


                var userId = Convert.ToInt64(Base64UrlEncoder.Decode(request.XId));

                var user = await _userRepository.GetAsync(u => u.Id == userId);


                if (user == null)
                {
                    return new ErrorDataResult<TokenIntegraitonResponse>(Messages.UserNotFound);
                }


                var now = DateTime.Now;
                var linkData = _loginFailForgetPassSendLinkRepository
                    .Query().FirstOrDefault(w => w.ExpDate >= now && w.Guid == request.Guid && w.UserId == userId);

                if (linkData == null)
                {
                    return new ErrorDataResult<TokenIntegraitonResponse>(Messages.PasswordChangeLinkTimeout);
                }

                if (linkData.UsedStatus != UsedStatus.Send)
                {
                    return new ErrorDataResult<TokenIntegraitonResponse>(Messages.PasswordChangeLinkIsUsed);
                }

                if (linkData.CheckCount > 1)
                {
                    return new ErrorDataResult<TokenIntegraitonResponse>(Messages.PasswordChangeLinkIsUsed);
                }

                linkData.UsedStatus = UsedStatus.Used;
                await _loginFailForgetPassSendLinkRepository.UpdateAndSaveAsync(linkData);

                HashingHelper.CreatePasswordHash(request.NewPass, out var passwordSalt, out var passwordHash);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.FailOtpCount = 0;
                user.LastPasswordDate = DateTime.Now;
                await _userRepository.UpdateAndSaveAsync(user);
                await _capPublisher.PublishAsync(user.GeneratePublishName(EntityState.Modified), user, cancellationToken: cancellationToken);
                await _loginFailCounterRepository.ResetCsrfTokenFailLoginCount(request.CsrfToken);
                var tokenResponse = await _mediator.Send(new GetTokenQuery
                {
                    UserId = user.Id,
                    Password = request.NewPass,
                    ClientId = request.ClientId,
                });

                return new SuccessDataResult<TokenIntegraitonResponse>(tokenResponse.Data, Messages.PasswordChanged);
            }
        }
    }
}

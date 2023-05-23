using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.IdentityModel.Tokens; 
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [LogScope]
    public class ForgotPasswordSendLinkCheckCommand : IRequest<IResult>
    {
        public string XId { get; set; }
        public string Guid { get; set; } 

        public class ForgotPasswordSendLinkCheckCommandHandler : IRequestHandler<ForgotPasswordSendLinkCheckCommand, IResult>
        {
            private readonly IUserRepository _userRepository; 
            private readonly ILoginFailForgetPassSendLinkRepository _loginFailForgetPassSendLinkRepository; 

            public ForgotPasswordSendLinkCheckCommandHandler(IUserRepository userRepository,  ILoginFailForgetPassSendLinkRepository loginFailForgetPassSendLinkRepository)
            {
                _userRepository = userRepository; 
                _loginFailForgetPassSendLinkRepository = loginFailForgetPassSendLinkRepository; 
            }
             
            public async Task<IResult> Handle(ForgotPasswordSendLinkCheckCommand request, CancellationToken cancellationToken)
            { 
                var userId = Convert.ToInt64(Base64UrlEncoder.Decode(request.XId));

                var user = await _userRepository.GetAsync(u => u.Id == userId);


                if (user == null)
                {
                    return new ErrorResult(Messages.UserNotFound);
                }


                var now = DateTime.Now;
                var linkData =  _loginFailForgetPassSendLinkRepository
                    .Query().FirstOrDefault(w => w.ExpDate >= now && w.Guid == request.Guid && w.UserId == userId);

                if (linkData==null)
                {
                    return new ErrorResult(Messages.PasswordChangeLinkTimeout);
                }

                if (linkData.UsedStatus!=UsedStatus.Send)
                {
                    return new ErrorResult(Messages.PasswordChangeLinkIsUsed);
                }


                if (linkData.UsedStatus != UsedStatus.Send)
                {
                    return new ErrorResult(Messages.PasswordChangeLinkIsUsed);
                }

           
                linkData.CheckCount += 1;
                await _loginFailForgetPassSendLinkRepository.UpdateAndSaveAsync(linkData);

                if (linkData.CheckCount>1)
                {
                    return new ErrorResult(Messages.PasswordChangeLinkIsUsed);
                }
                 
                return new SuccessResult();
            }
        }
    }
}

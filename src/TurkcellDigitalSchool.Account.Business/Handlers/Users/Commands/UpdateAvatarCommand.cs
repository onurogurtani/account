using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands;
using TurkcellDigitalSchool.Account.Business.Services.Otp;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.Domain.Enums.OTP;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    public class UpdateAvatarCommand : IRequest<IResult>
    {
        public long AvatarId { get; set; }

        [MessageClassAttr("Kullanıcı Profil Avatar Güncelleme")]
        public class UpdateAvatarCommandHandler : IRequestHandler<UpdateAvatarCommand, IResult>
        {
            private readonly IUserService _userService;
            private readonly ITokenHelper _tokenHelper;

            public UpdateAvatarCommandHandler(IUserService userService, ITokenHelper tokenHelper)
            {
                _userService = userService;
                _tokenHelper = tokenHelper;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public async Task<IResult> Handle(UpdateAvatarCommand request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();
                var updateAvatar = await _userService.UpdateAvatarAsync(userId, request.AvatarId);
                if (!updateAvatar.Success)
                {
                    return new ErrorResult(updateAvatar.Message);
                }
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

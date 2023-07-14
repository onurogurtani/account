using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    [LogScope]

    public class UpdateUserPersonalInformationCommand : IRequest<IResult>
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string MobilPhone { get; set; }
        public long? ResidenceCityId { get; set; }
        public long? ResidenceCountyId { get; set; }

        [MessageClassAttr("Kullanıcı Profil Kişisel Bilgiler Ekleme/Güncelleme")]
        public class UpdateUserPersonalInformationCommandHandler : IRequestHandler<UpdateUserPersonalInformationCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly IUserService _userService;
            private readonly ITokenHelper _tokenHelper;
            private readonly IMediator _mediator;
            public UpdateUserPersonalInformationCommandHandler(IUserRepository userRepository, IUserService userService, ITokenHelper tokenHelper, IMediator mediator)
            {
                _userRepository = userRepository;
                _userService = userService;
                _tokenHelper = tokenHelper;
                _mediator = mediator;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string UserNameAlreadyExist = Constants.Messages.UserNameAlreadyExist;
            [MessageConstAttr(MessageCodeType.Error, "Kullanıcı,İl,İlçe")]
            private static string RecordsDoesNotExist = Constants.Messages.RecordsDoesNotExist;
            public async Task<IResult> Handle(UpdateUserPersonalInformationCommand request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();
                var getUser = _userService.GetUserById(userId);
                if (getUser == null)
                    return new ErrorResult(string.Format(RecordsDoesNotExist.PrepareRedisMessage(), "Kullanıcı"));

                if (request.ResidenceCityId != null && !_userService.IsExistCity((long)request.ResidenceCityId))
                    return new ErrorResult(string.Format(RecordsDoesNotExist.PrepareRedisMessage(), "İl"));


                if (request.ResidenceCityId != null && request.ResidenceCountyId != null && !_userService.IsExistCounty((long)request.ResidenceCityId, (long)request.ResidenceCountyId))
                    return new ErrorResult(string.Format(RecordsDoesNotExist.PrepareRedisMessage(), "İlçe"));


                if (_userService.IsExistUserName(userId, request.UserName))
                    return new ErrorResult(UserNameAlreadyExist.PrepareRedisMessage());

                if (getUser.Email != request.Email)
                {
                    //todo email güncelleme burayaa alındı.
                    var updateEmail = await _mediator.Send(new UpdateUserEmailCommand { Email = request.Email }, cancellationToken);
                    if (!updateEmail.Success)
                    {
                        return new ErrorResult(updateEmail.Message);
                    }
                }

                getUser.UserName = request.UserName;
                getUser.MobilePhones = request.MobilPhone;
                getUser.MobilePhonesVerify = getUser.MobilePhones == request.MobilPhone ? true : false;
                getUser.ResidenceCityId = request.ResidenceCityId;
                getUser.ResidenceCountyId = request.ResidenceCountyId;
                await _userRepository.UpdateAndSaveAsync(getUser);
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }

    }
}

﻿using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands
{
    [LogScope]
    [SecuredOperation]
    public class UpdateStudentPersonalInformationCommand : IRequest<IResult>
    {
        public string UserName { get; set; }
        public int AvatarId { get; set; }
        public string MobilPhone { get; set; }
        public long? ResidenceCityId { get; set; }
        public long? ResidenceCountyId { get; set; }

        [MessageClassAttr("Öğrenci Profil Kişisel Bilgiler Ekleme/Güncelleme")]
        public class UpdateStudentPersonalInformationCommandHandler : IRequestHandler<UpdateStudentPersonalInformationCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly IUserService _userService;
            private readonly ITokenHelper _tokenHelper;
            public UpdateStudentPersonalInformationCommandHandler(IUserRepository userRepository, IUserService userService, ITokenHelper tokenHelper)
            {
                _userRepository = userRepository;
                _userService = userService;
                _tokenHelper = tokenHelper;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string UserNameAlreadyExist = Constants.Messages.UserNameAlreadyExist;
            [MessageConstAttr(MessageCodeType.Error, "Kullanıcı,İl,İlçe")]
            private static string RecordsDoesNotExist = Constants.Messages.RecordsDoesNotExist;
            public async Task<IResult> Handle(UpdateStudentPersonalInformationCommand request, CancellationToken cancellationToken)
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

                getUser.UserName = request.UserName;
                getUser.AvatarId = request.AvatarId;
                getUser.MobilePhones = request.MobilPhone;
                getUser.MobilePhonesVerify = (getUser.MobilePhones == request.MobilPhone) ? true : false;
                getUser.ResidenceCityId = request.ResidenceCityId;
                getUser.ResidenceCountyId = request.ResidenceCountyId;
                await _userRepository.UpdateAndSaveAsync(getUser);
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }

    }
}

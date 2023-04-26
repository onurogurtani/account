using DocumentFormat.OpenXml.Wordprocessing;
using MediatR;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.ValidationRules;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands
{
    public class UpdateStudentPersonalInformationCommand : IRequest<IResult>
    {
        //TODO UserId Tokendan alınacaktır?
        public long UserId { get; set; }
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
            public UpdateStudentPersonalInformationCommandHandler(IUserRepository userRepository, IUserService userService)
            {
                _userRepository = userRepository;
                _userService = userService;
            }

            [MessageConstAttr(MessageCodeType.Success)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string UserNameAlreadyExist = Constants.Messages.UserNameAlreadyExist;
            [MessageConstAttr(MessageCodeType.Error,"Kullanıcı,İl,İlçe")]
            private static string RecordsDoesNotExist = Constants.Messages.RecordsDoesNotExist;

            [ValidationAspect(typeof(UpdateStudentPersonalInformationValidator), Priority = 2)]
            public async Task<IResult> Handle(UpdateStudentPersonalInformationCommand request, CancellationToken cancellationToken)
            {
                var getUser = _userService.GetUserById(request.UserId);

                if (getUser == null)
                    return new ErrorResult(string.Format(RecordsDoesNotExist.PrepareRedisMessage(),"Kullanıcı"));

                if (request.ResidenceCityId != null && !_userService.IsExistCity((long)request.ResidenceCityId))
                    return new ErrorResult(string.Format(RecordsDoesNotExist.PrepareRedisMessage(), "İl"));


                if (request.ResidenceCityId != null && request.ResidenceCountyId != null && !_userService.IsExistCounty((long)request.ResidenceCityId, (long)request.ResidenceCountyId))
                    return new ErrorResult(string.Format(RecordsDoesNotExist.PrepareRedisMessage(), "İlçe"));


                if (_userService.IsExistUserName(request.UserId, request.UserName))
                    return new ErrorResult(UserNameAlreadyExist.PrepareRedisMessage());

                getUser.UserName = request.UserName;
                getUser.AvatarId = request.AvatarId;
                getUser.MobilePhones = request.MobilPhone;
                getUser.ResidenceCityId = request.ResidenceCityId;
                getUser.ResidenceCountyId = request.ResidenceCountyId;
                await _userRepository.UpdateAndSaveAsync(getUser);
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }

    }
}

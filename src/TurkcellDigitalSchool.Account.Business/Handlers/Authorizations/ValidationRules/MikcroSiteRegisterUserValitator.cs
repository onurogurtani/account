using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules
{
    [MessageClassAttr("Mikro Site Üyeol Doğrulayıcı")]

    public class MikcroSiteRegisterUserValitator : AbstractValidator<MikcroSiteRegisterUserCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, " Kullanıcı Tipi, Ad, Soyad, TCKN, Doğum Tarihi, Telefon, Email, Şifre")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;

        [MessageConstAttr(MessageCodeType.Error, "Email")]
        private static string EmailIsNotValid = Messages.EmailIsNotValid;
        public MikcroSiteRegisterUserValitator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
            RuleFor(x => x.SurName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Soyad" }));
            RuleFor(x => x.CitizenId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "TCKN" }));
            RuleFor(x => x.BirtDate).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Doğum Tarihi" }));
            RuleFor(x => x.MobilePhones).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Telefon" }));
            RuleFor(x => x.Email).EmailAddress().When(w => !string.IsNullOrEmpty(w.Email)).WithMessage(EmailIsNotValid.PrepareRedisMessage(messageParameters: new object[] { "Email" }));
            RuleFor(x => x.Password).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Telefon" }));

            When(x => x.CitizenId != 0, () =>
            {
                RuleFor(x => x.CitizenId.ToString()).Must(x => x.Length == 11).WithMessage(Messages.WrongCitizenId);
            });

            When(w => w.UserTypeId != Core.Enums.UserType.Student || w.UserTypeId != Core.Enums.UserType.Parent, () =>
            {
                RuleFor(x => x.UserTypeId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kullanıcı Tipi" }));
            });
        }



    }
}

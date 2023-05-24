using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.ValidationRules
{

    [MessageClassAttr("Öğrenci Profilim Kişisel Bilgilerim Email Güncelleme Validasyonu")]
    public class UpdateStudentEmailValidator : AbstractValidator<UpdateStudentEmailCommand>
    {
        [MessageConstAttr(MessageCodeType.Error)]
        private static string RequiredField = Messages.RequiredField;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string EmailIsNotValid = Messages.EmailIsNotValid;
        public UpdateStudentEmailValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.Email).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.Email).EmailAddress().WithMessage(EmailIsNotValid.PrepareRedisMessage());
        }
    }

    [MessageClassAttr("Öğrenci Profilim Kişisel Bilgilerim Güncelleme Validasyonu")]

    public class UpdateStudentPersonalInformationValidator : AbstractValidator<UpdateStudentPersonalInformationCommand>
    {
        [MessageConstAttr(MessageCodeType.Error)]
        private static string RequiredField = Messages.RequiredField;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string InvalidPhoneNumber = Constants.Messages.InvalidPhoneNumber;
        public UpdateStudentPersonalInformationValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.UserName).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.AvatarId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.MobilPhone).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.MobilPhone).PhoneNumberAlphacharCheck();

            //TODO mobil telefon OTP yapılınca validasyonu yapılacak.


            //RuleFor(x => x.ResidenceCityId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            //RuleFor(x => x.ResidenceCountyId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
        }
    }

    [MessageClassAttr("Öğrenci Profilim Veli Bilgilerim Ekleme/Güncelleme Validasyonu")]
    public class UpdateStudentParentInformationValidator : AbstractValidator<UpdateStudentParentInformationCommand>
    {
        [MessageConstAttr(MessageCodeType.Error)]
        private static string RequiredField = Messages.RequiredField;
        public UpdateStudentParentInformationValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.SurName).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.CitizenId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.Email).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.MobilePhones).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.MobilePhones).PhoneNumberAlphacharCheck();
        }
    }

    [MessageClassAttr("Öğrenci Profilim Eğitim Bilgilerim Ekeleme/Güncelleme Validasyonu")]
    public class UpdateStudentEducationInformationValidator : AbstractValidator<UpdateStudentEducationInformationCommand>
    {
        [MessageConstAttr(MessageCodeType.Error)]
        private static string RequiredField = Messages.RequiredField;
        public UpdateStudentEducationInformationValidator()
        {
            RuleFor(x => x.StudentEducationRequest.UserId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.StudentEducationRequest.ExamType).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            //RuleFor(x => x.StudentEducationRequest.CityId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            //RuleFor(x => x.StudentEducationRequest.CountyId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.StudentEducationRequest.InstitutionId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.StudentEducationRequest.SchoolId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());

        }
    }

}


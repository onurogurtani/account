using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Schools.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.ValidationRules
{
    [MessageClassAttr("Öğrenci Profilim Veli Bilgilerim Ekleme/Güncelleme Validasyonu")]
    public class UpdateStudentGuardianInformationValidator : AbstractValidator<UpdateStudentGuardianInformationCommand>
    {
        [MessageConstAttr(MessageCodeType.Error)]
        private static string RequiredField = Messages.RequiredField;
        public UpdateStudentGuardianInformationValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.Name).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.SurName).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.CitizenId).NotEmpty().Must(w => w.ToString().Length > 0 && w.ToString().Length < 12).WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.Email).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.MobilPhones).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
        }
    }

    [MessageClassAttr("Öğrenci Profilim Eğitim Bilgilerim Ekeleme/Güncelleme Validasyonu")]
    public class UpdateStudentEducationInformationValidator : AbstractValidator<UpdateStudentEducationInformationCommand>
    {
        [MessageConstAttr(MessageCodeType.Error)]
        private static string RequiredField = Messages.RequiredField;
        public UpdateStudentEducationInformationValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.ExamType).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.CityId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.CountyId).NotEmpty().Must(w => w.ToString().Length > 0 && w.ToString().Length < 12).WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.SchoolType).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.SchoolId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());

        }
    }

}


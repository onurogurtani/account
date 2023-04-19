﻿using FluentValidation;
using FluentValidation.Validators;
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
    [MessageClassAttr("Öğrenci Profilim Kişisel Telefon Doğrulama Validasyonu")]
    public class UpdateStudentVerifyMobilPhoneValidator : AbstractValidator<UpdateStudentVerifyMobilPhoneCommand>
    {
        [MessageConstAttr(MessageCodeType.Error)]
        private static string RequiredField = Messages.RequiredField;
        public UpdateStudentVerifyMobilPhoneValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
        }
    }


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
            RuleFor(x => x.MobilPhone).Must(w => w.Length != 10).WithMessage(InvalidPhoneNumber.PrepareRedisMessage());
            RuleFor(x => x.ResidenceCityId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
            RuleFor(x => x.ResidenceCountyId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage());
        }
    }

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


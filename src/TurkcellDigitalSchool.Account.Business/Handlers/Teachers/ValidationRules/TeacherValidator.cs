using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Teachers.ValidationRules
{
    public class AddTeacherValidator : AbstractValidator<AddTeacherCommand>
    {
        public AddTeacherValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage(Messages.RequiredField);
            RuleFor(x => x.Name).Length(2, 100).Matches("^[a-zA-Z()ýðüþöçÝÐÜÞÖÇ ]*$").WithMessage("Ýsim Sadece Harflerden Oluþmalýdýr");
            RuleFor(x => x.SurName).NotEmpty().WithMessage(Messages.RequiredField);
            RuleFor(x => x.SurName).Length(2, 100).Matches("^[a-zA-Z()ýðüþöçÝÐÜÞÖÇ ]*$").WithMessage("Soyisim Sadece Harflerden Oluþmalýdýr");
            RuleFor(x => x.CitizenId).NotEmpty().WithMessage(Messages.RequiredField).Must(q => q.ToString().Length == 11).WithMessage("Tc Kimlik Numarasý 11 Hane Olmalýdýr");
            RuleFor(x => x.MobilePhones).NotEmpty().WithMessage(Messages.RequiredField);
            RuleFor(x => x.Email).NotEmpty().WithMessage(Messages.RequiredField);
            RuleFor(x => x.Email).EmailAddress().When(w => !string.IsNullOrEmpty(w.Email)).WithMessage(Messages.EmailIsNotValid);
            RuleFor(x => x.MobilePhones).NumberMustBe10Digit().When(w => !string.IsNullOrEmpty(w.MobilePhones));
        }
    }

    public class UpdateTeacherValidator : AbstractValidator<UpdateTeacherCommand>
    {
        public UpdateTeacherValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage("Id gereklidir");
            RuleFor(x => x.Name).NotEmpty().WithMessage(Messages.RequiredField);
            RuleFor(x => x.Name).Length(2, 100).Matches("^[a-zA-Z()ýðüþöçÝÐÜÞÖÇ ]*$").WithMessage("Ýsim Sadece Harflerden Oluþmalýdýr");
            RuleFor(x => x.SurName).NotEmpty().WithMessage(Messages.RequiredField);
            RuleFor(x => x.SurName).Length(2, 100).Matches("^[a-zA-Z()ýðüþöçÝÐÜÞÖÇ ]*$").WithMessage("Soyisim Sadece Harflerden Oluþmalýdýr");
            RuleFor(x => x.CitizenId).NotEmpty().WithMessage(Messages.RequiredField).Must(q => q.ToString().Length == 11).WithMessage("Tc Kimlik Numarasý 11 Hane Olmalýdýr");
            RuleFor(x => x.MobilePhones).NotEmpty().WithMessage(Messages.RequiredField);
            RuleFor(x => x.Email).NotEmpty().WithMessage(Messages.RequiredField);
            RuleFor(x => x.Email).EmailAddress().When(w => !string.IsNullOrEmpty(w.Email)).WithMessage(Messages.EmailIsNotValid);
            RuleFor(x => x.MobilePhones).NumberMustBe10Digit().When(w => !string.IsNullOrEmpty(w.MobilePhones));
        }
    }

    public class DeleteTeacherValidator : AbstractValidator<DeleteTeacherCommand>
    {
        public DeleteTeacherValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().WithMessage("UserId gereklidir");
            RuleFor(x => x.OrganisationId).NotEmpty().WithMessage("OrganisationId gereklidir");
        }
    }

}
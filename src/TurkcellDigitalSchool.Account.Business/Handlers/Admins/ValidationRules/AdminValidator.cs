using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Admins.ValidationRules
{

    public class CreateAdminValidator : AbstractValidator<CreateAdminCommand>
    {
        public CreateAdminValidator()
        {
            RuleFor(x => x.Admin.CitizenId).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Admin.CitizenId).Length(11).WithMessage("Tc Kimlik Numaras� 11 Haneli olmal�.");
            RuleFor(x => x.Admin.UserType).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Admin.Name).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Admin.SurName).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Admin.Email).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Admin.MobilePhones).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
        }
    }
    public class UpdateAdminValidator : AbstractValidator<UpdateAdminCommand>
    {
        public UpdateAdminValidator()
        {
            RuleFor(x => x.Admin.CitizenId).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Admin.CitizenId).Length(11).WithMessage("Tc Kimlik Numaras� 11 Haneli olmal�.");
            RuleFor(x => x.Admin.UserType).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Admin.Id).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Admin.Name).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Admin.SurName).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Admin.Email).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Admin.MobilePhones).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
        }
    }

    public class DeleteAdminValidator : AbstractValidator<DeleteAdminCommand>
    {
        public DeleteAdminValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
        }
    }
    public class SetStatusAdminValidator : AbstractValidator<SetStatusAdminCommand>
    {
        public SetStatusAdminValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
        }
    }
}
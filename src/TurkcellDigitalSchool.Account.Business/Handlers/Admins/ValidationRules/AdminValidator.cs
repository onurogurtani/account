using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Admins.ValidationRules
{

    public class CreateAdminValidator : AbstractValidator<CreateAdminCommand>
    {
        public CreateAdminValidator()
        {
            RuleFor(x => x.Admin.CitizenId).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Admin.CitizenId).Length(11).WithMessage("Tc Kimlik Numarasý 11 Haneli olmalý.");
            RuleFor(x => x.Admin.UserType).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Admin.Name).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Admin.SurName).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Admin.Email).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Admin.MobilePhones).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
        }
    }
    public class UpdateAdminValidator : AbstractValidator<UpdateAdminCommand>
    {
        public UpdateAdminValidator()
        {
            RuleFor(x => x.Admin.CitizenId).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Admin.CitizenId).Length(11).WithMessage("Tc Kimlik Numarasý 11 Haneli olmalý.");
            RuleFor(x => x.Admin.UserType).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Admin.Id).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Admin.Name).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Admin.SurName).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Admin.Email).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Admin.MobilePhones).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
        }
    }

    public class DeleteAdminValidator : AbstractValidator<DeleteAdminCommand>
    {
        public DeleteAdminValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
        }
    }
    public class SetStatusAdminValidator : AbstractValidator<SetStatusAdminCommand>
    {
        public SetStatusAdminValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
        }
    }
}
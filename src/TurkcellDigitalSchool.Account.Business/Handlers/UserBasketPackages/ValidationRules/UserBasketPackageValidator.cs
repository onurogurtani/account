using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.UserBasketPackages.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserBasketPackages.ValidationRules
{

    public class CreateUserBasketPackageValidator : AbstractValidator<CreateUserBasketPackageCommand>
    {
        public CreateUserBasketPackageValidator()
        {
            RuleFor(x => x.PackageId).NotEmpty().WithMessage("PackageId gereklidir");
        }
    }

    public class UpdateUserBasketPackageValidator : AbstractValidator<UpdateUserBasketPackageCommand>
    {
        public UpdateUserBasketPackageValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage("Id gereklidir");
            RuleFor(x => x.Quantity)
                .Must(quantity => quantity > 0).WithMessage("Adet 0'dan küçük olamaz");
        }
    }

    public class DeleteUserBasketPackageValidator : AbstractValidator<DeleteUserBasketPackageCommand>
    {
        public DeleteUserBasketPackageValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage("Id gereklidir");
        }
    }
}
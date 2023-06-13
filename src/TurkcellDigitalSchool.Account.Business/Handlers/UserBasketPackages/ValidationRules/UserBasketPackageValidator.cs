using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.UserBasketPackages.Commands;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserBasketPackages.ValidationRules
{
    [MessageClassAttr("Kullan�c� Paket Sepeti Ekleme Do�rulay�c�s�")]
    public class CreateUserBasketPackageValidator : AbstractValidator<CreateUserBasketPackageCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "paket")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateUserBasketPackageValidator()
        {
            RuleFor(x => x.PackageId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Paket" }));
        }
    }

    [MessageClassAttr("Kullan�c� Paket Sepeti G�ncelleme Do�rulay�c�s�")]
    public class UpdateUserBasketPackageValidator : AbstractValidator<UpdateUserBasketPackageCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error, "Adet")]
        private static string CannotBeLowerThanZero = Constants.Messages.CannotBeLowerThanZero;
        public UpdateUserBasketPackageValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.Quantity).GreaterThan(0).WithMessage(CannotBeLowerThanZero.PrepareRedisMessage(messageParameters: new object[] { "Adet" }));
        }
    }

    [MessageClassAttr("Kullan�c� Paket Sepeti Silme Do�rulay�c�s�")]
    public class DeleteUserBasketPackageValidator : AbstractValidator<DeleteUserBasketPackageCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public DeleteUserBasketPackageValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
        }
    }
}
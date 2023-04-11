using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.ValidationRules
{
    [MessageClassAttr("Paket T�r� Ekleme Do�rulay�c�s�")]
    public class CreatePackageTypeValidator : AbstractValidator<CreatePackageTypeCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "�sim")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreatePackageTypeValidator()
        {
            RuleFor(x => x.PackageType.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�sim" }));
        }
    }

    [MessageClassAttr("Paket T�r� G�ncelleme Do�rulay�c�s�")]
    public class UpdatePackageTypeValidator : AbstractValidator<UpdatePackageTypeCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,�sim")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdatePackageTypeValidator()
        {
            RuleFor(x => x.PackageType.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.PackageType.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�sim" }));
        }
    }

    [MessageClassAttr("Paket T�r� Silme Do�rulay�c�s�")]
    public class DeletePackageTypeValidator : AbstractValidator<DeletePackageTypeCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public DeletePackageTypeValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
        }
    }
}
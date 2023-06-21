using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.ValidationRules
{
    [MessageClassAttr("Paket Türü Ekleme Doðrulayýcýsý")]
    public class CreatePackageTypeValidator : AbstractValidator<CreatePackageTypeCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Ýsim")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreatePackageTypeValidator()
        {
            RuleFor(x => x.PackageType.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ýsim" }));
        }
    }

    [MessageClassAttr("Paket Türü Güncelleme Doðrulayýcýsý")]
    public class UpdatePackageTypeValidator : AbstractValidator<UpdatePackageTypeCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,Ýsim")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdatePackageTypeValidator()
        {
            RuleFor(x => x.PackageType.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.PackageType.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ýsim" }));
        }
    }

    [MessageClassAttr("Paket Türü Silme Doðrulayýcýsý")]
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
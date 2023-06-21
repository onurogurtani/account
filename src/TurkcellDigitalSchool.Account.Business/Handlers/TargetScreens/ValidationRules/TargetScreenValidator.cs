using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Commands;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.ValidationRules
{
    [MessageClassAttr("Hedef Ekraný Ekleme Doðrulayýcýsý")]
    public class CreateTargetScreenValidator : AbstractValidator<CreateTargetScreenCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Ýsim,Sayfa Ýsmi")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateTargetScreenValidator()
        {
            RuleFor(x => x.TargetScreen.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ýsim" }));
            RuleFor(x => x.TargetScreen.PageName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Sayfa Ýsmi" }));
        }
    }

    [MessageClassAttr("Hedef Ekraný Günceleme Doðrulayýcýsý")]
    public class UpdateTargetScreenValidator : AbstractValidator<UpdateTargetScreenCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,Ýsim,Sayfa Ýsmi")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateTargetScreenValidator()
        {
            RuleFor(x => x.TargetScreen.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.TargetScreen.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ýsim" }));
            RuleFor(x => x.TargetScreen.PageName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Sayfa Ýsmi" }));
        }
    }

    [MessageClassAttr("Hedef Ekraný Silme Doðrulayýcýsý")]
    public class DeleteTargetScreenValidator : AbstractValidator<DeleteTargetScreenCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public DeleteTargetScreenValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
        }
    }
}
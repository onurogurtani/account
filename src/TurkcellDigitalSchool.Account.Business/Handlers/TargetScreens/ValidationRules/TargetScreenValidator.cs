using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.ValidationRules
{
    [MessageClassAttr("Hedef Ekran� Ekleme Do�rulay�c�s�")]
    public class CreateTargetScreenValidator : AbstractValidator<CreateTargetScreenCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "�sim,Sayfa �smi")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateTargetScreenValidator()
        {
            RuleFor(x => x.TargetScreen.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�sim" }));
            RuleFor(x => x.TargetScreen.PageName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Sayfa �smi" }));
        }
    }

    [MessageClassAttr("Hedef Ekran� G�nceleme Do�rulay�c�s�")]
    public class UpdateTargetScreenValidator : AbstractValidator<UpdateTargetScreenCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,�sim,Sayfa �smi")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateTargetScreenValidator()
        {
            RuleFor(x => x.TargetScreen.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.TargetScreen.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�sim" }));
            RuleFor(x => x.TargetScreen.PageName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Sayfa �smi" }));
        }
    }

    [MessageClassAttr("Hedef Ekran� Silme Do�rulay�c�s�")]
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
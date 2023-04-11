using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.GraduationYears.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GraduationYears.ValidationRules
{

    [MessageClassAttr("E�itim Y�l� Ekleme Do�rulay�c�s�")]
    public class CreateGraduationYearValidator : AbstractValidator<CreateGraduationYearCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Ad")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateGraduationYearValidator()
        {
            RuleFor(x => x.Entity.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
        }
    }
    [MessageClassAttr("E�itim Y�l� D�zenleme Do�rulay�c�s�")]
    public class UpdateGraduationYearValidator : AbstractValidator<UpdateGraduationYearCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,Ad")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateGraduationYearValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.Entity.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
        }
    }
}
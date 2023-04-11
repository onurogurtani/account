using System.Linq;
using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.ValidationRules
{
    [MessageClassAttr("Organizasyon Deðiþikliði Ekleme Doðrulayýcýsý")]
    public class CreateOrganisationChangeRequestValidator : AbstractValidator<CreateOrganisationChangeRequestCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Ad,Adres,Email,Telefon,Site Adres,Þehir,Ülke")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error, "500,500,500,20,500")]
        private static string NumberMustBeCharacterMaxLength = Messages.NumberMustBeCharacterMaxLength;
        public CreateOrganisationChangeRequestValidator()
        {
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents).NotEmpty().Must(x => x.Count > 0).WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ýçerik" }));
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationName).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Adres" }));
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationMail).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().EmailAddress().MaximumLength(100).WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Email" }));
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.ContactPhone).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().MaximumLength(20).WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Telefon" }));
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationWebSite).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().MaximumLength(100).WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Site Adres" }));

            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.CityId).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Þehir" }));
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.CountyId).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ülke" }));


            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationName).Select(x => x.PropertyValue).FirstOrDefault()).MaximumLength(100).WithMessage(NumberMustBeCharacterMaxLength.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress).Select(x => x.PropertyValue).FirstOrDefault()).MaximumLength(100).WithMessage(NumberMustBeCharacterMaxLength.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationMail).Select(x => x.PropertyValue).FirstOrDefault()).EmailAddress().WithMessage(NumberMustBeCharacterMaxLength.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.ContactPhone).Select(x => x.PropertyValue).FirstOrDefault()).MaximumLength(20).WithMessage(NumberMustBeCharacterMaxLength.PrepareRedisMessage(messageParameters: new object[] { "20" }));
            RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationWebSite).Select(x => x.PropertyValue).FirstOrDefault()).MaximumLength(100).WithMessage(NumberMustBeCharacterMaxLength.PrepareRedisMessage(messageParameters: new object[] { "100" }));
        }
        }
        [MessageClassAttr("Organizasyon Deðiþikliði Düzenleme Doðrulayýcýsý")]
        public class UpdateOrganisationChangeRequestValidator : AbstractValidator<UpdateOrganisationChangeRequestCommand>
        {
            [MessageConstAttr(MessageCodeType.Error, "Id,Ad,Adres,Email,Telefon,Site Adres,Þehir,Ülke")]
            private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
            [MessageConstAttr(MessageCodeType.Error, "500,500,500,20,500")]
            private static string NumberMustBeCharacterMaxLength = Messages.NumberMustBeCharacterMaxLength;
            public UpdateOrganisationChangeRequestValidator()
            {
                RuleFor(x => x.OrganisationInfoChangeRequest.Id).NotEmpty();
                RuleFor(x => x.OrganisationInfoChangeRequest.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
                RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents).NotEmpty().Must(x => x.Count > 0).WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ýçerik" }));
                RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationName).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
                RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Adres" }));
                RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationMail).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().EmailAddress().MaximumLength(100).WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Email" }));
                RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.ContactPhone).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().MaximumLength(20).WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Telefon" }));
                RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationWebSite).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().MaximumLength(100).WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Site Adres" }));

                RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.CityId).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Þehir" }));
                RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.CountyId).Select(x => x.PropertyValue).FirstOrDefault()).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ülke" }));


                RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationName).Select(x => x.PropertyValue).FirstOrDefault()).MaximumLength(100).WithMessage(NumberMustBeCharacterMaxLength.PrepareRedisMessage(messageParameters: new object[] { "100" }));
                RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress).Select(x => x.PropertyValue).FirstOrDefault()).MaximumLength(100).WithMessage(NumberMustBeCharacterMaxLength.PrepareRedisMessage(messageParameters: new object[] { "100" }));
                RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationMail).Select(x => x.PropertyValue).FirstOrDefault()).EmailAddress().WithMessage(NumberMustBeCharacterMaxLength.PrepareRedisMessage(messageParameters: new object[] { "100" }));
                RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.ContactPhone).Select(x => x.PropertyValue).FirstOrDefault()).MaximumLength(20).WithMessage(NumberMustBeCharacterMaxLength.PrepareRedisMessage(messageParameters: new object[] { "20" }));
                RuleFor(x => x.OrganisationInfoChangeRequest.OrganisationChangeReqContents.Where(x => x.PropertyEnum == Entities.Enums.OrganisationChangePropertyEnum.OrganisationWebSite).Select(x => x.PropertyValue).FirstOrDefault()).MaximumLength(100).WithMessage(NumberMustBeCharacterMaxLength.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            }
        }

    }

using System;
using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.ValidationRules
{
    [MessageClassAttr("Kurum Ekleme Do�rulay�c�s�")]
    public class CreateOrganisationValidator : AbstractValidator<CreateOrganisationCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Kurum Ad�,M��teri Numaras�,M��teri Y�neticisi,Kurum Y�neticisi,Kurum T�r�,Kurum Adresi,Segment,�ehir,Kurum Kontakt Ki�i,Kurum Kontakt Mail, Kurum Kontakt Telefon,S�zle�me Ba�lang�� Tarihi,S�zle�me Biti� Tarihi,Paket Tipi,Paket,Paket Ad�,Lisans Say�s�,Domain,�yelik Ba�lang�� Tarihi,�yelik Biti� Tarihi,Kurum Admin Ad�,Kurum Admin Soyad�,Kurum Admin TC,Kurum Admin Maili,Kurum Admin Telefonu,Servis Bilgisi,S�zle�me Numaras�,Host,Api Key,Secret Key,Sanal E�itim Salonu Kotas�,Sanal Toplant� Salonu Kotas�,Kurum Durumu,Durum Nedeni")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error, "100,20")]
        private static string PassLengthMax = Constants.Messages.PassLengthMax;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string IsInEnumValue = Messages.IsInEnumValue;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string EmailIsNotValid = Messages.EmailIsNotValid;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string CheckDates = Constants.Messages.CheckDates;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string CitizenIdMust11Digits = Constants.Messages.CitizenIdMust11Digits;
        [MessageConstAttr(MessageCodeType.Error, "10,500")]
        private static string NumberMustBeCharacterLength = Messages.NumberMustBeCharacterLength;
        public CreateOrganisationValidator()
        {
            RuleFor(x => x.Organisation.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Ad�" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.CustomerNumber).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "M��teri Numaras�" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.CustomerManager).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "M��teri Y�neticisi" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.OrganisationManager).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Y�neticisi" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.OrganisationTypeId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum T�r�" }));
            RuleFor(x => x.Organisation.OrganisationAddress).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Adresi" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.SegmentType).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Segment" })).IsInEnum().WithMessage(IsInEnumValue);
            RuleFor(x => x.Organisation.CityId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�ehir" }));
            RuleFor(x => x.Organisation.ContactName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Kontakt Ki�i" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.ContactMail).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Kontakt Mail" })).EmailAddress().WithMessage(EmailIsNotValid).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.ContactPhone).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Kontakt Telefon" })).MaximumLength(20).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "20" }));
            RuleFor(x => x.Organisation.ContractStartDate).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "S�zle�me Ba�lang�� Tarihi" })).GreaterThan(DateTime.Now).WithMessage(CheckDates);
            RuleFor(x => x.Organisation.ContractFinishDate).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "S�zle�me Biti� Tarihi" })).GreaterThan(x => x.Organisation.ContractStartDate).WithMessage(CheckDates);
            RuleFor(x => x.Organisation.PackageKind).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Paket Tipi" })).IsInEnum().WithMessage(IsInEnumValue);
            RuleFor(x => x.Organisation.PackageId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Paket" }));
            RuleFor(x => x.Organisation.PackageName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Paket Ad�" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.LicenceNumber).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Lisans Say�s�" }));
            RuleFor(x => x.Organisation.DomainName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Domain" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.MembershipStartDate).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�yelik Ba�lang�� Tarihi" })).GreaterThan(DateTime.Now).WithMessage(CheckDates);
            RuleFor(x => x.Organisation.MembershipFinishDate).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�yelik Biti� Tarihi" })).GreaterThan(x => x.Organisation.MembershipStartDate).WithMessage(CheckDates);
            RuleFor(x => x.Organisation.AdminName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Admin Ad�" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.AdminSurname).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Admin Soyad�" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.AdminTc).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Admin TC" })).Length(11).WithMessage(CitizenIdMust11Digits);
            RuleFor(x => x.Organisation.AdminMail).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Admin Maili" })).EmailAddress().MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.AdminPhone).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Admin Telefonu" })).MaximumLength(20).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "20" }));
            RuleFor(x => x.Organisation.ServiceInfoChoice).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Servis Bilgisi" })).IsInEnum().WithMessage(IsInEnumValue);
            RuleFor(x => x.Organisation.ContractNumber).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "S�zle�me Numaras�" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.HostName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Host" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.ApiKey).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Api Key" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.ApiSecret).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Secret Key" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.VirtualTrainingRoomQuota).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Sanal E�itim Salonu Kotas�" }));
            RuleFor(x => x.Organisation.VirtualMeetingRoomQuota).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Sanal Toplant� Salonu Kotas�" }));
            RuleFor(x => x.Organisation.OrganisationStatusInfo).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Durumu" })).IsInEnum().WithMessage(IsInEnumValue);
            RuleFor(x => x.Organisation.ReasonForStatus).Must(x => x.TrimStart() != "" && x.TrimEnd() != "").NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Durum Nedeni" })).Length(10, 500).WithMessage(NumberMustBeCharacterLength.PrepareRedisMessage(messageParameters: new object[] { "10", "500" })).When(x => x.Organisation.OrganisationStatusInfo == OrganisationStatusInfo.Cancel || x.Organisation.OrganisationStatusInfo == OrganisationStatusInfo.Suspend);
        }
    }

    [MessageClassAttr("Kurum G�ncelleme Do�rulay�c�s�")]
    public class UpdateOrganisationValidator : AbstractValidator<UpdateOrganisationCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Kurum Ad�,M��teri Numaras�,M��teri Y�neticisi,Kurum Y�neticisi,Kurum T�r�,Kurum Adresi,Segment,�ehir,Kurum Kontakt Ki�i,Kurum Kontakt Mail, Kurum Kontakt Telefon,S�zle�me Ba�lang�� Tarihi,S�zle�me Biti� Tarihi,Paket Tipi,Paket,Paket Ad�,Lisans Say�s�,Domain,�yelik Ba�lang�� Tarihi,�yelik Biti� Tarihi,Kurum Admin Ad�,Kurum Admin Soyad�,Kurum Admin TC,Kurum Admin Maili,Kurum Admin Telefonu,Servis Bilgisi,S�zle�me Numaras�,Host,Api Key,Secret Key,Sanal E�itim Salonu Kotas�,Sanal Toplant� Salonu Kotas�,Kurum Durumu,Durum Nedeni")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error, "100,20")]
        private static string PassLengthMax = Constants.Messages.PassLengthMax;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string IsInEnumValue = Messages.IsInEnumValue;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string EmailIsNotValid = Messages.EmailIsNotValid;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string CheckDates = Constants.Messages.CheckDates;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string CitizenIdMust11Digits = Constants.Messages.CitizenIdMust11Digits;
        [MessageConstAttr(MessageCodeType.Error, "10,500")]
        private static string NumberMustBeCharacterLength = Messages.NumberMustBeCharacterLength;
        public UpdateOrganisationValidator()
        {
            RuleFor(x => x.Organisation.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Ad�" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.CustomerNumber).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "M��teri Numaras�" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.CustomerManager).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "M��teri Y�neticisi" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.OrganisationManager).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Y�neticisi" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.OrganisationTypeId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum T�r�" }));
            RuleFor(x => x.Organisation.OrganisationAddress).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Adresi" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.SegmentType).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Segment" })).IsInEnum().WithMessage(IsInEnumValue);
            RuleFor(x => x.Organisation.CityId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�ehir" }));
            RuleFor(x => x.Organisation.ContactName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Kontakt Ki�i" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.ContactMail).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Kontakt Mail" })).EmailAddress().WithMessage(EmailIsNotValid).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.ContactPhone).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Kontakt Telefon" })).MaximumLength(20).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "20" }));
            RuleFor(x => x.Organisation.ContractStartDate).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "S�zle�me Ba�lang�� Tarihi" })).GreaterThan(DateTime.Now).WithMessage(CheckDates);
            RuleFor(x => x.Organisation.ContractFinishDate).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "S�zle�me Biti� Tarihi" })).GreaterThan(x => x.Organisation.ContractStartDate).WithMessage(CheckDates);
            RuleFor(x => x.Organisation.PackageKind).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Paket Tipi" })).IsInEnum().WithMessage(IsInEnumValue);
            RuleFor(x => x.Organisation.PackageId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Paket" }));
            RuleFor(x => x.Organisation.PackageName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Paket Ad�" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.LicenceNumber).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Lisans Say�s�" }));
            RuleFor(x => x.Organisation.DomainName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Domain" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.MembershipStartDate).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�yelik Ba�lang�� Tarihi" })).GreaterThan(DateTime.Now).WithMessage(CheckDates);
            RuleFor(x => x.Organisation.MembershipFinishDate).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�yelik Biti� Tarihi" })).GreaterThan(x => x.Organisation.MembershipStartDate).WithMessage(CheckDates);
            RuleFor(x => x.Organisation.AdminName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Admin Ad�" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.AdminSurname).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Admin Soyad�" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.AdminTc).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Admin TC" })).Length(11).WithMessage(CitizenIdMust11Digits);
            RuleFor(x => x.Organisation.AdminMail).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Admin Maili" })).EmailAddress().MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.AdminPhone).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Admin Telefonu" })).MaximumLength(20).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "20" }));
            RuleFor(x => x.Organisation.ServiceInfoChoice).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Servis Bilgisi" })).IsInEnum().WithMessage(IsInEnumValue);
            RuleFor(x => x.Organisation.ContractNumber).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "S�zle�me Numaras�" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.HostName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Host" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.ApiKey).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Api Key" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.ApiSecret).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Secret Key" })).MaximumLength(100).WithMessage(PassLengthMax.PrepareRedisMessage(messageParameters: new object[] { "100" }));
            RuleFor(x => x.Organisation.VirtualTrainingRoomQuota).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Sanal E�itim Salonu Kotas�" }));
            RuleFor(x => x.Organisation.VirtualMeetingRoomQuota).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Sanal Toplant� Salonu Kotas�" }));
            RuleFor(x => x.Organisation.OrganisationStatusInfo).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Durumu" })).IsInEnum().WithMessage(IsInEnumValue);
            RuleFor(x => x.Organisation.ReasonForStatus).Must(x => x.TrimStart() != "" && x.TrimEnd() != "").NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Durum Nedeni" })).Length(10, 500).WithMessage(NumberMustBeCharacterLength.PrepareRedisMessage(messageParameters: new object[] { "10", "500" })).When(x => x.Organisation.OrganisationStatusInfo == OrganisationStatusInfo.Cancel || x.Organisation.OrganisationStatusInfo == OrganisationStatusInfo.Suspend);
        }
    }

    [MessageClassAttr("Kurum Durumme Do�rulay�c�s�")]
    public class UpdateOrganisationStatusValidator : AbstractValidator<UpdateOrganisationStatusCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Kurum Durumu, Durum Nedemi")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string IsInEnumValue = Messages.IsInEnumValue;
        [MessageConstAttr(MessageCodeType.Error, "10,500")]
        private static string NumberMustBeCharacterLength = Messages.NumberMustBeCharacterLength;
        public UpdateOrganisationStatusValidator()
        {
            RuleFor(x => x.OrganisationStatusInfo).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum Durumu" })).IsInEnum().WithMessage(IsInEnumValue);
            RuleFor(x => x.ReasonForStatus).Must(x => x.TrimStart() != "" && x.TrimEnd() != "").NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Durum Nedeni" })).Length(10, 500).WithMessage(NumberMustBeCharacterLength.PrepareRedisMessage(messageParameters: new object[] { "10", "500" })).When(x => x.OrganisationStatusInfo == OrganisationStatusInfo.Cancel || x.OrganisationStatusInfo == OrganisationStatusInfo.Suspend);
        }
    }
}
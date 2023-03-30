using System;
using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.ValidationRules
{

    public class CreateOrganisationValidator : AbstractValidator<CreateOrganisationCommand>
    {
        public CreateOrganisationValidator()
        {
            RuleFor(x => x.Organisation.Name).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.CustomerNumber).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.CustomerManager).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.OrganisationManager).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.OrganisationTypeId).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.OrganisationAddress).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.SegmentType).NotEmpty().IsInEnum().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.CityId).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ContactName).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ContactMail).NotEmpty().EmailAddress().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ContactPhone).NotEmpty().MaximumLength(20).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ContractStartDate).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.").GreaterThan(DateTime.Now).WithMessage("Girilen tarihleri kontrol ediniz.");
            RuleFor(x => x.Organisation.ContractFinishDate).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.").GreaterThan(x => x.Organisation.ContractStartDate).WithMessage("Girilen tarihleri kontrol ediniz.");
            RuleFor(x => x.Organisation.PackageKind).NotEmpty().IsInEnum().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.PackageId).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.PackageName).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.LicenceNumber).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.DomainName).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.MembershipStartDate).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.").GreaterThan(DateTime.Now).WithMessage("Girilen tarihleri kontrol ediniz.");
            RuleFor(x => x.Organisation.MembershipFinishDate).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.").GreaterThan(x => x.Organisation.MembershipStartDate).WithMessage("Girilen tarihleri kontrol ediniz.");
            RuleFor(x => x.Organisation.AdminName).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.AdminSurname).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.AdminTc).NotEmpty().Length(11).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.AdminMail).NotEmpty().EmailAddress().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.AdminPhone).NotEmpty().MaximumLength(20).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ServiceInfoChoice).NotEmpty().IsInEnum().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ContractNumber).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.HostName).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ApiKey).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ApiSecret).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.VirtualTrainingRoomQuota).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.VirtualMeetingRoomQuota).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.OrganisationStatusInfo).NotEmpty().IsInEnum().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ReasonForStatus).Must(x => x.TrimStart() != "" && x.TrimEnd() != "").WithMessage("Lütfen zorunlu alanlarý doldurunuz.").NotEmpty().Length(10, 500).WithMessage("Lütfen zorunlu alanlarý doldurunuz.").When(x => x.Organisation.OrganisationStatusInfo == Entities.Enums.OrganisationStatusInfo.Cancel || x.Organisation.OrganisationStatusInfo == Entities.Enums.OrganisationStatusInfo.Suspend);
        }
    }
    public class UpdateOrganisationValidator : AbstractValidator<UpdateOrganisationCommand>
    {
        public UpdateOrganisationValidator()
        {
            RuleFor(x => x.Organisation.Id).NotEmpty();
            RuleFor(x => x.Organisation.Name).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.CustomerNumber).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.CustomerManager).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.OrganisationManager).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.OrganisationTypeId).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.OrganisationAddress).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.SegmentType).NotEmpty().IsInEnum().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.CityId).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ContactName).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ContactMail).NotEmpty().EmailAddress().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ContactPhone).NotEmpty().MaximumLength(20).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ContractStartDate).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.").GreaterThan(DateTime.Now).WithMessage("Girilen tarihleri kontrol ediniz.");
            RuleFor(x => x.Organisation.ContractFinishDate).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.").GreaterThan(x => x.Organisation.ContractStartDate).WithMessage("Girilen tarihleri kontrol ediniz.");
            RuleFor(x => x.Organisation.PackageKind).NotEmpty().IsInEnum().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.PackageId).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.PackageName).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.LicenceNumber).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.DomainName).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.MembershipStartDate).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.").GreaterThan(DateTime.Now).WithMessage("Girilen tarihleri kontrol ediniz.");
            RuleFor(x => x.Organisation.MembershipFinishDate).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.").GreaterThan(x => x.Organisation.MembershipStartDate).WithMessage("Girilen tarihleri kontrol ediniz.");
            RuleFor(x => x.Organisation.AdminName).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.AdminSurname).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.AdminTc).NotEmpty().Length(11).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.AdminMail).NotEmpty().EmailAddress().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.AdminPhone).NotEmpty().MaximumLength(20).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ServiceInfoChoice).NotEmpty().IsInEnum().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ContractNumber).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.HostName).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ApiKey).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ApiSecret).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.VirtualTrainingRoomQuota).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.VirtualMeetingRoomQuota).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.OrganisationStatusInfo).NotEmpty().IsInEnum().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Organisation.ReasonForStatus).Must(x => x.TrimStart() != "" && x.TrimEnd() != "").WithMessage("Lütfen zorunlu alanlarý doldurunuz.").NotEmpty().Length(10, 500).WithMessage("Lütfen zorunlu alanlarý doldurunuz.").When(x => x.Organisation.OrganisationStatusInfo == Entities.Enums.OrganisationStatusInfo.Cancel || x.Organisation.OrganisationStatusInfo == Entities.Enums.OrganisationStatusInfo.Suspend);
        }
    }
    public class UpdateOrganisationStatusValidator : AbstractValidator<UpdateOrganisationStatusCommand>
    {
        public UpdateOrganisationStatusValidator()
        {
            RuleFor(x => x.OrganisationStatusInfo).NotEmpty().IsInEnum().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.ReasonForStatus).Must(x => x.TrimStart() != "" && x.TrimEnd() != "").WithMessage("Lütfen zorunlu alanlarý doldurunuz.").NotEmpty().Length(10, 500).WithMessage("Lütfen zorunlu alanlarý doldurunuz.").When(x => x.OrganisationStatusInfo == Entities.Enums.OrganisationStatusInfo.Cancel || x.OrganisationStatusInfo == Entities.Enums.OrganisationStatusInfo.Suspend);
        }
    }
}
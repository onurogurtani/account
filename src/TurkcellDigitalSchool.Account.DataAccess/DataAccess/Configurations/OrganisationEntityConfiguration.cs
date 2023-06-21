using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class OrganisationEntityConfiguration : EntityDefinitionConfigurationBase<Organisation>
    {
        public override void Configure(EntityTypeBuilder<Organisation> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.CrmId);
            builder.Property(x => x.Name).HasMaxLength(100);
            builder.Property(x => x.OrganisationManager).HasMaxLength(100);
            builder.Property(x => x.CustomerNumber).HasMaxLength(100);
            builder.Property(x => x.CustomerManager).HasMaxLength(100);
            builder.Property(x => x.OrganisationTypeId);
            builder.Property(x => x.OrganisationAddress).HasMaxLength(100);
            builder.Property(x => x.SegmentType);
            builder.Property(x => x.CityId);
            builder.Property(x => x.CountyId);
            builder.Property(x => x.ContactName).HasMaxLength(100);
            builder.Property(x => x.ContactMail).HasMaxLength(100);
            builder.Property(x => x.ContactPhone).HasMaxLength(20);
            builder.Property(x => x.ContractStartDate);
            builder.Property(x => x.ContractFinishDate);
            builder.Property(x => x.PackageKind);
            builder.Property(x => x.PackageId);
            builder.Property(x => x.PackageName).HasMaxLength(100);
            builder.Property(x => x.LicenceNumber);
            builder.Property(x => x.DomainName).HasMaxLength(100);
            builder.Property(x => x.MembershipStartDate);
            builder.Property(x => x.MembershipFinishDate);
            builder.Property(x => x.AdminName).HasMaxLength(100);
            builder.Property(x => x.AdminSurname).HasMaxLength(100);
            builder.Property(x => x.AdminTc).HasMaxLength(11);
            builder.Property(x => x.AdminMail).HasMaxLength(100);
            builder.Property(x => x.AdminPhone).HasMaxLength(20);
            builder.Property(x => x.ContractNumber).HasMaxLength(100);
            builder.Property(x => x.HostName).HasMaxLength(100);
            builder.Property(x => x.ApiKey).HasMaxLength(100);
            builder.Property(x => x.ApiSecret).HasMaxLength(100);
            builder.Property(x => x.VirtualTrainingRoomQuota);
            builder.Property(x => x.VirtualMeetingRoomQuota);
            builder.Property(x => x.ServiceInfoChoice);
            builder.Property(x => x.OrganisationStatusInfo);
            builder.Property(x => x.ReasonForStatus).HasMaxLength(500);
        }
    }
}

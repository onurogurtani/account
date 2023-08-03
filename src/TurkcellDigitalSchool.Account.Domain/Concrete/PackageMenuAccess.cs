using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackageMenuAccess : EntityDefault 
    {
        public long PackageId { get; set; }
        public string Claim { get; set; } 
    }
}

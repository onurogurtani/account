using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly
{
    public class BranchMainField : EntityDefault , IReadOnlyEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public long? OrganisationId { get; set; }
        public Organisation Organisation { get; set; }
    }
}

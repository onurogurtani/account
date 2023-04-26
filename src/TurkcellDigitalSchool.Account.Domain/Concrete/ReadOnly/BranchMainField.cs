using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly
{
    public class BranchMainField : IReadOnlyEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public long? OrganisationId { get; set; }
        public Organisation Organisation { get; set; }
        public long Id { get; set; }
        public bool IsDeleted { get; set; }
    }
}

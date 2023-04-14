using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class RoleClaim : EntityDefault
    {
        public long RoleId { get; set; }
        public string ClaimName { get; set; }
    }
}
using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class RoleClaim : EntityDefault
    {
        public long RoleId { get; set; }
        public string ClaimName { get; set; }
    }
}
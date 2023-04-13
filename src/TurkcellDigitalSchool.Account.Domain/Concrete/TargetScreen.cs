using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class TargetScreen : EntityDefault
    {
        public string Name { get; set; }
        public string PageName { get; set; }
        public bool IsActive { get; set; }

    }
}

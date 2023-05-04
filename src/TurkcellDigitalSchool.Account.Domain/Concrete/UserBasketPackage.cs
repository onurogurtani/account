using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class UserBasketPackage : EntityDefault
    {
        public long UserId { get; set; }

        public long PackageId { get; set; }

        public virtual User User { get; set; }
        public virtual Package Package { get; set; }
        public int Quantity { get; set; }

    }
}
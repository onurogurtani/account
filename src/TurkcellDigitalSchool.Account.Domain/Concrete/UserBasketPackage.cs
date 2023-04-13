﻿using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
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
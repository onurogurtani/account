using System;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class UserBasketPackageDto
    {
        public long Id { get; set; }
        public long UserId { get; set; }

        public long PackageId { get; set; }

        public string PackageName { get; set; }

        public int Quantity { get; set; }
        public DateTime CreateDate { get; set; }

        public decimal PackagePrice { get; set; }

        public decimal MonthlyInstallmentPrice { get; set; }

        public decimal MaxInstallmentsCount { get; set; }


    }
}
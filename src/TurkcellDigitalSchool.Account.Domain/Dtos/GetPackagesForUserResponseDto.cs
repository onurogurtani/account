using System.Collections.Generic;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class GetPackagesForUserResponseDto
    {
        public long Id { get; set; }
        public ImageFileDto Image { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public string Summary { get; set; }
        public bool IsCampaign { get; set; }

        public decimal Price { get; set; }
        public string Currency { get; set; }
        public decimal MaxInstallmentsCount { get; set; }
        public decimal MonthlyInstallmentPrice { get; set; }

        public List<string> Lessons { get; set; } //Son duruma göre düzenlenecek

    }
}
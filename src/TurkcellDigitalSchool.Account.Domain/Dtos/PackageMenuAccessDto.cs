using System.Collections.Generic;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class PackageMenuAccessDto
    {
        public string Description { get; set; }
        public string Value { get; set; }
        public bool Seledted { get; set; }
        public List<PackageMenuAccessDto> Items { get; set; } = new();
    }
}

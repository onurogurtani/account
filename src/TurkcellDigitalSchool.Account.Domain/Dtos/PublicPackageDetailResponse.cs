using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class PublicPackageDetailResponse
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Summary { get; set; }
        public string Content { get; set; }
        public List<PublicPackageFileDto> Files { get; set; }

    }

    public class PublicPackageFileDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string FilePath { get; set; }
    } 
}

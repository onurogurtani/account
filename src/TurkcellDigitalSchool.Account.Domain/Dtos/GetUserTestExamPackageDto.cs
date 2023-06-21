using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class GetUserTestExamPackageDto
    {
        public long Id { get; set; }
        public long TestExamId { get; set; }
        public int PackageTypeEnum { get; set; }
    }
}

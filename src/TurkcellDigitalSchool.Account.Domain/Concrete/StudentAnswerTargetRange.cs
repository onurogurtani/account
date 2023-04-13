using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{

    public class StudentAnswerTargetRange : EntityDefault
    {
        public long UserId { get; set; }
        public long PackageId { get; set; }
        public decimal TargetRangeMin { get; set; }
        public decimal TargetRangeMax { get; set; }
        public Package Package { get; set; }
    }
}

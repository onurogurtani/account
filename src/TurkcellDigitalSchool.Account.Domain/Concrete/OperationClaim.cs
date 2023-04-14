using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class OperationClaim : EntityDefault
    {
        public string Name { get; set; }
        public string Alias { get; set; }
        public string Description { get; set; }
        public long? CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int? VouId { get; set; }
        public string VouName { get; set; }
        public int? SegmentId { get; set; }

    }
}

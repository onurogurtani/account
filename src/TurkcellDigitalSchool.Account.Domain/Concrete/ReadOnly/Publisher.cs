using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly
{ 
    public class Publisher :   IReadOnlyEntity
    {
        public RecordStatus RecordStatus { get; set; } = RecordStatus.Active;
        public string Name { get; set; }
        public string Code { get; set; }
        public long Id { get; set; }
        public bool IsDeleted { get; set; }
    } 
}

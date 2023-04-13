using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class AppSetting : EntityDefinition
    {
        public string Value { get; set; }
        public int? CustomerId { get; set; }
        public long? LanguageId { get; set; }
        public int? VouId { get; set; }
    }
}

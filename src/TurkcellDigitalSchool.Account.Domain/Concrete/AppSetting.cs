using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class AppSetting : EntityDefinition , IPublishEntity
    {
        public string Value { get; set; }
        public int? CustomerId { get; set; }
        public long? LanguageId { get; set; }
        public int? VouId { get; set; }
    }
}

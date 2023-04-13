using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class County : EntityDefinition
    {
        public long CityId { get; set; }
        public  City City { get; set; }
    }
}

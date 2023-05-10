using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class County : EntityDefinition, IPublishEntity
    {
        public long CityId { get; set; }
        public  City City { get; set; }
    }
}


using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class School : EntityDefinition, IPublishEntity
    {
        public InstitutionEnum InstitutionId { get; set; }
        public InstitutionTypeEnum InstitutionTypeId { get; set; }
        public long? CityId { get; set; }
        public City City { get; set; }
        public long? CountyId { get; set; }
        public County County { get; set; }
    }
}
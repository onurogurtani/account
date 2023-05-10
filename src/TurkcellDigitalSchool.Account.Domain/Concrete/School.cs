using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class School : EntityDefinition, IPublishEntity
    {
        public long? InstitutionId { get; set; }
        public Institution Institution { get; set; }
        public long? InstitutionTypeId { get; set; }
        public InstitutionType InstitutionType { get; set; }
        public long? CityId { get; set; }
        public City City { get; set; }
        public long? CountyId { get; set; }
        public County County { get; set; }
    }
}
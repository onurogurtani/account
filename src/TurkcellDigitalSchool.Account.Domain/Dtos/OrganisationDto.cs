using TurkcellDigitalSchool.Account.Domain.Concrete;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class OrganisationDto : Organisation
    {
        public string SegmentName { get; set; }
        public string CityName { get; set; }
        public string CountyName { get; set; }
        public string InsertUserFullName { get; set; }
        public string UpdateUserFullName { get; set; }

    }
}

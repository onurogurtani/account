using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class GetTeacherResponseDto
    {
        public long Id { get; set; }
        public UserType? UserTypeId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public bool Status { get; set; }
        public string CitizenId { get; set; }
        public string MobilePhones { get; set; }

    }
}
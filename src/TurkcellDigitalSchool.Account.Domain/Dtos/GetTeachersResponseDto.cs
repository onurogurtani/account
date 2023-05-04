namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class GetTeachersResponseDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public bool Status { get; set; }
        public string CitizenId { get; set; }
        public string MobilePhones { get; set; }

    }
}
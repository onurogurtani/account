namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class UnverifiedUserDto
    {
        public long Id { get; set; }
        public string VerificationKey { get; set; }
    }
}

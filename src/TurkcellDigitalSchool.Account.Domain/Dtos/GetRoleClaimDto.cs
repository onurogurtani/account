namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class GetRoleClaimDto
    {
        public long Id { get; set; }
        public long RoleId { get; set; }
        public string ClaimName { get; set; }
    }
}

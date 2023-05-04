namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class PasswordRuleAndPeriodDto
    {
        public int? MinCharacter { get; set; }
        public int? MaxCharacter { get; set; }
        public bool? HasUpperChar { get; set; }
        public bool? HasLowerChar { get; set; }
        public bool? HasNumber { get; set; }
        public bool? HasSymbol { get; set; }
        public int? PasswordPeriod { get; set; }
    }
}

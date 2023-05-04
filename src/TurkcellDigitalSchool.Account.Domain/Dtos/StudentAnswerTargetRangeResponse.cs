namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class StudentAnswerTargetRangeResponse
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public decimal TargetRangeMin { get; set; }
        public decimal TargetRangeMax { get; set; }
        public StudentAnswerTargetRangePackageDto Package { get; set; }

    }
}

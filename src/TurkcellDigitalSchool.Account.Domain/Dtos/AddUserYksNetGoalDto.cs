using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class AddUserYksNetGoalDto
    {
        public long UserId { get; set; }
        public ExamKind ExamKind { get; set; }
    }
}

using System;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class UserDto
    {
        public long? Id { get; set; }
        public long? CitizenId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }
        public bool Status { get; set; }
        public bool? ViewMyData { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public ExamKind? ExamKind { get; set; }
        public UserType UserType { get; set; }
        public bool? IsPackageBuyer { get; set; } = false;
        public RegisterStatus RegisterStatus { get; set; }
        public DateTime InsertTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public string BirthPlace { get; set; }
        public DateTime BirthDate { get; set; }
        public string UserName { get; set; }
        public long? ResidenceCityId { get; set; }
        public long? ResidenceCountyId { get; set; }
        public bool ContactBySMS { get; set; }
        public bool ContactByMail { get; set; }
        public bool ContactByCall { get; set; }
        public UserType UserTypeId { get; set; }
        public long? AvatarId { get; set; }
        public bool ShareCalendarWithParent { get; set; }
    }
}
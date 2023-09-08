using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class UserAddNotificationDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string MobilePhones { get; set; }
        public string Email { get; set; }
        public UserType UserType { get; set; }
    }
}
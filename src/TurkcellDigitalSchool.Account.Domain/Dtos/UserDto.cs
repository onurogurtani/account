using System;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class UserDto
    {
        public long Id { get; set; }
        public long CitizenId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }
        public bool Status { get; set; }
        public bool ViewMyData { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public UserType UserType { get; set; }
    }
}

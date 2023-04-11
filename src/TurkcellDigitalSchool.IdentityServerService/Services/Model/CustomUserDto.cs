using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.IdentityServerService.Services.Model
{
    public class CustomUserDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string UserName { get; set; }
        public string TcNo { get; set; }
        public string EMail { get; set; }
        public bool EMailVerify { get; set; }
        public string MobilPhone { get; set; }
        public bool MobilPhoneVerify { get; set; }

        public byte[] PassSalt { get; set; }
        public byte[] PassHash { get; set; }

        public string FullName => Name + " " + Surname;

        public UserType UserType { get; set; }

        public int? FailLoginCount { get; set; }
        public int? FailOtpCount { get; set; }
    }
}

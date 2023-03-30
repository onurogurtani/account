using System;

namespace TurkcellDigitalSchool.Account.Business.Services.Authentication.TurkcellFastLoginService
{
    public class TurkcellFastLoginUserInfoModel
    {
        public string Sub { get; set; }

        public DateTime UpdatedAt { get; set; }

        public string PhoneNumber { get; set; }

        public bool IsPhoneNumberVerified { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }

        public bool IsEmailVerified { get; set; }
    }
}

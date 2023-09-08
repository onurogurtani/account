using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class UsersWaitingVerification : EntityDefault
    {
        public UserType UserTypeId { get; set; }
        public long CitizenId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }
        public DateTime BirthDate { get; set; }
        public string ActivationCode { get; set; }
        public byte[] PasswordSalt { get; set; }
        public byte[] PasswordHash { get; set; }
        public Guid SessionCode { get; set; }
        public int SmsOtpCode { get; set; }
        public int MailOtpCode { get; set; }
        public DateTime ExpiryDate { get; set; }
        public DateTime? ProcessDate { get; set; }
        public bool IsCompleted { get; set; }
    }
}

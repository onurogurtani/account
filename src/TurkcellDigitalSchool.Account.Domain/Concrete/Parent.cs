﻿using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class Parent : EntityDefault
    {
        public long UserId { get; set; }
        public string NameSurname { get; set; }
        public long Tc { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public byte[] PasswordSalt { get; set; }
        public byte[] PasswordHash { get; set; }
        public string ContactOption { get; set; }
        public bool NotificationStatus { get; set; }
        public bool StudentAccessToChat { get; set; }
    }
}
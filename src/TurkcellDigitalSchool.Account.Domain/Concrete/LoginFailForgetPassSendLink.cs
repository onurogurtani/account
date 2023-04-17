using System;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class LoginFailForgetPassSendLink : IEntity
    {
        public long Id { get; set; }
        public string Guid { get; set; }
        public long UserId { get; set; }
        public int CheckCount { get; set; }
        public UsedStatus UsedStatus { get; set; }
        public DateTime ExpDate { get; set; }
        public DateTime InsertTime { get; set; }
        public DateTime? UpdateTime { get; set; }

    }
}

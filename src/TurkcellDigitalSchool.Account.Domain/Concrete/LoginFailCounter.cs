using System;
using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class LoginFailCounter: IEntity 
    {
        public long Id { get; set; } 
        public string CsrfToken { get; set; }
        public int? FailCount { get; set; } 
        public DateTime InsertTime { get; set; }
        public DateTime? UpdateTime { get; set; }


    }
}

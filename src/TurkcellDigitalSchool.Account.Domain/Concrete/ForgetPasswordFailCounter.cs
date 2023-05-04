using System;
using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class ForgetPasswordFailCounter : IEntity 
    {
        public long Id { get; set; } 
        public string CsrfToken { get; set; }
        public int? FailCount { get; set; } 
        public DateTime InsertTime { get; set; }
        public DateTime? UpdateTime { get; set; }


    }
}

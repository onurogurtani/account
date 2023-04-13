using System.Collections.Generic;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly
{
    public class Classroom : EntityDefault , IReadOnlyEntity
    {
        public string Name { get; set; }
        public string Code { get; set; } 
        public bool IsActive { get; set; }  
        public virtual ICollection<Lesson> Lessons { get; set; }  
    }
}

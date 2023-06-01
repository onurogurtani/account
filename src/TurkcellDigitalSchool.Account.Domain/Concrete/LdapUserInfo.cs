using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class LdapUserInfo : EntityDefault, IPublishEntity
    {
        public string UId { get; set; }
        public string Mail { get; set; }
        public string Mobile { get; set; }
        public string FullName { get; set; }
        public string ObjectClass { get; set; }
        public string Group { get; set; }
        public string PositionName { get; set; }
        public string Sn { get; set; }
        public DateTime BirthDate { get; set; }
        public string UnitName { get; set; }
        public string DivisionGroupName { get; set; }
        public string ManagerName { get; set; }
        public bool Status { get; set; }
    }
}

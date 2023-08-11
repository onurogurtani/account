using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Domain.Concrete;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class UserSessionPackageRoleDto
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Year { get; set; }
        public string Month { get; set; }
        public string PackageName { get; set; }
        public string RoleName { get; set; }
        public int LoginCount { get; set; }
        public string LoginTime { get; set; }
    }
}

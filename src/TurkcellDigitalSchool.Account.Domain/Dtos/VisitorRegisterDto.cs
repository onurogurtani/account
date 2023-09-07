using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class VisitorRegisterDto
    {
        public Guid SessionCode { get; set; }
    }

    public class VerifyVisitorRegisterDto
    {
        public long UserId { get; set; }
    }
}

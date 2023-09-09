using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class PublicOtpResponseDto
    {
        public Guid VerificationSessionCode { get; set; }
    }
}

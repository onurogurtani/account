using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TurkcellDigitalSchool.Account.Business.Services.Email
{
    public interface IEmailService
    {
        void ConfirmEmail(string token,string email);
    }
}

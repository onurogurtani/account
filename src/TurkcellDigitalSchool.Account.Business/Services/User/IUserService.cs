using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Entities.Dtos.UserDtos;

namespace TurkcellDigitalSchool.Account.Business.Services.User
{
    public interface IUserService
    {
        PersonalInfoDto GetByUserPersonalInformation(long userId);
        EducationInfoDto GetByUserEducationInformation(long userId);
    }
}

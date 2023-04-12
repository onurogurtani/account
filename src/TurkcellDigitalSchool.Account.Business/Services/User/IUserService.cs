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
        PersonalInformationDto GetByUserPersonalInformation(long userId);
        EducationInformationDto GetByUserEducationInformation(long userId);
    }
}

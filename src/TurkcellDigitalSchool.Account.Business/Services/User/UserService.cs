using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework;
using TurkcellDigitalSchool.Entities.Dtos.UserDtos;

namespace TurkcellDigitalSchool.Account.Business.Services.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public PersonalInformationDto GetByUserPersonalInformation(long userId)
        {
            var getUser = _userRepository.Get(w => w.Id == userId);
            return new PersonalInformationDto
            {
                Name = getUser.Name,
                SurName = getUser.SurName,
                UserName = getUser.Name,
                CitizenId = getUser.CitizenId,
                PlaceOfBirth=getUser.BirthPlace,
                DateOfBirth=getUser.BirthDate,
                Email=getUser.Email,
                MobilePhone=getUser.MobilePhones,

               //Avatar = ,
                //City= getUser.ResidenceCity,
                //County=getUser.ResidenceCounty
            };
        }

        public EducationInformationDto GetByUserEducationInformation(long userId)
        {

        }
    }
}

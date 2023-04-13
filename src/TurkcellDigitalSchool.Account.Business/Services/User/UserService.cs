using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Dtos.UserDtos;

namespace TurkcellDigitalSchool.Account.Business.Services.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IStudentEducationInformationRepository _studentEducationInformationRepository;

        public UserService(IUserRepository userRepository, IStudentEducationInformationRepository studentEducationInformationRepository)
        {
            _userRepository = userRepository;
            _studentEducationInformationRepository = studentEducationInformationRepository;
        }
        public PersonalInfoDto GetByUserPersonalInformation(long userId)
        {
            var getUser = _userRepository.Get(w => w.Id == userId);
            return new PersonalInfoDto
            {
                Name = getUser.Name,
                SurName = getUser.SurName,
                UserName = getUser.Name,
                CitizenId = getUser.CitizenId,
                PlaceOfBirth = getUser.BirthPlace,
                DateOfBirth = getUser.BirthDate,
                Email = getUser.Email,
                MobilePhone = getUser.MobilePhones,

                //Avatar = ,
                //City= getUser.ResidenceCity,
                //County=getUser.ResidenceCounty
            };
        }

        public EducationInfoDto GetByUserEducationInformation(long userId)
        {
            var query = _studentEducationInformationRepository.Query()
                .Include(w => w.City)
                .Include(w => w.County)
                .Include(w => w.Classroom)
                .Include(w => w.School)
                .Include(w => w.User)
                .Where(w => w.UserId == userId)
                .FirstOrDefault();

            if (query == null)
            {

            }



      

        public UserInformationDefinationDto ExamType { get; set; }
        public UserInformationDefinationDto City { get; set; }
        public UserInformationDefinationDto County { get; set; }
        public UserInformationDefinationDto InstitutionType { get; set; }
        public UserInformationDefinationDto School { get; set; }
        public UserInformationDefinationDto Classroom { get; set; }
        public int GraduationYear { get; set; }
        public int DiplomaGrade { get; set; }
        public UserInformationDefinationDto YKSExperienceInformation { get; set; }
        public UserInformationDefinationDto Field { get; set; }
        public UserInformationDefinationDto ScoreType { get; set; }
        public bool ReligionLessonStatus { get; set; }




    }
    }
}

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
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Business.Services.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IStudentEducationInformationRepository _studentEducationInformationRepository;
        private readonly IStudentGuardianInformationRepository _studentGuardianInformationRepository;

        public UserService(IUserRepository userRepository, IStudentEducationInformationRepository studentEducationInformationRepository, IStudentGuardianInformationRepository studentGuardianInformationRepository)
        {
            _userRepository = userRepository;
            _studentEducationInformationRepository = studentEducationInformationRepository;
            _studentGuardianInformationRepository = studentGuardianInformationRepository;
        }
        public PersonalInfoDto GetByStudentPersonalInformation(long userId)
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
        public EducationInfoDto GetByStudentEducationInformation(long userId)
        {
            var getEducation = _studentEducationInformationRepository.Query()
                .Include(w => w.City)
                .Include(w => w.County)
                .Include(w => w.Classroom)
                .Include(w => w.School)
                .Include(w => w.User)
                .Where(w => w.UserId == userId)
                .FirstOrDefault();
            if (getEducation == null)
            {
                return new EducationInfoDto { };
            }
            return new EducationInfoDto
            {
                Id = getEducation.Id,
                ExamType = getEducation.ExamType,
                City = new UserInformationDefinationDto { Id = getEducation.CityId, Name = getEducation.City?.Name, },
                County = new UserInformationDefinationDto { Id = getEducation.County.Id, Name = getEducation.County.Name, },
                SchoolType = getEducation.SchoolType,
                School = new UserInformationDefinationDto { Id = getEducation.School.Id, Name = getEducation.School.Name },
                Classroom = new UserInformationDefinationDto { Id = getEducation.Classroom.Id, Name = getEducation.Classroom?.Name },
                GraduationYear = getEducation.GraduationYear,
                DiplomaGrade = getEducation.DiplomaGrade,
                YKSExperienceInformation = getEducation.YKSStatement,
                FieldType = getEducation.FieldType,
                PointType = getEducation.PointType,
                ReligionLessonStatus = getEducation.ReligionLessonStatus
            };
        }
        public GuardianInfoDto GetByStudentGuardianInfoInformation(long userId)
        {
            var getGuardian = _studentGuardianInformationRepository.Query().FirstOrDefault(w => w.UserId == userId);
            if (getGuardian == null)
            {
                return new GuardianInfoDto { };
            }
            return new GuardianInfoDto
            {
                Id = getGuardian.Id,
                CitizenId = getGuardian.CitizenId,
                Name = getGuardian.Name,
                SurName = getGuardian.SurName,
                Email = getGuardian.Email,
                MobilPhones = getGuardian.MobilPhones
            };
        }
    }
}

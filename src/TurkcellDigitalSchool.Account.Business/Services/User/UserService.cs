using DocumentFormat.OpenXml.Spreadsheet;
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
        private readonly IStudentParentInformationRepository _studentParentInformationRepository;
        private readonly ICityRepository _cityRepository;
        private readonly ICountyRepository _countyRepository;

        public UserService(IUserRepository userRepository, IStudentEducationInformationRepository studentEducationInformationRepository, IStudentParentInformationRepository studentParentInformationRepository, ICityRepository cityRepository, ICountyRepository countyRepository)
        {
            _userRepository = userRepository;
            _studentEducationInformationRepository = studentEducationInformationRepository;
            _studentParentInformationRepository = studentParentInformationRepository;
            _cityRepository = cityRepository;
            _countyRepository = countyRepository;
        }
        public PersonalInfoDto GetByStudentPersonalInformation(long userId)
        {
            //TODO AvatarId CND entegrasyonunda, City ve County tabloları dublice tablo olunca join yapılacak.
            var getUser = _userRepository.Get(w => w.Id == userId);
            if (getUser == null)
            {
                return new PersonalInfoDto();
            }
            var city = _cityRepository.Get(w => w.Id == getUser.ResidenceCityId);
            var county = _countyRepository.Get(w => w.Id == getUser.ResidenceCountyId);
            return new PersonalInfoDto
            {
                Name = getUser.Name,
                SurName = getUser.SurName,
                UserName = getUser.UserName,
                Avatar = getUser.AvatarId,
                CitizenId = getUser.CitizenId,
                PlaceOfBirth = getUser.BirthPlace,
                DateOfBirth = getUser.BirthDate,
                Email = getUser.Email,
                EmailVerify=getUser.EmailVerify,
                City = new UserInformationDefinationDto
                {
                    Name = city.Name,
                    Id = city.Id
                },
                County = new UserInformationDefinationDto
                {
                    Name = county.Name,
                    Id = county.Id
                },
                MobilePhone = getUser.MobilePhones,
                MobilePhoneVerify=getUser.MobilePhonesVerify,
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
        public ParentInfoDto GetByStudentParentInfoInformation(long userId)
        {
            var getParent = _studentParentInformationRepository.Query().FirstOrDefault(w => w.UserId == userId);
            if (getParent == null)
            {
                return new ParentInfoDto { };
            }
            return new ParentInfoDto
            {
                Id = getParent.Id,
                CitizenId = getParent.CitizenId,
                Name = getParent.Name,
                SurName = getParent.SurName,
                Email = getParent.Email,
                MobilPhones = getParent.MobilPhones
            };
        }

        public bool IsExistEmail(long UserId, string Email)
        {
            return _userRepository.Query().Any(w => w.Id != UserId && w.Email == Email);
        }
        public bool IsExistUserName(long UserId, string UserName)
        {
            return _userRepository.Query().Any(w => w.Id != UserId && w.UserName == UserName);
        }

        public Entities.Concrete.Core.User GetUserById(long UserId)
        {
            return _userRepository.Get(w => w.Id == UserId);
        }

       
    }
}

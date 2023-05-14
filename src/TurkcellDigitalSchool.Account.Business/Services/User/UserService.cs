using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Services.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IStudentEducationInformationRepository _studentEducationInformationRepository;
        private readonly IStudentParentInformationRepository _studentParentInformationRepository;
        private readonly IUserPackageRepository _userPackageRepository;
        private readonly ICityRepository _cityRepository;
        private readonly ICountyRepository _countyRepository;
        private readonly IGraduationYearRepository _graduationYearRepository;
        private readonly ISchoolRepository _schoolRepository;
        private readonly IUserContratRepository _userContratRepository;
        private readonly IUserCommunicationPreferencesRepository _userCommunicationPreferencesRepository;
        private readonly IUserSupportTeamViewMyDataRepository _userSupportTeamViewMyDataRepository;

        public UserService(IUserRepository userRepository, IStudentEducationInformationRepository studentEducationInformationRepository, IStudentParentInformationRepository studentParentInformationRepository, ICityRepository cityRepository, ICountyRepository countyRepository, IGraduationYearRepository graduationYearRepository, ISchoolRepository schoolRepository, IUserPackageRepository userPackageRepository, IUserContratRepository userContratRepository, IUserCommunicationPreferencesRepository userCommunicationPreferencesRepository, IUserSupportTeamViewMyDataRepository userSupportTeamViewMyDataRepository)
        {
            _userRepository = userRepository;
            _studentEducationInformationRepository = studentEducationInformationRepository;
            _studentParentInformationRepository = studentParentInformationRepository;
            _cityRepository = cityRepository;
            _countyRepository = countyRepository;
            _graduationYearRepository = graduationYearRepository;
            _schoolRepository = schoolRepository;
            _userPackageRepository = userPackageRepository;
            _userContratRepository = userContratRepository;
            _userCommunicationPreferencesRepository = userCommunicationPreferencesRepository;
            _userSupportTeamViewMyDataRepository = userSupportTeamViewMyDataRepository;
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
                EmailVerify = getUser.EmailVerify,
                City = city != null ?
                new UserInformationDefinationDto
                {
                    Name = city.Name,
                    Id = city.Id
                } : null,
                County = county != null ?
                new UserInformationDefinationDto
                {
                    Name = county.Name,
                    Id = county.Id
                } : null,
                MobilePhone = getUser.MobilePhones,
                MobilePhoneVerify = getUser.MobilePhonesVerify,
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
                .Include(w => w.Institution)
                .Include(w => w.GraduationYear)
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
                City = new UserInformationDefinationDto { Id = getEducation.CityId, Name = getEducation.City?.Name },
                County = new UserInformationDefinationDto { Id = getEducation.County.Id, Name = getEducation.County.Name },
                Institution = new UserInformationDefinationDto { Id = getEducation.Institution.Id, Name = getEducation.Institution.Name },
                School = new UserInformationDefinationDto { Id = getEducation.School.Id, Name = getEducation.School.Name },
                Classroom = getEducation.ExamType == ExamType.LGS ? new UserInformationDefinationDto { Id = getEducation.Classroom.Id, Name = getEducation.Classroom?.Name } : null,
                GraduationYear = getEducation.ExamType == ExamType.LGS ? null : new UserInformationDefinationDto { Id = getEducation.GraduationYear?.Id, Name = getEducation.GraduationYear?.Name },
                DiplomaGrade = getEducation.ExamType == ExamType.LGS ? null : getEducation.DiplomaGrade,
                YKSExperienceInformation = getEducation.ExamType == ExamType.LGS ? null : getEducation.YKSStatement,
                FieldType = getEducation.ExamType == ExamType.LGS ? null : getEducation.FieldType,
                PointType = getEducation.ExamType == ExamType.LGS ? null : getEducation.PointType,
                ReligionLessonStatus = getEducation.ExamType == ExamType.LGS ? null : getEducation.ReligionLessonStatus,
                IsGraduate = getEducation.ExamType == ExamType.LGS ? null : getEducation.IsGraduate
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
        public bool IsExistEmail(long userId, string Email)
        {
            return _userRepository.Query().Any(w => w.Id != userId && w.Email == Email);
        }
        public bool IsExistUserName(long userId, string userName)
        {
            return _userRepository.Query().Any(w => w.Id != userId && w.UserName == userName);
        }
        public Domain.Concrete.User GetUserById(long userId)
        {
            return _userRepository.Get(w => w.Id == userId);
        }
        [MessageConstAttr(MessageCodeType.Error, "İl,İlçe,Okul İl/İlçe/Kurum Türü ile eşleşmiyor,Sınıf,Öğrenim Durumu,YKS Deneyimi,Mezuniyet Yılı,Diploma Notu,Alan,Puan Türü")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;

        [MessageConstAttr(MessageCodeType.Error)]
        private static string CommunicationChannelOneOpen = Constants.Messages.CommunicationChannelOneOpen;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string CommunicationChannelRequiredPhone = Constants.Messages.CommunicationChannelRequiredPhone;

        [MessageConstAttr(MessageCodeType.Error)]
        private static string CommunicationChannelVerifyPhone = Constants.Messages.CommunicationChannelVerifyPhone;

        public string StudentEducationValidationRules(StudentEducationRequestDto studentEducationRequestDto)
        {
            var existCity = IsExistCity(studentEducationRequestDto.CityId);
            if (!existCity)
            {
                return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "İl");
            }

            var existCounty = IsExistCounty(studentEducationRequestDto.CityId, studentEducationRequestDto.CountyId);
            if (!existCounty)
            {
                return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "İlçe");
            }

            var existSchool = _schoolRepository.Query().Any(w => w.CityId == studentEducationRequestDto.CityId && w.CountyId == studentEducationRequestDto.CountyId && w.InstitutionId == studentEducationRequestDto.InstitutionId && w.Id == studentEducationRequestDto.SchoolId);
            if (!existSchool)
            {
                return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "Okul İl/İlçe/Kurum Türü ile eşleşmiyor");
            }

            //TODO Classroom Education mikroservinde. Readonly tablo işlemlri tamamlandığında exist validasyonu yapılacak.
            //var existClassroom = _schoolRepository.Query().Any(w => w.CityId == studentEducationRequestDto.CityId && w.CountyId == studentEducationRequestDto.CountyId && w.InstitutionId == studentEducationRequestDto.InstitutionId && w.Id == studentEducationRequestDto.SchoolId);
            //if (!existClassroom)
            //{
            //    return string.Format(FieldIsNotNullOrEmpty, "Okul İl/İlçe/Kurum Türü ile eşleşmiyor");
            //}



            if (studentEducationRequestDto.ExamType == ExamType.LGS)
            {
                if (studentEducationRequestDto.ClassroomId == 0)
                {
                    return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "Sınıf");
                }
            }
            else
            {
                if (studentEducationRequestDto.IsGraduate == null)
                {
                    return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "Öğrenim Durumu");
                }

                if (studentEducationRequestDto.YKSExperienceInformation == null || !Enum.IsDefined(typeof(YKSStatementEnum), studentEducationRequestDto.YKSExperienceInformation))
                {
                    return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "YKS Deneyimi");
                }

                if (studentEducationRequestDto.GraduationYearId == null || !_graduationYearRepository.Query().Any(w => w.Id == studentEducationRequestDto.GraduationYearId))
                {
                    return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "Mezuniyet Yılı");
                }

                if (studentEducationRequestDto.DiplomaGrade == null)
                {
                    return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "Diploma Notu");
                }

                if (studentEducationRequestDto.FieldType == null || !Enum.IsDefined(typeof(FieldType), studentEducationRequestDto.FieldType))
                {
                    return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "Alan");
                }

                if (studentEducationRequestDto.PointType == null || !Enum.IsDefined(typeof(FieldType), studentEducationRequestDto.PointType))
                {
                    return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "Puan Türü");
                }
            }

            return string.Empty;
        }
        public bool IsExistCity(long cityId)
        {
            return _cityRepository.Query().Any(w => w.Id == cityId);
        }
        public bool IsExistCounty(long cityId, long countyId)
        {
            return _countyRepository.Query().Any(w => w.CityId == cityId && w.Id == countyId);
        }
        public PackageInfoDto GetByStudentPackageInformation(long userId)
        {
            var getPackage = _userPackageRepository.Query()
                .Include(w => w.Package.ImageOfPackages).ThenInclude(w => w.File)
                .FirstOrDefault(w => w.UserId == userId);

            if (getPackage == null)
            {
                return new PackageInfoDto { };
            }
            return new PackageInfoDto
            {
                Id = getPackage.Id,
                File = getPackage.Package.ImageOfPackages.First().File,//TODO file dosya ve base64 işlemleri daha sonra test edilecek.
                PackageName = getPackage.Package.Name,
                PurchaseDate = getPackage.PurchaseDate,
                Package = getPackage.Package
            };
        }
        public SettingsInfoDto GetByStudentSettingsInfoInformation(long userId)
        {
            var getUserContractList = _userContratRepository.Query()
                                   .Include(w => w.Document).ThenInclude(x => x.ContractKind)
                                   .Where(w => w.IsLastVersion && w.UserId == userId).ToList();
            var getUserCommunicationPreferences = _userCommunicationPreferencesRepository.Get(w => w.UserId == userId);


            var getUserSupportTeamViewMyData = _userSupportTeamViewMyDataRepository.Get(w => w.UserId == userId);

            var userContratsList = new List<UserContratDto>();

            foreach (var userContract in getUserContractList)
            {
                userContratsList.Add(new UserContratDto
                {
                    Id = userContract.Id,
                    AcceptedDate = userContract.AcceptedDate,
                    IsAccepted = userContract.IsAccepted,
                    Contracts = new UserInfoDocumentDto
                    {
                        Id = userContract.Document.Id,
                        Content = userContract.Document.Content,
                        Name = userContract.Document.ContractKind.Name
                    }
                });
            }

            return new SettingsInfoDto
            {
                UserCommunicationPreferences = new CommunicationPreferencesDto
                {
                    Id = getUserCommunicationPreferences?.Id,
                    IsCall = getUserCommunicationPreferences?.IsCall,
                    IsEMail = getUserCommunicationPreferences?.IsEMail,
                    IsNotification = getUserCommunicationPreferences?.IsNotification,
                    IsSms = getUserCommunicationPreferences?.IsSms
                },
                UserContrats = userContratsList,
                UserSupportTeamViewMyData = new UserSupportTeamViewMyDataDto
                {
                    Id = getUserSupportTeamViewMyData?.Id,
                    IsViewMyData = getUserSupportTeamViewMyData?.IsViewMyData,
                    IsAlways = getUserSupportTeamViewMyData?.IsAlways,
                    IsFifteenMinutes = getUserSupportTeamViewMyData?.IsFifteenMinutes,
                    IsOneMonth = getUserSupportTeamViewMyData?.IsOneMonth
                }
            };
        }
        public string StudentCommunicationPreferencesValidationRules(StudentCommunicationPreferencesDto studentCommunicationPreferencesDto)
        {
            var getUser = GetUserById(studentCommunicationPreferencesDto.UserId);

            if (!studentCommunicationPreferencesDto.IsCall && !studentCommunicationPreferencesDto.IsSms && !studentCommunicationPreferencesDto.IsEMail && !studentCommunicationPreferencesDto.IsNotification)
            {
                return string.Format(CommunicationChannelOneOpen.PrepareRedisMessage());
            }

            if ((studentCommunicationPreferencesDto.IsCall || studentCommunicationPreferencesDto.IsSms) && string.IsNullOrWhiteSpace(getUser.MobilePhones))
            {
                return string.Format(CommunicationChannelRequiredPhone.PrepareRedisMessage());
            }

            if ((studentCommunicationPreferencesDto.IsCall || studentCommunicationPreferencesDto.IsSms) && !getUser.MobilePhonesVerify)
            {
                return string.Format(CommunicationChannelVerifyPhone.PrepareRedisMessage());
            }
            return string.Empty;
        }
        public async Task SetDefaultSettingValues(long UserId)
        {
            var existUserCommunicationPreferences = _userCommunicationPreferencesRepository.Get(w => w.UserId == UserId);
            if (existUserCommunicationPreferences == null)
            {
                var newRecord = new UserCommunicationPreferences
                {
                    UserId = UserId,
                    IsEMail = true,
                    IsCall = true,
                };
                await _userCommunicationPreferencesRepository.CreateAndSaveAsync(newRecord);
            }

            var existUserSupportTeamViewMyData = _userSupportTeamViewMyDataRepository.Get(w => w.UserId == UserId);
            if (existUserSupportTeamViewMyData == null)
            {
                var newRecord = new UserSupportTeamViewMyData
                {
                    UserId = UserId,
                    IsViewMyData = false
                };
                await _userSupportTeamViewMyDataRepository.CreateAndSaveAsync(newRecord);
            }
        }

        public PackageInfoDto GetUserPackageList(long userId)
        {
            var getPackage = _userPackageRepository.Query()
                .Include(w => w.Package.ImageOfPackages).ThenInclude(w => w.File)
                .FirstOrDefault(w => w.UserId == userId);

            if (getPackage == null)
            {
                return new PackageInfoDto { };
            }
            return new PackageInfoDto
            {
                Id = getPackage.Id,
                File = getPackage.Package.ImageOfPackages.First().File,//TODO file dosya ve base64 işlemleri daha sonra test edilecek.
                PackageName = getPackage.Package.Name,
                PurchaseDate = getPackage.PurchaseDate,
                Package = getPackage.Package
            };
        }
    }
}

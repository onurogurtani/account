using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Account.Domain.Enums.Institution;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.File;

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
        private readonly ISchoolRepository _schoolRepository;
        private readonly IUserContratRepository _userContratRepository;
        private readonly IUserCommunicationPreferencesRepository _userCommunicationPreferencesRepository;
        private readonly IUserSupportTeamViewMyDataRepository _userSupportTeamViewMyDataRepository;
        private readonly IFileService _fileService;
        private readonly IClassroomRepository _classroomRepository;
        public UserService(IUserRepository userRepository, IStudentEducationInformationRepository studentEducationInformationRepository, IStudentParentInformationRepository studentParentInformationRepository, ICityRepository cityRepository, ICountyRepository countyRepository, ISchoolRepository schoolRepository, IUserPackageRepository userPackageRepository, IUserContratRepository userContratRepository, IUserCommunicationPreferencesRepository userCommunicationPreferencesRepository, IUserSupportTeamViewMyDataRepository userSupportTeamViewMyDataRepository, IFileService fileService, IClassroomRepository classroomRepository)
        {
            _userRepository = userRepository;
            _studentEducationInformationRepository = studentEducationInformationRepository;
            _studentParentInformationRepository = studentParentInformationRepository;
            _cityRepository = cityRepository;
            _countyRepository = countyRepository;
            _schoolRepository = schoolRepository;
            _userPackageRepository = userPackageRepository;
            _userContratRepository = userContratRepository;
            _userCommunicationPreferencesRepository = userCommunicationPreferencesRepository;
            _userSupportTeamViewMyDataRepository = userSupportTeamViewMyDataRepository;
            _fileService = fileService;
            _classroomRepository = classroomRepository;
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
                City = getEducation.City != null ? new UserInformationDefinationDto { Id = getEducation.CityId, Name = getEducation.City?.Name } : null,
                County = getEducation.County != null ? new UserInformationDefinationDto { Id = getEducation.County.Id, Name = getEducation.County.Name } : null,
                Institution = new UserInformationDefinationDto { Id = getEducation.Institution.Id, Name = getEducation.Institution.Name },
                School = new UserInformationDefinationDto { Id = getEducation.School.Id, Name = getEducation.School.Name },
                Classroom = getEducation.Classroom != null ? new UserInformationDefinationDto { Id = getEducation.Classroom.Id, Name = getEducation.Classroom?.Name } : null,
                GraduationYear = getEducation.ExamType == ExamType.LGS ? null : getEducation.GraduationYear,
                DiplomaGrade = getEducation.ExamType == ExamType.LGS ? null : getEducation.DiplomaGrade,
                YKSExperienceInformation = getEducation.ExamType == ExamType.LGS ? null : getEducation.YKSStatement,
                FieldType = getEducation.ExamType == ExamType.LGS ? null : getEducation.FieldType,
                PointType = getEducation.ExamType == ExamType.LGS ? null : getEducation.PointType,
                ReligionLessonStatus = getEducation.ExamType == ExamType.LGS ? null : getEducation.ReligionLessonStatus,
                IsGraduate = getEducation.ExamType == ExamType.LGS ? null : getEducation.IsGraduate
            };
        }
        public List<ParentInfoDto> GetByStudentParentInfoInformation(long userId)
        {
            return _studentParentInformationRepository.Query()
                .Include(w => w.Parent)
                .Where(w => w.UserId == userId)
                .Select(parent => new ParentInfoDto
                {
                    Id = parent.Id,
                    ParentId = parent.Parent.Id,
                    CitizenId = parent.Parent.CitizenId,
                    Name = parent.Parent.Name,
                    SurName = parent.Parent.SurName,
                    Email = parent.Parent.Email,
                    MobilPhones = parent.Parent.MobilePhones
                })
                .ToList();

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

        [MessageConstAttr(MessageCodeType.Error, "İl,İlçe,Okul Kurum Türü ile eşleşmiyor,Okul İl/İlçe/Kurum Türü ile eşleşmiyor,Sınıf Bulunamadı,Sınıf,Öğrenim Durumu,YKS Deneyimi,Mezuniyet Yılı,Diploma Notu,Alan,Puan Türü")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;

        [MessageConstAttr(MessageCodeType.Error)]
        private static string CommunicationChannelOneOpen = Constants.Messages.CommunicationChannelOneOpen;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string CommunicationChannelRequiredPhone = Constants.Messages.CommunicationChannelRequiredPhone;

        [MessageConstAttr(MessageCodeType.Error)]
        private static string CommunicationChannelVerifyPhone = Constants.Messages.CommunicationChannelVerifyPhone;

        public string StudentEducationValidationRules(StudentEducationRequestDto studentEducationRequestDto)
        {
            if (studentEducationRequestDto.InstitutionId != (int)InstitutionEnum.AcikOgretimKurumlari)
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
            }
            var existSchool = _schoolRepository.Query().Where(w => w.InstitutionId == studentEducationRequestDto.InstitutionId && w.Id == studentEducationRequestDto.SchoolId).AsQueryable();

            if (studentEducationRequestDto.InstitutionId == (int)InstitutionEnum.AcikOgretimKurumlari)
            {
                if (!existSchool.Any())
                {
                    return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "Okul Kurum Türü ile eşleşmiyor");
                }
            }
            else
            {
                if (!existSchool.Where(w => w.CityId == studentEducationRequestDto.CityId && w.CountyId == studentEducationRequestDto.CountyId).Any())
                {
                    return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "Okul İl/İlçe/Kurum Türü ile eşleşmiyor");
                }
            }

            Classroom classroom = null;

            if (studentEducationRequestDto.ClassroomId != null && studentEducationRequestDto.ClassroomId != 0)
            {
                classroom = _classroomRepository.Query().FirstOrDefault(w => w.Id == studentEducationRequestDto.ClassroomId);
                if (classroom == null)
                {
                    return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "Sınıf Bulunamadı");
                }
            }


            if (studentEducationRequestDto.ExamType == ExamType.LGS)
            {
                if (studentEducationRequestDto.ClassroomId == null || studentEducationRequestDto.ClassroomId == 0)
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

                if (studentEducationRequestDto.IsGraduate == false && (studentEducationRequestDto.ClassroomId == 0))
                {
                    return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "Sınıf");
                }

                if (studentEducationRequestDto.YKSExperienceInformation == null || !Enum.IsDefined(typeof(YKSStatementEnum), studentEducationRequestDto.YKSExperienceInformation))
                {
                    return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "YKS Deneyimi");
                }

                if (studentEducationRequestDto.IsGraduate == true)
                {
                    if (studentEducationRequestDto.GraduationYear == null || studentEducationRequestDto.GraduationYear == 0)
                    {
                        return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "Mezuniyet Yılı");
                    }

                    if (studentEducationRequestDto.DiplomaGrade == null || studentEducationRequestDto.DiplomaGrade == 0)
                    {
                        return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "Diploma Notu");
                    }
                }

                //sınıf 9 ise=> alan ve puan türü zorunlu değil.
                if (classroom == null || !classroom.Name.Contains("9"))
                {
                    if (studentEducationRequestDto.FieldType == null || !Enum.IsDefined(typeof(FieldType), studentEducationRequestDto.FieldType))
                    {
                        return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "Alan");
                    }

                    if (studentEducationRequestDto.PointType == null || !Enum.IsDefined(typeof(FieldType), studentEducationRequestDto.PointType))
                    {
                        return string.Format(FieldIsNotNullOrEmpty.PrepareRedisMessage(), "Puan Türü");
                    }
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
        public List<PackageInfoDto> GetByStudentPackageInformation(long userId)
        {
            var getPackageList = _userPackageRepository.Query()
                .Include(w => w.Package.ImageOfPackages).ThenInclude(w => w.File)
                .Where(w => w.UserId == userId).ToList();

            if (getPackageList.Count() == 0)
            {
                return new List<PackageInfoDto> { };
            }

            var resultPackageList = new List<PackageInfoDto>();

            foreach (var package in getPackageList)
            {
                resultPackageList.Add(new PackageInfoDto
                {
                    Id = package.Id,
                    File = package.Package.ImageOfPackages.First().File,//TODO file dosya ve base64 işlemleri daha sonra test edilecek.
                    PackageName = package.Package.Name,
                    PurchaseDate = package.PurchaseDate,
                    PackageContent = package.Package.Content,
                    FileBase64 = _fileService.GetFile(package.Package.ImageOfPackages.First().File.FilePath).GetAwaiter().GetResult().Data
                });
            }

            return resultPackageList;

        }
        public List<PackageInfoDto> GetByParentPackageInformation(long userId)
        {
            var getPackageList = _userPackageRepository.Query()
                .Include(w => w.Package.ImageOfPackages).ThenInclude(w => w.File)
                .Where(w => w.UserId == userId).ToList();

            if (getPackageList.Count() == 0)
            {
                return new List<PackageInfoDto> { };
            }

            var resultPackageList = new List<PackageInfoDto>();

            foreach (var package in getPackageList)
            {
                resultPackageList.Add(new PackageInfoDto
                {
                    Id = package.Id,
                    File = package.Package.ImageOfPackages.First().File,//TODO file dosya ve base64 işlemleri daha sonra test edilecek.
                    PackageName = package.Package.Name,
                    PurchaseDate = package.PurchaseDate,
                    PackageContent = package.Package.Content,
                    FileBase64 = _fileService.GetFile(package.Package.ImageOfPackages.First().File.FilePath).GetAwaiter().GetResult().Data
                });
            }

            return resultPackageList;

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
                        Name = userContract.Document.ContractKind.Name,
                        RequiredApproval = userContract.Document.RequiredApproval
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
        public List<ParentInfoDto> GetStudentsByParentCitizenId(long? citizenId)
        {
            var getParents = _studentParentInformationRepository.Query().Include(w => w.Parent)
                .Where(w => w.Parent.CitizenId == citizenId)
                .Select(s => new ParentInfoDto
                {
                    Id = s.Id,
                    CitizenId = s.Parent.CitizenId,
                    Name = s.Parent.Name,
                    SurName = s.Parent.SurName,
                    Email = s.Parent.Email,
                    MobilPhones = s.Parent.MobilePhones
                })
                .ToList();
            return getParents;
        }
        public List<ParentInfoDto> GetByStudentParentsInformation(long userId)
        {
            var getParents = _studentParentInformationRepository.Query().Include(w => w.Parent).Where(w => w.UserId == userId)
                .Select(s => new ParentInfoDto
                {
                    Id = s.Id,
                    CitizenId = s.Parent.CitizenId,
                    Name = s.Parent.Name,
                    SurName = s.Parent.SurName,
                    Email = s.Parent.Email,
                    MobilPhones = s.Parent.MobilePhones
                })
                .ToList();
            return getParents;
        }

        public List<ParentInfoDto> GetStudentsByParentId(long? parentId)
        {
            var getParents = _studentParentInformationRepository.Query()
                .Include(x => x.User)
                .Where(w => w.ParentId == parentId)
                .Select(s => new ParentInfoDto
                {
                    Id = s.UserId,
                    CitizenId = s.User.CitizenId,
                    Name = s.User.Name,
                    SurName = s.User.SurName,
                    Email = s.User.Email,
                    MobilPhones = s.User.MobilePhones
                })
                .ToList();
            return getParents;
        }

    }


}

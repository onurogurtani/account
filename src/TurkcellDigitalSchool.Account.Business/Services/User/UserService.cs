using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Queries;
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries;

namespace TurkcellDigitalSchool.Account.Business.Services.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IStudentParentInformationRepository _studentParentInformationRepository;
        private readonly IUserPackageRepository _userPackageRepository;
        private readonly ICityRepository _cityRepository;
        private readonly ICountyRepository _countyRepository;
        private readonly IUserContratRepository _userContratRepository;
        private readonly IUserCommunicationPreferencesRepository _userCommunicationPreferencesRepository;
        private readonly IUserSupportTeamViewMyDataRepository _userSupportTeamViewMyDataRepository;
        private readonly IFileRepository _fileRepository;
        private readonly IClassroomRepository _classroomRepository;
        private readonly ITokenHelper _tokenHelper;
        private readonly IMediator _mediator;
        private readonly IPackageRepository _packageRepository;

        public UserService(IUserRepository userRepository, IStudentParentInformationRepository studentParentInformationRepository, ICityRepository cityRepository,
            ICountyRepository countyRepository, ISchoolRepository schoolRepository,
            IUserPackageRepository userPackageRepository,
            IUserContratRepository userContratRepository,
            IUserCommunicationPreferencesRepository userCommunicationPreferencesRepository,
            IUserSupportTeamViewMyDataRepository userSupportTeamViewMyDataRepository, IFileRepository fileRepository,
            IClassroomRepository classroomRepository, ITokenHelper tokenHelper, IMediator mediator,
            IPackageRepository packageRepository)
        {
            _userRepository = userRepository;
            _studentParentInformationRepository = studentParentInformationRepository;
            _cityRepository = cityRepository;
            _countyRepository = countyRepository;
            _userPackageRepository = userPackageRepository;
            _userContratRepository = userContratRepository;
            _userCommunicationPreferencesRepository = userCommunicationPreferencesRepository;
            _userSupportTeamViewMyDataRepository = userSupportTeamViewMyDataRepository;
            _fileRepository = fileRepository;
            _classroomRepository = classroomRepository;
            _tokenHelper = tokenHelper;
            _mediator = mediator;
            _packageRepository = packageRepository;
        }
        public PersonalInfoDto GetByPersonalInformation(long userId)
        {
            var getUser = _userRepository.Get(w => w.Id == userId);
            if (getUser == null)
            {
                return new PersonalInfoDto();
            }
            var city = _cityRepository.Get(w => w.Id == getUser.ResidenceCityId);
            var county = _countyRepository.Get(w => w.Id == getUser.ResidenceCountyId);

            var getFile = _fileRepository.Get(w => w.Id == getUser.AvatarId);

            return new PersonalInfoDto
            {
                Name = getUser.Name,
                SurName = getUser.SurName,
                UserName = getUser.UserName,
                Avatar = getFile != null ?
                new FileDto
                {
                    FilePath = getFile.FilePath,
                    Id = getFile.Id,
                    FileName = getFile.FileName,
                    ContentType = getFile.ContentType,
                    Description = getFile.Description,
                } : null,
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
                    MobilPhones = parent.Parent.MobilePhones,
                    StudentAccessToChat = parent.StudentAccessToChat
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

        [MessageConstAttr(MessageCodeType.Error, "Avatar,Kullanıcı")]
        private static string RecordDoesNotExist = Messages.RecordDoesNotExist;

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
            return _userPackageRepository.Query()
                .Include(w => w.Package.ImageOfPackages).ThenInclude(w => w.File)
                .Where(w => w.UserId == userId)
                .Select(s => new PackageInfoDto
                {
                    Id = s.Package.Id,
                    File = s.Package.ImageOfPackages.First().File,
                    PackageName = s.Package.Name,
                    PurchaseDate = s.PurchaseDate,
                    PackageContent = s.Package.Content,
                })
                .ToList();
        }

        public async Task<SettingsInfoDto> GetByUserSettingsInfoInformation(long userId)
        {
            var getUserContractList = _userContratRepository.Query()
                                   .Include(w => w.Document).ThenInclude(x => x.ContractKind)
                                   .Where(w => w.IsLastVersion && w.UserId == userId).ToList();
            var getUserCommunicationPreferences = _userCommunicationPreferencesRepository.Get(w => w.UserId == userId);

            var beforeMonth = DateTime.Now.AddMonths(-1);
            var before15Min = DateTime.Now.AddMinutes(-15);

            var getUserSupportTeamViewMyDataAsync = _userSupportTeamViewMyDataRepository.Query()
                .Where(w => w.UserId == userId)
                .Select(s => new UserSupportTeamViewMyDataDto
                {
                    Id = s.Id,
                    IsOneMonth = s.IsOneMonth,
                    IsAlways = s.IsAlways,
                    IsViewMyData = ((s.IsAlways ?? false) ||
                                    ((s.IsOneMonth ?? false) &&
                                     (s.UpdateTime ?? s.InsertTime) >=
                                     beforeMonth) ||
                                    ((s.IsFifteenMinutes ?? false) &&
                                     (s.UpdateTime ?? s.InsertTime) >= before15Min)
                        ),
                    IsFifteenMinutes = s.IsFifteenMinutes,
                }).FirstOrDefaultAsync();

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
                UserSupportTeamViewMyData = await getUserSupportTeamViewMyDataAsync
            };
        }
        public string StudentCommunicationPreferencesValidationRules(StudentCommunicationPreferencesDto studentCommunicationPreferencesDto)
        {
            var userId = _tokenHelper.GetUserIdByCurrentToken();
            var getUser = GetUserById(userId);

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
            var user = GetUserById(UserId);
            var existUserCommunicationPreferences = _userCommunicationPreferencesRepository.Get(w => w.UserId == UserId);
            if (existUserCommunicationPreferences == null)
            {
                var newRecord = new UserCommunicationPreferences
                {
                    UserId = UserId,
                    IsEMail = user.MobilePhonesVerify == true ? true : false,
                    IsCall = user.MobilePhonesVerify == true ? true : false,
                };
                await _userCommunicationPreferencesRepository.CreateAndSaveAsync(newRecord);
            }

            var existUserSupportTeamViewMyData = _userSupportTeamViewMyDataRepository.
                Get(w => w.UserId == UserId);

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
                    Id = s.Parent.Id,
                    CitizenId = s.Parent.CitizenId,
                    Name = s.Parent.Name,
                    SurName = s.Parent.SurName,
                    Email = s.Parent.Email,
                    MobilPhones = s.Parent.MobilePhones,
                    StudentAccessToChat = s.StudentAccessToChat
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

            foreach (var item in getParents)
            {
                var userPackageInformaiton = _mediator.Send(new GetPackageInformationForUserQuery
                {
                    UserId = item.Id
                }).Result;
                item.PackageStatus = userPackageInformaiton;
            };
            return getParents;
        }

        public List<ParentInfoDto> GetParentInformation(long userId)
        {
            var getParents = _studentParentInformationRepository.Query()
                .Include(x => x.Parent)
                .Where(w => w.ParentId == userId)
                .Select(s => new ParentInfoDto
                {
                    Id = s.Parent.Id,
                    CitizenId = s.Parent.CitizenId,
                    Name = s.Parent.Name,
                    SurName = s.Parent.SurName,
                    Email = s.Parent.Email,
                    MobilPhones = s.Parent.MobilePhones,
                    StudentAccessToChat = s.StudentAccessToChat
                })
                .Distinct()
                .ToList();
            return getParents;
        }

        public async Task<IResult> UpdateAvatarAsync(long userId, long avatarId)
        {

            var existAvatarFile = _fileRepository.Query().Any(w => w.Id == avatarId && w.FileType == FileType.Avatar);
            if (!existAvatarFile)
            {
                return new ErrorResult { Success = false, Message = string.Format(RecordDoesNotExist.PrepareRedisMessage(), "Avatar") };
            }
            var getUser = _userRepository.Get(w => w.Id == userId);
            if (getUser == null)
            {
                return new ErrorResult { Success = false, Message = string.Format(RecordDoesNotExist.PrepareRedisMessage(), "Kullanıcı") };
            }

            getUser.AvatarId = avatarId;
            await _userRepository.UpdateAndSaveAsync(getUser);
            return new SuccessResult { Success = true, Message = Messages.ConfirmSuccess };
        }
        public List<StudentsOfParentDto> GetStudentsOfParentByParentId(long parentId)
        {
            return _studentParentInformationRepository.Query()
               .Include(w => w.User)
               .Where(w => w.ParentId == parentId)
               .Select(student => new StudentsOfParentDto
               {
                   Id = student.User.Id,
                   CitizenId = student.User.CitizenId,
                   Name = student.User.Name,
                   SurName = student.User.SurName,
                   Email = student.User.Email,
                   MobilePhone = student.User.MobilePhones
               })
               .ToList();
        }
        public List<PackageInfoDto> GetParentPackagesByParentId(long parentId)
        {
            var getStudentsOfParentList = GetStudentsOfParentByParentId(parentId).Select(w => w.Id).ToList();
            return _userPackageRepository.Query()
               .Include(w => w.Package.ImageOfPackages).ThenInclude(w => w.File)
               .Where(w => getStudentsOfParentList.Contains(w.UserId) || w.UserId == parentId)
               .Select(package => new PackageInfoDto
               {
                   Id = package.Id,
                   File = package.Package.ImageOfPackages.First().File,
                   PackageName = package.Package.Name,
                   PurchaseDate = package.PurchaseDate,
                   PackageContent = package.Package.Content,
               }).ToList();
        }
    }
}
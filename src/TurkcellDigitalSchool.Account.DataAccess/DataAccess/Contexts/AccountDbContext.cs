using System.Reflection;
using DotNetCore.CAP;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Core.DataAccess.Contexts;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts
{
    public class AccountDbContext : ProjectDbContext, IMsContext
    {
        public AccountDbContext(ITokenHelper tokenHelper, IConfiguration configuration, ICapPublisher capPublisher) : base(tokenHelper,
            configuration, capPublisher)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.HasDefaultSchema("account");
            var asssebly = Assembly.GetExecutingAssembly();

            modelBuilder.ApplyConfigurationsFromAssembly(asssebly);
        }

        #region Owner Entities

        public DbSet<AppSetting> AppSettings { get; set; }
        public DbSet<City> Citys { get; set; }
        public DbSet<ContractKind> ContractKinds { get; set; }
        public DbSet<ContractType> ContractTypes { get; set; }
        public DbSet<Country> Countrys { get; set; }
        public DbSet<County> Countys { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<DocumentContractType> DocumentContractTypes { get; set; }
        public DbSet<Education> Educations { get; set; }

        public DbSet<ForgetPasswordFailCounter> ForgetPasswordFailCounters { get; set; }
        public DbSet<ImageOfPackage> ImageOfPackages { get; set; }
        public DbSet<Institution> Institutions { get; set; }
        public DbSet<InstitutionType> InstitutionTypes { get; set; }
        public DbSet<LoginFailCounter> LoginFailCounters { get; set; }
        public DbSet<LoginFailForgetPassSendLink> LoginFailForgetPassSendLinks { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<MessageMap> MessageMaps { get; set; }
        public DbSet<MessageType> MessageTypes { get; set; }
        public DbSet<MobileLogin> MobileLogins { get; set; }
        public DbSet<OperationClaim> OperationClaims { get; set; }
        public DbSet<Organisation> Organisations { get; set; }
        public DbSet<OrganisationChangeReqContent> OrganisationChangeReqContents { get; set; }
        public DbSet<OrganisationInfoChangeRequest> OrganisationInfoChangeRequests { get; set; }
        public DbSet<OrganisationType> OrganisationTypes { get; set; }
        public DbSet<OrganisationUser> OrganisationUsers { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<PackageCoachServicePackage> PackageCoachServicePackages { get; set; }
        public DbSet<PackageContractType> PackageContractTypes { get; set; }
        public DbSet<PackageDocument> PackageDocument { get; set; }
        public DbSet<PackageEvent> PackageEvents { get; set; }
        public DbSet<PackageFieldType> PackageFieldType { get; set; }
        public DbSet<PackageLesson> PackageLessons { get; set; }
        public DbSet<PackageMotivationActivityPackage> PackageMotivationActivityPackages { get; set; }
        public DbSet<PackagePackageTypeEnum> PackagePackageTypeEnums { get; set; }
        public DbSet<PackagePublisher> PackagePublishers { get; set; }
        public DbSet<PackageRole> PackageRoles { get; set; }

        public DbSet<PackageTestExam> PackageTestExams { get; set; }

        public DbSet<PackageTestExamPackage> PackageTestExamPackages { get; set; }
        public DbSet<PackageType> PackageTypes { get; set; }
        public DbSet<PackageTypeTargetScreen> PackageTypeTargetScreens { get; set; }
        public DbSet<Parent> Parents { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RoleClaim> RoleClaims { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<StudentAnswerTargetRange> StudentAnswerTargetRanges { get; set; }
        public DbSet<StudentParentInformation> StudentParentInformations { get; set; }

        public DbSet<TargetScreen> TargetScreens { get; set; }
        public DbSet<UnverifiedUser> UnverifiedUsers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserBasketPackage> UserBasketPackages { get; set; }
        public DbSet<UserCommunicationPreferences> UserCommunicationPreferences { get; set; }
        public DbSet<UserContrat> UserContrats { get; set; }
        public DbSet<UserPackage> UserPackages { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<UserSession> UserSessions { get; set; }
        public DbSet<UserSupportTeamViewMyData> UserSupportTeamViewMyData { get; set; }
        public DbSet<OneTimePassword> OneTimePasswords { get; set; }
        public DbSet<LdapUserInfo> LdapUserInfo { get; set; }
        public DbSet<GreetingMessage> GreetingMessages { get; set; }
        public DbSet<StudentCoach> StudentCoaches { get; set; }
        public DbSet<CoachLeaderCoach> CoachLeaderCoaches { get; set; }

        #endregion


        #region Readonly Entities 
        public DbSet<BranchMainField> BranchMainFields { get; set; }
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<EducationYear> EducationYears { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<TestExam> TestExams { get; set; }
        public DbSet<TestExamType> TestExamTypes { get; set; }
        public DbSet<EYDataTransferMap> EYDataTransferMaps { get; set; }

        #endregion
    }
}
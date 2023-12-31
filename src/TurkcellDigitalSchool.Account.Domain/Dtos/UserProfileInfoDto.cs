﻿using System;
using System.Collections.Generic;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class UserProfileInfoDto
    {
        public PersonalInfoDto Personal { get; set; }
        public List<ParentInfoDto> Parents { get; set; }
        public List<PackageInfoDto> Packages { get; set; }
        public SettingsInfoDto Settings { get; set; }


        //TODO koç ve mesajlar daha sonra yapılacaktır.
        //public int Coach { get; set; }
        //public int Messages { get; set; }
    }
    public class PersonalInfoDto
    {
        public string Name { get; set; }
        public string SurName { get; set; }
        public string UserName { get; set; }
        public FileDto Avatar { get; set; }
        public long? CitizenId { get; set; }
        public string PlaceOfBirth { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Email { get; set; }
        public bool? EmailVerify { get; set; }
        public UserInformationDefinationDto City { get; set; }
        public UserInformationDefinationDto County { get; set; }
        public string MobilePhone { get; set; }
        public bool? MobilePhoneVerify { get; set; }
    }
    public class UserInformationDefinationDto
    {
        public long? Id { get; set; }
        public string Name { get; set; }
    }
    public class ParentInfoDto
    {
        public long Id { get; set; }
        public long ParentId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public long? CitizenId { get; set; }
        public string Email { get; set; }
        public string MobilPhones { get; set; }

    }
    public class PackageInfoDto
    {
        public long Id { get; set; }
        public string PackageName { get; set; }
        public File File { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string PackageContent { get; set; }


    }
    public class SettingsInfoDto
    {
        public UserSupportTeamViewMyDataDto UserSupportTeamViewMyData { get; set; }
        public CommunicationPreferencesDto UserCommunicationPreferences { get; set; }
        public List<UserContratDto> UserContrats { get; set; }

    }
    public class UserContratDto
    {
        public long Id { get; set; }
        public UserInfoDocumentDto Contracts { get; set; }
        public bool? IsAccepted { get; set; }
        public DateTime? AcceptedDate { get; set; }
    }
    public class CommunicationPreferencesDto
    {
        public long? Id { get; set; }
        public bool? IsSms { get; set; }
        public bool? IsEMail { get; set; }
        public bool? IsCall { get; set; }
        public bool? IsNotification { get; set; }
    }
    public class UserInfoDocumentDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public bool RequiredApproval { get; set; }
    }
    public class UserSupportTeamViewMyDataDto
    {
        public long? Id { get; set; }
        public bool? IsViewMyData { get; set; }
        public bool? IsFifteenMinutes { get; set; }
        public bool? IsOneMonth { get; set; }
        public bool? IsAlways { get; set; }
    }
    public class StudentsOfParentDto
    {
        public long Id { get; set; }
        public long? CitizenId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhone { get; set; }

    }
    public class ParentPackegesDto
    {
        public long UserPackageId { get; set; }
        public long PackageId { get; set; }
        public string PackageTitle { get; set; }
        public ICollection<ImageOfPackage> PackageImage { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string PackageDetail { get; set; }
    }

}

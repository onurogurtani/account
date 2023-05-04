using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.IoC;  
using static TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries.GetByFilterPagedPackagesQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Packages.Queries
{
    [TestFixture]
    public class GetByFilterPagedPackagesQueryTest
    {
        private GetByFilterPagedPackagesQuery _getByFilterPagedPackagesQuery;
        private GetByFilterPagedPackagesQueryHandler _getByFilterPagedPackagesQueryHandler;

        private Mock<IPackageRepository> _packageRepository;

        Mock<IMapper> _mapper;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;

        [SetUp]
        public void Setup()
        {
            _mediator = new Mock<IMediator>();
            _serviceProvider = new Mock<IServiceProvider>();
            _serviceProvider.Setup(x => x.GetService(typeof(IMediator))).Returns(_mediator.Object);
            ServiceTool.ServiceProvider = _serviceProvider.Object;
            _httpContextAccessor = new Mock<IHttpContextAccessor>();
            _httpContext = new Mock<HttpRequest>();
            _headerDictionary = new Mock<IHeaderDictionary>();
            _headerDictionary.Setup(x => x["Referer"]).Returns("");
            _httpContext.Setup(x => x.Headers).Returns(_headerDictionary.Object);
            _httpContextAccessor.Setup(x => x.HttpContext.Request).Returns(_httpContext.Object);
            _serviceProvider.Setup(x => x.GetService(typeof(IHttpContextAccessor))).Returns(_httpContextAccessor.Object);

            _packageRepository = new Mock<IPackageRepository>();

            _mapper = new Mock<IMapper>();

            _getByFilterPagedPackagesQuery = new GetByFilterPagedPackagesQuery();
            _getByFilterPagedPackagesQueryHandler = new GetByFilterPagedPackagesQueryHandler(_packageRepository.Object);
        }


        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQuery_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "UpdateTimeDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson() {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new  Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }



        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByIsActiveASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "IsActiveASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByIsActiveDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "IsActiveDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }


        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByNameASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "NameASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByNameDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "NameDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByPackageKindASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "PackageKindASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test",
                    PackageKind=PackageKind.Corporate,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByPackageKindDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "PackageKindDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test",
                    PackageKind=PackageKind.Corporate,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }


        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryBySummaryASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "SummaryASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryBySummaryDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "SummaryDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryContentASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "ContentASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 2",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByContentDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "ContentDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 2",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByPackageTypeASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "PackageTypeASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test",
                    PackageKind=PackageKind.Corporate,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{ new PackagePackageTypeEnum { Id=1} },
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {  Id = 1, FileType= FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{ new PackagePackageTypeEnum { Id=2} },
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 2",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByPackageTypeDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "PackageTypeDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test",
                    PackageKind=PackageKind.Corporate,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{ new PackagePackageTypeEnum { Id=1} },
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{ new PackagePackageTypeEnum { Id=2} },
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }


        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByClassroomDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "ClassroomDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByClassroomASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "ClassroomASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }


              
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByLessonDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "LessonDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test 1",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByLessonASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "LessonASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test 1",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryPackageFieldTypeASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "PackageFieldTypeASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{ new PackageFieldType { Id = 1, FieldType = FieldType.Sayisal } },
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{ new PackageFieldType { Id = 1, FieldType = FieldType.EsitAgirlik } },
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 2",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByPackageFieldTypeDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "PackageFieldTypeDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{ new PackageFieldType { Id = 1, FieldType = FieldType.Yok } },
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 2",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{ new PackageFieldType { Id = 1, FieldType = FieldType.Sayisal } },
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByRoleDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "RoleDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test",
                    PackageKind=PackageKind.Corporate,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1, Name="Veli"}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{ new PackagePackageTypeEnum { Id=1} },
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1, Name="Admin"}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{ new PackagePackageTypeEnum { Id=2} },
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 2",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByRoleASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "RoleASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test",
                    PackageKind=PackageKind.Corporate,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1, Name="Veli"}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{ new PackagePackageTypeEnum { Id=1} },
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1, Name="Admin"}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{ new PackagePackageTypeEnum { Id=2} },
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }


        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByStartDateASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "StartDateASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,2,3),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,3,4),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByStartDateDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "StartDateDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,1,3),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,4,5),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }


            
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByFinishDateASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "FinishDateASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(2022,4,5),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,2,3),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(2022,5,6),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,3,4),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByFinishDateDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "FinishDateDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(2022,5,6),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,1,3),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(2022,6,7),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,4,5),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

               
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByHasCoachServiceASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "HasCoachServiceASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(2022,4,5),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,2,3),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=false,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(2022,5,6),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,3,4),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByHasCoachServiceDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "FinishDateDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=false,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(2022,5,6),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,1,3),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(2022,6,7),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,4,5),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

                
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByHasTryingTestASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "HasTryingTestASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File { Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(2022,4,5),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,2,3),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=false,
                    UpdateTime=new DateTime(),
                    HasTryingTest=true,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(2022,5,6),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,3,4),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByHasTryingTestDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "HasTryingTestDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=false,
                    UpdateTime=new DateTime(),
                    HasTryingTest=true,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(2022,5,6),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,1,3),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=0,
                    FinishDate=new DateTime(2022,6,7),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,4,5),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

                      
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByTryingTestQuestionCountASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "TryingTestQuestionCountASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=25,
                    FinishDate=new DateTime(2022,4,5),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,2,3),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=false,
                    UpdateTime=new DateTime(),
                    HasTryingTest=true,
                    TryingTestQuestionCount=70,
                    FinishDate=new DateTime(2022,5,6),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,3,4),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByTryingTestQuestionCountDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "TryingTestQuestionCountDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=false,
                    UpdateTime=new DateTime(),
                    HasTryingTest=true,
                    TryingTestQuestionCount=50,
                    FinishDate=new DateTime(2022,5,6),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,1,3),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=80,
                    FinishDate=new DateTime(2022,6,7),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,4,5),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
                      
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByHasMotivationEventASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "HasMotivationEventASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=25,
                    FinishDate=new DateTime(2022,4,5),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,2,3),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=true,
                    HasCoachService=false,
                    UpdateTime=new DateTime(),
                    HasTryingTest=true,
                    TryingTestQuestionCount=70,
                    FinishDate=new DateTime(2022,5,6),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,3,4),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByHasMotivationEventDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "HasMotivationEventDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=true,
                    HasCoachService=false,
                    UpdateTime=new DateTime(),
                    HasTryingTest=true,
                    TryingTestQuestionCount=50,
                    FinishDate=new DateTime(2022,5,6),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,1,3),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=80,
                    FinishDate=new DateTime(2022,6,7),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,4,5),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

         
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByIdASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "IdASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=25,
                    FinishDate=new DateTime(2022,4,5),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,2,3),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=true,
                    HasCoachService=false,
                    UpdateTime=new DateTime(),
                    HasTryingTest=true,
                    TryingTestQuestionCount=70,
                    FinishDate=new DateTime(2022,5,6),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,3,4),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByIdDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "IdDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=true,
                    HasCoachService=false,
                    UpdateTime=new DateTime(),
                    HasTryingTest=true,
                    TryingTestQuestionCount=50,
                    FinishDate=new DateTime(2022,5,6),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,1,3),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=80,
                    FinishDate=new DateTime(2022,6,7),
                    InsertTime=new DateTime(),
                    StartDate=new DateTime(2022,4,5),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
         
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByInsertTimeASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "InsertTimeASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=25,
                    FinishDate=new DateTime(2022,4,5),
                    InsertTime=new DateTime(2021,12,12),
                    StartDate=new DateTime(2022,2,3),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=true,
                    HasCoachService=false,
                    UpdateTime=new DateTime(),
                    HasTryingTest=true,
                    TryingTestQuestionCount=70,
                    FinishDate=new DateTime(2022,5,6),
                    InsertTime=new DateTime(2022,1,2),
                    StartDate=new DateTime(2022,3,4),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByInsertTimeDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "InsertTimeDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=true,
                    HasCoachService=false,
                    UpdateTime=new DateTime(),
                    HasTryingTest=true,
                    TryingTestQuestionCount=50,
                    FinishDate=new DateTime(2022,5,6),
                    InsertTime=new DateTime(2022,1,2),
                    StartDate=new DateTime(2022,1,3),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(),
                    HasTryingTest=false,
                    TryingTestQuestionCount=80,
                    FinishDate=new DateTime(2022,6,7),
                    InsertTime=new DateTime(2022,2,3),
                    StartDate=new DateTime(2022,4,5),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }


        
         
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByUpdateTimeASC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "UpdateTimeASC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(2022,1,2),
                    HasTryingTest=false,
                    TryingTestQuestionCount=25,
                    FinishDate=new DateTime(2022,4,5),
                    InsertTime=new DateTime(2021,12,12),
                    StartDate=new DateTime(2022,2,3),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=true,
                    HasCoachService=false,
                    UpdateTime=new DateTime(2022,2,3),
                    HasTryingTest=true,
                    TryingTestQuestionCount=70,
                    FinishDate=new DateTime(2022,5,6),
                    InsertTime=new DateTime(2022,1,2),
                    StartDate=new DateTime(2022,3,4),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        
        [Test]
        [TestCase(new long[] { 1, 2 }, new long[] { 1, 2 }, new long[] { 1, 2 }, "", PackageKind.Personal, new long[] { 1, 2 }, new long[] { 1, 2 }, true, new long[] { 1, 2 }, false, false, true, 1, "01/02/2024")]
        public async Task GetByFilterPagedPackagesQueryByUpdateTimeDESC_Success(long[] fieldTypeIds, long[] publisherIds, long[] packageTypeEnumIds, string name, PackageKind packageKind, long[] classroomIds,
            long[] lessonIds, bool isActice, long[] roleIds, bool hasCoachService, bool hasMotivationEvent, bool hasTryingTest, int? tryingTestQuestionCount, string date)
        {
            DateTime validDate = DateTime.Parse(date);

            _getByFilterPagedPackagesQuery = new()
            {
                PackageDetailSearch = new()
                {
                    ClassroomIds = classroomIds,
                    FieldTypeIds = fieldTypeIds,
                    HasCoachService = hasCoachService,
                    HasMotivationEvent = hasMotivationEvent,
                    HasTryingTest = hasTryingTest,
                    IsActive = isActice,
                    LessonIds = lessonIds,
                    Name = name,
                    PackageKind = packageKind,
                    PackageTypeEnumIds = packageTypeEnumIds,
                    PublisherIds = publisherIds,
                    RoleIds = roleIds,
                    TryingTestQuestionCount = tryingTestQuestionCount,
                    ValidDate = validDate,
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "UpdateTimeDESC"

                }
            };

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test 1",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=1, Name="Test",IsActive=true, ClassroomId=1,Classroom= new Classroom{ Id=1, IsActive=true, Name="Class 1" }},
                            LessonId=1,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=true,
                    HasCoachService=false,
                    UpdateTime=new DateTime(2022,4,5),
                    HasTryingTest=true,
                    TryingTestQuestionCount=50,
                    FinishDate=new DateTime(2022,5,6),
                    InsertTime=new DateTime(2022,1,2),
                    StartDate=new DateTime(2022,1,3),
                    Summary="Summary 2",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
                new Package
                {
                    Id = 2,
                    IsActive=false,
                    Name = "Test 2",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {Id=2, Name="Test 2",IsActive=true, ClassroomId=2,Classroom= new Classroom{ Id=2, IsActive=true, Name="Class 2" }},
                            LessonId=2,
                            Package=new Package { Id = 1,  IsActive=true, PackageKind=PackageKind.Personal, PackageLessons = new List<PackageLesson> {new PackageLesson { Id = 1}}},
                            PackageId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> { new ImageOfPackage {Id = 1,FileId=1,File = new File {Id = 1, FileType=FileType.PackageImage } }},
                    PackageRoles= new List<PackageRole>{ new PackageRole { Role= new Role { Id=1}, RoleId=1 } },
                    PackageDocuments= new List<PackageDocument>{ new PackageDocument { Document= new Document { Id=1}, DocumentId=1 } },
                    PackagePublishers= new List<PackagePublisher>{ new PackagePublisher { Publisher= new Publisher { Id=1}, PublisherId=1 } },
                    PackageContractTypes= new List<PackageContractType>{ new PackageContractType { ContractType= new ContractType { Id=1}, ContractTypeId=1 } },
                    PackageFieldTypes= new List<PackageFieldType>{},
                    PackagePackageTypeEnums= new List<PackagePackageTypeEnum>{},
                    TestExamPackages= new List<PackageTestExamPackage>{},
                    CoachServicePackages= new List<PackageCoachServicePackage>{},
                    MotivationActivityPackages= new List<PackageMotivationActivityPackage>{},
                    PackageEvents= new List<PackageEvent>{},
                    Content="Content 1",
                    HasMotivationEvent=false,
                    HasCoachService=true,
                    UpdateTime=new DateTime(2022,4,4),
                    HasTryingTest=false,
                    TryingTestQuestionCount=80,
                    FinishDate=new DateTime(2022,6,7),
                    InsertTime=new DateTime(2022,2,3),
                    StartDate=new DateTime(2022,4,5),
                    Summary="Summary 1",
                    InsertUserId=1,
                    UpdateUserId=1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackagesQueryHandler.Handle(_getByFilterPagedPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }




    }
}
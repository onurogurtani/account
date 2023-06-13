using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DotNetCore.CAP;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using static TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands.UpdatePackageCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Packages.Commands
{
    [TestFixture]

    public class UpdatePackageCommandTest
    {
        private UpdatePackageCommand _updatePackageCommand;
        private UpdatePackageCommandHandler _updatePackageCommandHandler;

        Mock<IImageOfPackageRepository> _imageOfPackageRepository;
        Mock<IPackageRepository> _packageRepository;
        Mock<IPackageLessonRepository> _packageLessonRepository;
        Mock<IPackagePublisherRepository> _packagePublisherRepository;
        Mock<IPackageDocumentRepository> _packageDocumentRepository;
        Mock<IPackageContractTypeRepository> _packageContractTypeRepository;
        Mock<IPackagePackageTypeEnumRepository> _packagePackageTypeEnumRepository;
        Mock<IPackageFieldTypeRepository> _packageFieldTypeRepository;
        Mock<IPackageCoachServicePackageRepository> _packageCoachServicePackageRepository;
        Mock<IPackageMotivationActivityPackageRepository> _packageMotivationActivityPackageRepository;
        Mock<IPackageTestExamPackageRepository> _packageTestExamPackageRepository;
        Mock<IPackageTestExamRepository> _packageTestExamRepository;
        Mock<IPackageEventRepository> _packageEventRepository;
        Mock<IPackageRoleRepository> _packageRoleRepository;


        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpRequest;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IServiceProvider> _serviceProvider;
        Mock<IMediator> _mediator;
        Mock<IMapper> _mapper;
        Mock<RedisService> _redisService;
        Mock<ICapPublisher> _capPublisher;

        [SetUp]
        public void Setup()
        {
            _mediator = new Mock<IMediator>();
            _serviceProvider = new Mock<IServiceProvider>();
            _httpContextAccessor = new Mock<IHttpContextAccessor>();
            _httpRequest = new Mock<HttpRequest>();
            _headerDictionary = new Mock<IHeaderDictionary>();
            _mapper = new Mock<IMapper>();
            _redisService = new Mock<RedisService>();

            _serviceProvider.Setup(x => x.GetService(typeof(IMediator))).Returns(_mediator.Object);
            ServiceTool.ServiceProvider = _serviceProvider.Object;
            _headerDictionary.Setup(x => x["Referer"]).Returns("");
            _httpRequest.Setup(x => x.Headers).Returns(_headerDictionary.Object);
            _httpContextAccessor.Setup(x => x.HttpContext.Request).Returns(_httpRequest.Object);
            _serviceProvider.Setup(x => x.GetService(typeof(IHttpContextAccessor))).Returns(_httpContextAccessor.Object);
            _serviceProvider.Setup(x => x.GetService(typeof(RedisService))).Returns(_redisService.Object);

            _imageOfPackageRepository = new Mock<IImageOfPackageRepository>();
            _packageRepository = new Mock<IPackageRepository>();
            _packageLessonRepository = new Mock<IPackageLessonRepository>();
            _packagePublisherRepository = new Mock<IPackagePublisherRepository>();
            _packageDocumentRepository = new Mock<IPackageDocumentRepository>();
            _packageContractTypeRepository = new Mock<IPackageContractTypeRepository>();
            _packagePackageTypeEnumRepository = new Mock<IPackagePackageTypeEnumRepository>();
            _packageFieldTypeRepository = new Mock<IPackageFieldTypeRepository>();
            _packageCoachServicePackageRepository = new Mock<IPackageCoachServicePackageRepository>();
            _packageMotivationActivityPackageRepository = new Mock<IPackageMotivationActivityPackageRepository>();
            _packageTestExamPackageRepository = new Mock<IPackageTestExamPackageRepository>();
            _packageTestExamRepository = new Mock<IPackageTestExamRepository>();
            _packageEventRepository = new Mock<IPackageEventRepository>();
            _packageRoleRepository = new Mock<IPackageRoleRepository>();


            _capPublisher = new Mock<ICapPublisher>();

            _updatePackageCommand = new UpdatePackageCommand();
            _updatePackageCommandHandler = new(_packageCoachServicePackageRepository.Object, _packageEventRepository.Object, _packageMotivationActivityPackageRepository.Object,
                _packageTestExamPackageRepository.Object, _packagePackageTypeEnumRepository.Object, _packageFieldTypeRepository.Object, _packageRepository.Object, _imageOfPackageRepository.Object,
                _packageLessonRepository.Object, _packagePublisherRepository.Object, _packageDocumentRepository.Object, _packageContractTypeRepository.Object, _packageTestExamRepository.Object, _capPublisher.Object, _packageRoleRepository.Object, _mediator.Object);
        }

        [Test]
        public async Task UpdatePackageCommand_Success()
        {
            _updatePackageCommand = new()
            {
                Package = new()
                {
                    Id = 1,
                    FinishDate = DateTime.Now,
                    HasCoachService = false,
                    HasMotivationEvent = false,
                    HasTryingTest = false,
                    InsertUserId = 1,
                    IsActive = true,
                    TryingTestQuestionCount = 0,
                    StartDate = DateTime.Now,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId = 1,
                    UpdateTime = DateTime.Now,
                    Summary = "Test",
                    Content = "Test",
                    EducationYearId = 1,
                    ImageOfPackages = new List<ImageOfPackage>
                    {
                        new ImageOfPackage
                        {
                            Id = 1,
                            PackageId = 1,
                            FileId = 1,
                        },
                    },
                    PackagePublishers = new List<PackagePublisher>
                    {
                        new PackagePublisher
                        {
                            Id = 1,
                            PackageId = 1,
                            PublisherId = 1,
                        },
                    },
                },
            };

            var pages = new List<Package>
            {
                new Package{
                    Id = 1,
                    FinishDate= DateTime.Now,
                    HasCoachService= false,
                    HasMotivationEvent= false,
                    HasTryingTest= false,
                    InsertUserId= 1,
                    IsActive= true,
                    TryingTestQuestionCount= 0,
                    StartDate= DateTime.Now,
                    Name = "Deneme",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                    Summary= "Deneme",
                    Content= "Deneme",
                    EducationYearId = 1,
                    ImageOfPackages = new List<ImageOfPackage>
                    {
                        new ImageOfPackage
                        {
                            Id = 1,
                            PackageId = 1,
                            FileId = 1,
                        },
                    },
                    PackagePublishers = new List<PackagePublisher>
                    {
                        new PackagePublisher
                        {
                            Id = 1,
                            PackageId = 1,
                            PublisherId = 1,
                        },
                    },
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pages.AsQueryable().BuildMock());
            _packageRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Package, bool>>>())).ReturnsAsync(_updatePackageCommand.Package);
            _packageRepository.Setup(x => x.Update(It.IsAny<Package>())).Returns(new Package());

            var result = await _updatePackageCommandHandler.Handle(_updatePackageCommand, new CancellationToken());
            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task UpdatePackageCommand_ExistName_Error()
        {
            _updatePackageCommand = new()
            {
                Package = new()
                {
                    Id = 1,
                    FinishDate = DateTime.Now,
                    HasCoachService = false,
                    HasMotivationEvent = false,
                    HasTryingTest = false,
                    InsertUserId = 1,
                    IsActive = true,
                    TryingTestQuestionCount = 0,
                    StartDate = DateTime.Now,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId = 1,
                    UpdateTime = DateTime.Now,
                    Summary = "Test",
                    Content = "Test",
                    EducationYearId = 1,
                },
            };

            var pages = new List<Package>
            {
                new Package{Id = 0, Name = "Test", IsActive = true },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pages.AsQueryable().BuildMock());
            _packageRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Package, bool>>>())).ReturnsAsync(_updatePackageCommand.Package);

            var result = await _updatePackageCommandHandler.Handle(_updatePackageCommand, new CancellationToken());
            result.Success.Should().BeFalse();
        }

        [Test]
        public async Task UpdatePackageCommand_EntityNull_Error()
        {
            _updatePackageCommand = new()
            {
                Package = new()
                {
                    Id = 1,
                    FinishDate = DateTime.Now,
                    HasCoachService = false,
                    HasMotivationEvent = false,
                    HasTryingTest = false,
                    InsertUserId = 1,
                    IsActive = true,
                    TryingTestQuestionCount = 0,
                    StartDate = DateTime.Now,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId = 1,
                    UpdateTime = DateTime.Now,
                    Summary = "Test",
                    Content = "Test",
                    EducationYearId = 1,
                },
            };

            var pages = new List<Package>
            {
                new Package{Id = 1, Name = "Test", IsActive = true },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pages.AsQueryable().BuildMock());
            _packageRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Package, bool>>>())).ReturnsAsync(() => null);

            var result = await _updatePackageCommandHandler.Handle(_updatePackageCommand, new CancellationToken());
            result.Success.Should().BeFalse();
        }
    }
}


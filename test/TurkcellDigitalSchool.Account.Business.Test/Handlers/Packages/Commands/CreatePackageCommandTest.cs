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
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using static TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands.CreatePackageCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Packages.Commands
{
    [TestFixture]

    public class CreatePackageCommandTest
    {
        private CreatePackageCommand _createPackageCommand;
        private CreatePackageCommandHandler _createPackageCommandHandler;

        Mock<IPackageRepository> _packageRepository;

        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpRequest;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IServiceProvider> _serviceProvider;
        Mock<IMediator> _mediator;
        Mock<IMapper> _mapper;
        Mock<RedisService> _redisService;

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

            _packageRepository = new Mock<IPackageRepository>();

            _createPackageCommand = new CreatePackageCommand();
            _createPackageCommandHandler = new(_packageRepository.Object);
        }

        [Test]

        public async Task CreatePackageCommand_Success()
        {
            _createPackageCommand = new()
            {
                Package = new()
                {
                    Id = 0,
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
                new Package{
                    Id = 0, FinishDate= DateTime.Now,
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
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pages.AsQueryable().BuildMock());
            _packageRepository.Setup(x => x.Add(It.IsAny<Package>())).Returns(new Package());

            var result = await _createPackageCommandHandler.Handle(_createPackageCommand, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task CreatePackageCommand_ExistName_Error()
        {
            _createPackageCommand = new()
            {
                Package = new()
                {
                    Id = 0,
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
                new Package{Id = 1, Name="Test", IsActive=true },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pages.AsQueryable().BuildMock());
            _packageRepository.Setup(x => x.Add(It.IsAny<Package>())).Returns(new Package());

            var result = await _createPackageCommandHandler.Handle(_createPackageCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }
    }
}


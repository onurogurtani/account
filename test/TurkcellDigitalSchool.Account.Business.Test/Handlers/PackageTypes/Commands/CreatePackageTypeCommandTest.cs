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
using TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using static TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands.CreatePackageTypeCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.PackageTypes.Commands
{
    [TestFixture]

    public class CreateTargetScreenCommandTest
    {
        private CreatePackageTypeCommand _createPackageTypeCommand;
        private CreatePackageTypeCommandHandler _createPackageTypeCommandHandler;

        Mock<IPackageTypeRepository> _packageTypeRepository;

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

            _packageTypeRepository = new Mock<IPackageTypeRepository>();

            _createPackageTypeCommand = new CreatePackageTypeCommand();
            _createPackageTypeCommandHandler = new(_packageTypeRepository.Object);
        }


        [Test]

        public async Task CreatePackageTypeCommand_Success()
        {
            _createPackageTypeCommand = new()
            {
                PackageType = new()
                {
                    Id = 0,
                    IsCanSeeTargetScreen = true,
                    InsertUserId = 1,
                    IsActive = true,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId = 1,
                    UpdateTime = DateTime.Now,

                },
            };

            var pagetypes = new List<PackageType>
            {
                new PackageType{
                    Id = 0,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen = true,
                }
            };

            _packageTypeRepository.Setup(x => x.Query()).Returns(pagetypes.AsQueryable().BuildMock());
            _packageTypeRepository.Setup(x => x.Add(It.IsAny<PackageType>())).Returns(new PackageType());

            var result = await _createPackageTypeCommandHandler.Handle(_createPackageTypeCommand, new CancellationToken());

            result.Success.Should().BeTrue();
        }
    }
}


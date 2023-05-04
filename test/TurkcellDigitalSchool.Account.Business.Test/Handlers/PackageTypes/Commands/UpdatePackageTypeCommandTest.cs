using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using static TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands.UpdatePackageTypeCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.PackageTypes.Commands
{
    [TestFixture]

    public class UpdateTargetScreenCommandTest
    {
        Mock<IPackageTypeRepository> _packageTypeRepository;
        Mock<IPackageTypeTargetScreenRepository> _packageTypeTargetScreenRepository;

        private UpdatePackageTypeCommand _updatePackageTypeCommand;
        private UpdatePackageTypeCommandHandler _updatePackageTypeCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;


        [SetUp]
        public void Setup()
        {
            _packageTypeRepository = new Mock<IPackageTypeRepository>();
            _packageTypeTargetScreenRepository = new Mock<IPackageTypeTargetScreenRepository>();

            _updatePackageTypeCommand = new UpdatePackageTypeCommand();
            _updatePackageTypeCommandHandler = new(_packageTypeRepository.Object, _packageTypeTargetScreenRepository.Object);

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
        }


        [Test]

        public async Task UpdatePackageTypeCommand_Success()
        {
            _updatePackageTypeCommand = new()
            {
                PackageType = new()
                {
                    Id = 2,
                    InsertUserId = 1,
                    IsActive = true,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId = 1,
                    UpdateTime = DateTime.Now,
                    IsCanSeeTargetScreen = true
                },
            };

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen= true
                }

            };
            var pageTypeTargetScreen = new List<PackageTypeTargetScreen>
            {
                new PackageTypeTargetScreen{

                    Id = 1,
                    InsertUserId= 1,
                    PackageType=new PackageType{ Id=3, InsertUserId=1, Name="Test"},
                    PackageTypeId=3,
                    TargetScreenId=1,
                    TargetScreen=new TargetScreen{ Id=1, },
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                }

            };

            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());
            _packageTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<PackageType, bool>>>())).ReturnsAsync(_updatePackageTypeCommand.PackageType);

            _packageTypeTargetScreenRepository.Setup(x => x.Query()).Returns(pageTypeTargetScreen.AsQueryable().BuildMock());
            _packageTypeTargetScreenRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<PackageTypeTargetScreen, bool>>>())).ReturnsAsync(pageTypeTargetScreen);
            _packageTypeRepository.Setup(x => x.Update(It.IsAny<PackageType>())).Returns(new PackageType());

            var result = await _updatePackageTypeCommandHandler.Handle(_updatePackageTypeCommand, new CancellationToken());

            result.Success.Should().BeTrue();

        }


        [Test]
        public async Task UpdatePackageTypeCommand_EntityNull_Error()
        {
            _updatePackageTypeCommand = new()
            {
                PackageType = new()
                {
                    Id = 1,
                    InsertUserId = 1,
                    IsActive = true,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId = 1,
                    UpdateTime = DateTime.Now,
                    IsCanSeeTargetScreen = true
                },
            };

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen= true
                }

            };

            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());
            _packageTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<PackageType, bool>>>())).ReturnsAsync(() => null);

            var result = await _updatePackageTypeCommandHandler.Handle(_updatePackageTypeCommand, new CancellationToken());

            result.Success.Should().BeFalse();

        }

    }
}


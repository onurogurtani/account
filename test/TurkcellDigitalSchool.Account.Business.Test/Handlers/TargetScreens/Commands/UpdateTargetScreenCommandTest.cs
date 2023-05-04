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
using TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using static TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Commands.UpdateTargetScreenCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.TargetScreens.Commands
{
    [TestFixture]

    public class UpdateTargetScreenCommandTest
    {
        Mock<ITargetScreenRepository> _targetScreenRepository;

        private UpdateTargetScreenCommand _updateTargetScreenCommand;
        private UpdateTargetScreenCommandHandler _updateTargetScreenCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;


        [SetUp]
        public void Setup()
        {
            _targetScreenRepository = new Mock<ITargetScreenRepository>();

            _updateTargetScreenCommand = new UpdateTargetScreenCommand();
            _updateTargetScreenCommandHandler = new(_targetScreenRepository.Object);

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

        public async Task UpdateTargetScreenCommand_Success()
        {
            _updateTargetScreenCommand = new()
            {
                TargetScreen = new()
                {
                    Id = 2,
                    InsertUserId = 1,
                    IsActive = true,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId = 1,
                    UpdateTime = DateTime.Now,
                    PageName = "Test",
                },
            };

            var targetScreen = new List<TargetScreen>
            {
                new TargetScreen{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                    PageName= "Test",
                }
            };

            _targetScreenRepository.Setup(x => x.Query()).Returns(targetScreen.AsQueryable().BuildMock());
            _targetScreenRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<TargetScreen, bool>>>())).ReturnsAsync(_updateTargetScreenCommand.TargetScreen);

            _targetScreenRepository.Setup(x => x.Update(It.IsAny<TargetScreen>())).Returns(new TargetScreen());

            var result = await _updateTargetScreenCommandHandler.Handle(_updateTargetScreenCommand, new CancellationToken());

            result.Success.Should().BeTrue();

        }


        [Test]
        public async Task UpdateTargetScreenCommand_EntityNull_Error()
        {
            _updateTargetScreenCommand = new()
            {
                TargetScreen = new()
                {
                    Id = 1,
                    InsertUserId = 1,
                    IsActive = true,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId = 1,
                    UpdateTime = DateTime.Now,
                    PageName = "Test",  
                },
            };

            var targetScreen = new List<TargetScreen>
            {
                new TargetScreen{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                    PageName = "Test",
                }

            };

            _targetScreenRepository.Setup(x => x.Query()).Returns(targetScreen.AsQueryable().BuildMock());
            _targetScreenRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<TargetScreen, bool>>>())).ReturnsAsync(() => null);

            var result = await _updateTargetScreenCommandHandler.Handle(_updateTargetScreenCommand, new CancellationToken());

            result.Success.Should().BeFalse();

        }

    }
}


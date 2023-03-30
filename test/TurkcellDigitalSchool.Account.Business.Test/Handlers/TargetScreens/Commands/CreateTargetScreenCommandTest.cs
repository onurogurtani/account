using System;
using System.Collections.Generic;
using System.Linq;
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
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Commands.CreateTargetScreenCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.TargetScreens.Commands
{
    [TestFixture]

    public class CreateUserBasketPackageCommandTest
    {
        Mock<ITargetScreenRepository> _targetScreenRepository;


        private CreateTargetScreenCommand _createTargetScreenCommand;
        private CreateTargetScreenCommandHandler _createTargetScreenCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;


        [SetUp]
        public void Setup()
        {
            _targetScreenRepository = new Mock<ITargetScreenRepository>();

            _createTargetScreenCommand = new CreateTargetScreenCommand();
            _createTargetScreenCommandHandler = new(_targetScreenRepository.Object);

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

        public async Task CreateTargetScreenCommand_Success()
        {
            _createTargetScreenCommand = new()
            {
                TargetScreen = new()
                {
                    Id = 0,
                    PageName = "Test",
                    InsertUserId = 1,
                    IsActive = true,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId = 1,
                    UpdateTime = DateTime.Now,

                },
            };

            var pagetypes = new List<TargetScreen>
            {
                new TargetScreen{
                    Id = 0,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                    PageName= "Test",
                }
            };

            _targetScreenRepository.Setup(x => x.Query()).Returns(pagetypes.AsQueryable().BuildMock());
            _targetScreenRepository.Setup(x => x.Add(It.IsAny<TargetScreen>())).Returns(new TargetScreen());

            var result = await _createTargetScreenCommandHandler.Handle(_createTargetScreenCommand, new CancellationToken());

            result.Success.Should().BeTrue();

        }



    }
}


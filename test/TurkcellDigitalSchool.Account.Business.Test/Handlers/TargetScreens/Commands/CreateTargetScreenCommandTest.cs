using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Commands.CreateTargetScreenCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.TargetScreens.Commands
{
    [TestFixture]

    public class CreateUserBasketPackageCommandTest
    {
        private CreateTargetScreenCommand _createTargetScreenCommand;
        private CreateTargetScreenCommandHandler _createTargetScreenCommandHandler;

        private Mock<ITargetScreenRepository> _targetScreenRepository;

        [SetUp]
        public void Setup()
        {
            _targetScreenRepository = new Mock<ITargetScreenRepository>();

            _createTargetScreenCommand = new CreateTargetScreenCommand();
            _createTargetScreenCommandHandler = new(_targetScreenRepository.Object);
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


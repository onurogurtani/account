using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Commands.UpdateTargetScreenCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.TargetScreens.Commands
{
    [TestFixture]

    public class UpdateTargetScreenCommandTest
    {
        private UpdateTargetScreenCommand _updateTargetScreenCommand;
        private UpdateTargetScreenCommandHandler _updateTargetScreenCommandHandler;

        private Mock<ITargetScreenRepository> _targetScreenRepository;

        [SetUp]
        public void Setup()
        {
            _targetScreenRepository = new Mock<ITargetScreenRepository>();

            _updateTargetScreenCommand = new UpdateTargetScreenCommand();
            _updateTargetScreenCommandHandler = new(_targetScreenRepository.Object);
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


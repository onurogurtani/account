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
using static TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Commands.DeleteTargetScreenCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.TargetScreens.Commands
{
    [TestFixture]

    public class DeleteUserBasketPackageCommandTest
    {
        private DeleteTargetScreenCommand _deleteTargetScreenCommand;
        private DeleteTargetScreenCommandHandler _deleteTargetScreenCommandHandler;

        private Mock<ITargetScreenRepository> _targetScreenRepository;

        [SetUp]
        public void Setup()
        {
            _targetScreenRepository = new Mock<ITargetScreenRepository>();

            _deleteTargetScreenCommand = new DeleteTargetScreenCommand();
            _deleteTargetScreenCommandHandler = new(_targetScreenRepository.Object);
        }

        [Test]

        public async Task DeleteTargetScreenCommand_Success()
        {
            _deleteTargetScreenCommand.Id = 1;

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
                    PageName="Test"
                }
            };

            _targetScreenRepository.Setup(x => x.Query()).Returns(targetScreen.AsQueryable().BuildMock());
            _targetScreenRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<TargetScreen, bool>>>())).ReturnsAsync(new TargetScreen());
            _targetScreenRepository.Setup(x => x.Delete(It.IsAny<TargetScreen>()));

            var result = await _deleteTargetScreenCommandHandler.Handle(_deleteTargetScreenCommand, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task DeleteTargetScreenCommand_EntityNull_Error()
        {
            _deleteTargetScreenCommand.Id = 1;


            var targetScreen = new List<TargetScreen>
            {
                new TargetScreen{Id = 1, Name="Test", IsActive=true },
            };

            _targetScreenRepository.Setup(x => x.Query()).Returns(targetScreen.AsQueryable().BuildMock());
            _targetScreenRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<TargetScreen, bool>>>())).ReturnsAsync(() => null);

            var result = await _deleteTargetScreenCommandHandler.Handle(_deleteTargetScreenCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }
    }
}


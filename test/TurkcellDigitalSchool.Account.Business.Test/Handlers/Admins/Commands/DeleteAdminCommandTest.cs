using FluentAssertions;
using Moq;
using NUnit.Framework;
using System;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using static TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands.DeleteAdminCommand;
using System.Collections.Generic;
using System.Linq.Expressions;
using TurkcellDigitalSchool.Core.Enums;
using System.Linq;
using MockQueryable.Moq;
using TurkcellDigitalSchool.Account.Domain.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Admins.Commands
{
    [TestFixture]
    public class DeleteAdminCommandTest
    {
        private DeleteAdminCommand _deleteAdminCommand;
        private DeleteAdminCommandHandler _deleteAdminCommandHandler;

        private Mock<IUserRepository> _userRepository;

        [SetUp]
        public void Setup()
        {
            _userRepository = new Mock<IUserRepository>();

            _deleteAdminCommand = new DeleteAdminCommand();
            _deleteAdminCommandHandler = new DeleteAdminCommandHandler(_userRepository.Object);
        }

        [Test]
        public async Task DeleteAdminCommand_Success()
        {
            _deleteAdminCommand = new DeleteAdminCommand { Id = 1 };
            var users = new List<User>
            {
                new User{Id = 1, UserType = UserType.Admin }
            };

            _userRepository.Setup(x => x.Query()).Returns(users.AsQueryable().BuildMock());
            _userRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<User, bool>>>())).ReturnsAsync(users[0]);
            _userRepository.Setup(x => x.Update(It.IsAny<User>())).Returns(new User());

            var result = await _deleteAdminCommandHandler.Handle(_deleteAdminCommand, CancellationToken.None);
            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task DeleteAdminCommand_Not_Success()
        {
            var result = await _deleteAdminCommandHandler.Handle(_deleteAdminCommand, CancellationToken.None);
            result.Success.Should().BeFalse();
        }
    }
}

using AutoMapper;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using DotNetCore.CAP;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Admins.Commands
{
    [TestFixture]
    public class CreateAdminCommandTest
    {
        private CreateAdminCommand _createAdminCommand;
        private CreateAdminCommand.CreateAdminCommandHandler _createAdminCommandHandler;

        private Mock<IUserRepository> _userRepository;
        private Mock<IUserRoleRepository> _userRoleRepository;
        private Mock<ITokenHelper> _tokenHelper;
        private Mock<ICapPublisher> _capPublisher;
        private Mock<IMapper> _mapper;

        [SetUp]
        public void Setup()
        {
            _mapper = new Mock<IMapper>();
            _tokenHelper = new Mock<ITokenHelper>();
            _userRepository = new Mock<IUserRepository>();
            _userRoleRepository = new Mock<IUserRoleRepository>();
            _capPublisher = new Mock<ICapPublisher>();

            _createAdminCommand = new CreateAdminCommand();
            _createAdminCommandHandler = new CreateAdminCommand.CreateAdminCommandHandler(_userRoleRepository.Object, _userRepository.Object, _tokenHelper.Object, _mapper.Object );
        }

        [Test]
        public async Task CreateAdminCommand_Success()
        {
            _createAdminCommand = new()
            {
                Admin = new CreateUpdateAdminDto
                {
                    Id = 0,
                    Name = "Test",
                    CitizenId = "11111111111",
                    Email = "test@test.com",
                    MobilePhones = "1111111111",
                    RoleIds = new List<long>(),

                }
            };
            var users = new List<User>
            {
                new User{Id = 0, UserType = UserType.Admin }
            };

            _userRepository.Setup(x => x.Query()).Returns(users.AsQueryable().BuildMock());
            _userRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<User, bool>>>())).ReturnsAsync(users[0]);
            _userRepository.Setup(x => x.Update(It.IsAny<User>())).Returns(new User());
            _mapper.Setup(x => x.Map<CreateUpdateAdminDto, User>(_createAdminCommand.Admin)).Returns(users[0]);

            var result = await _createAdminCommandHandler.Handle(_createAdminCommand, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task CreateAdminCommand_Not_Success()
        {
            _createAdminCommand = new()
            {
                Admin = new CreateUpdateAdminDto
                {
                    Id = 0,
                    Name = "Test",
                    CitizenId = "11111111111",
                    Email = "test@test.com",
                    MobilePhones = "1111111111",
                    RoleIds = new List<long>(),

                }
            };
            var users = new List<User>
            {
                new User{Id = 1}
            };

            _userRepository.Setup(x => x.Query()).Returns(users.AsQueryable().BuildMock());
            _userRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<User, bool>>>())).ReturnsAsync(users[0]);
            _userRepository.Setup(x => x.Update(It.IsAny<User>())).Returns(new User());
            _mapper.Setup(x => x.Map<CreateUpdateAdminDto, User>(_createAdminCommand.Admin)).Returns(users[0]);

            var result = await _createAdminCommandHandler.Handle(_createAdminCommand, CancellationToken.None);
            result.Success.Should().BeFalse();
        }
    }
}

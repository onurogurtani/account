using DotNetCore.CAP;
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
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands.DeleteTeacherCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Teachers.Commands
{
    [TestFixture]
    public class DeleteTeacherCommandTest
    {
        private DeleteTeacherCommand _deleteTeacherCommand;
        private DeleteTeacherCommandHandler _deleteTeacherCommandHandler;

        private Mock<IUserRepository> _userRepository;
        private Mock<IOrganisationUserRepository> _organisationUserRepository;
        private Mock<ICapPublisher> _capPublisher;

        List<OrganisationUser> _fakeOrganisationUsers;
        List<User> _fakeUsers;

        [SetUp]
        public void Setup()
        {
            _userRepository = new Mock<IUserRepository>();
            _organisationUserRepository = new Mock<IOrganisationUserRepository>();
            _capPublisher = new Mock<ICapPublisher>();

            _deleteTeacherCommand = new DeleteTeacherCommand();
            _deleteTeacherCommandHandler = new(_userRepository.Object, _organisationUserRepository.Object );

            _fakeOrganisationUsers = new List<OrganisationUser>
            {
                new (){
                    Id = 1,
                    UserId = 1,
                    OrganisationId = 1,
                    IsDeleted = false
                }
            };

            _fakeUsers = new List<User>
            {
                new User
                {
                    Id = 1,
                    Name = "Ali",
                    SurName = "Aslan",
                    Email = "ali@hotmail.com",
                    CitizenId = 12345643678,
                    MobilePhones = "5554443322",
                    Status = true
                }
            };
        }

        [Test]
        public async Task DeleteTeacherCommand_Success()
        {
            _deleteTeacherCommand = new()
            {
                UserId = 1,
                OrganisationId = 1
            };

            _organisationUserRepository.Setup(x => x.Query()).Returns(_fakeOrganisationUsers.AsQueryable().BuildMock());
            _organisationUserRepository.Setup(x => x.Delete(It.IsAny<OrganisationUser>())).Callback((OrganisationUser organisationUser) =>
            {
                _fakeOrganisationUsers.Remove(organisationUser);
            });
            _userRepository.Setup(x => x.Update(It.IsAny<User>())).Returns(new User());
            _userRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<User, bool>>>())).ReturnsAsync(_fakeUsers.Where(q => q.Id == 1).FirstOrDefault());

            var result = await _deleteTeacherCommandHandler.Handle(_deleteTeacherCommand, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task DeleteTeacherCommand_OrganisationUser_Entity_Null()
        {
            _deleteTeacherCommand = new()
            {
                UserId = 1,
                OrganisationId = 3
            };

            _organisationUserRepository.Setup(x => x.Query()).Returns(_fakeOrganisationUsers.AsQueryable().BuildMock());

            var result = await _deleteTeacherCommandHandler.Handle(_deleteTeacherCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }

        [Test]
        public async Task DeleteTeacherCommand_User_Entity_Null()
        {
            _deleteTeacherCommand = new()
            {
                UserId = 1,
                OrganisationId = 1
            };

            _organisationUserRepository.Setup(x => x.Query()).Returns(_fakeOrganisationUsers.AsQueryable().BuildMock());
            _organisationUserRepository.Setup(x => x.Delete(It.IsAny<OrganisationUser>())).Callback((OrganisationUser organisationUser) =>
            {
                _fakeOrganisationUsers.Remove(organisationUser);
            });
            _userRepository.Setup(x => x.Update(It.IsAny<User>())).Returns(new User());
            _userRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<User, bool>>>())).ReturnsAsync(_fakeUsers.Where(q => q.Id == 3).FirstOrDefault());

            var result = await _deleteTeacherCommandHandler.Handle(_deleteTeacherCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }
    }
}


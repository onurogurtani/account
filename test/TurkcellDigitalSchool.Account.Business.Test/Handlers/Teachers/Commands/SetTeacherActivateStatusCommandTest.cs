using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Enums;
using static TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands.SetTeacherActivateStatusCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Teachers.Commands
{
    [TestFixture]
    public class SetTeacherActivateStatusCommandTest
    {
        private SetTeacherActivateStatusCommand _setTeacherActivateStatusCommand;
        private SetTeacherActivateStatusCommandHandler _setTeacherActivateStatusCommandHandler;

        private Mock<IUserRepository> _userRepository;

        List<User> _fakeUsers;

        [SetUp]
        public void Setup()
        {
            _userRepository = new Mock<IUserRepository>();

            _setTeacherActivateStatusCommand = new SetTeacherActivateStatusCommand();
            _setTeacherActivateStatusCommandHandler = new SetTeacherActivateStatusCommandHandler(_userRepository.Object);

            _fakeUsers = new List<User>
            {
                new User{
                    Id = 1,
                    UserName = "Ali",
                    SurName = "UnitTest",
                    Status = true,
                    ResidenceCountyId = 1,
                    ResidenceCityId = 1,
                    RemindLater = true,
                    RelatedIdentity = "UnitTest",
                    RegisterStatus = RegisterStatus.Registered,
                    AddingType = UserAddingType.Default,
                    Address = "Adres",
                    CitizenId = 12345676787,
                    Email = "email@hotmail.com",
                    MobilePhones = "5554443322",
                    UserType = UserType.Teacher,
                    IsDeleted = false
                },
                new User{
                    Id = 2,
                    UserName = "Ali",
                    SurName = "UnitTest",
                    Status = true,
                    ResidenceCountyId = 1,
                    ResidenceCityId = 1,
                    RemindLater = true,
                    RelatedIdentity = "UnitTest",
                    RegisterStatus = RegisterStatus.Registered,
                    AddingType = UserAddingType.Default,
                    Address = "Adres",
                    UserType = UserType.Student,
                    CitizenId = 12345676789,
                    Email = "email2@hotmail.com",
                    MobilePhones = "5554443321",
                    IsDeleted = false
                },
            };
        }

        [Test]
        public async Task SetTeacherActivateStatusCommand_Success()
        {
            _setTeacherActivateStatusCommand = new()
            {
                Id = 1,
                Status = true
            };

            _userRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<User, bool>>>())).ReturnsAsync(_fakeUsers.Where(q => q.Id == 1).FirstOrDefault());
            _userRepository.Setup(x => x.Update(It.IsAny<User>())).Returns(new User());

            var result = await _setTeacherActivateStatusCommandHandler.Handle(_setTeacherActivateStatusCommand, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task SetTeacherActivateStatusCommand_Not_Teacher()
        {
            _setTeacherActivateStatusCommand = new()
            {
                Id = 2,
                Status = false,
            };

            _userRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<User, bool>>>())).ReturnsAsync(_fakeUsers.Where(q => q.Id == 2).FirstOrDefault());
            _userRepository.Setup(x => x.Update(It.IsAny<User>())).Returns(new User());

            var result = await _setTeacherActivateStatusCommandHandler.Handle(_setTeacherActivateStatusCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }
    }
}


using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Enums;
using static TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands.AddTeacherCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Teachers.Commands
{
    [TestFixture]
    public class AddTeacherCommandTest
    {
        private AddTeacherCommand _addTeacherCommand;
        private AddTeacherCommandHandler _addTeacherCommandHandler;

        private Mock<IUserRepository> _userRepository;

        List<User> _fakeUsers;

        [SetUp]
        public void Setup()
        {
            _userRepository = new Mock<IUserRepository>();

            _addTeacherCommand = new AddTeacherCommand();
            _addTeacherCommandHandler = new(_userRepository.Object);

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
                }
            };
        }

        [Test]
        public async Task AddTeacherCommand_Success()
        {
            _addTeacherCommand = new()
            {
                Name = "Test",
                SurName = "UnitTest",
                Email = "email@hotmail.com",
                CitizenId = 123321123456,
                MobilePhones = "5554443323",
            };

            _userRepository.Setup(x => x.Query()).Returns(_fakeUsers.AsQueryable().BuildMock());
            _userRepository.Setup(x => x.Add(It.IsAny<User>())).Returns(new User());

            var result = await _addTeacherCommandHandler.Handle(_addTeacherCommand, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task AddTeacherCommand_Teacher_Exist()
        {
            _addTeacherCommand = new()
            {
                Name = "",
                SurName = "Test",
                Email = null,
                CitizenId = 12345676787,
                MobilePhones = "5554443323",
            };

            _userRepository.Setup(x => x.Query()).Returns(_fakeUsers.AsQueryable().BuildMock());
            _userRepository.Setup(x => x.Add(It.IsAny<User>())).Returns(new User());

            var result = await _addTeacherCommandHandler.Handle(_addTeacherCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }
    }
}


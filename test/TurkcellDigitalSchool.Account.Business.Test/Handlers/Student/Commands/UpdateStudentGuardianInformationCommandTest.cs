using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using static TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands.UpdateStudentParentInformationCommand;
using FluentAssertions;
using System.Linq;
using MockQueryable.Moq;
using TurkcellDigitalSchool.Account.Domain.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Student.Commands
{
    [TestFixture]
    public class UpdateStudentParentInformationCommandTest
    {
        private UpdateStudentParentInformationCommand _updateStudentParentInformationCommand;
        private UpdateStudentParentInformationCommandHandler _updateStudentParentInformationCommandHandler;

        private Mock<IStudentParentInformationRepository> _studentParentInformationRepository;
        private Mock<IUserRepository> _userRepository;

        [SetUp]
        public void Setup()
        {
            _studentParentInformationRepository = new Mock<IStudentParentInformationRepository>();
            _userRepository = new Mock<IUserRepository>();

            _updateStudentParentInformationCommand = new UpdateStudentParentInformationCommand();
            _updateStudentParentInformationCommandHandler = new UpdateStudentParentInformationCommandHandler(_studentParentInformationRepository.Object, _userRepository.Object);
        }

        [Test]
        public async Task UpdateStudentParentInformationCommand_Create_Success()
        {
            // TODO Unittest generic mesaj yapısından ötürü çalışmıyor. tekrar test edielcek.

            _updateStudentParentInformationCommand = new()
            {
                CitizenId = 52265263252,
                Email = "yadaskin@gmail.com",
                Name = "Yusuf",
                SurName = "Daşkın",
                MobilePhones = "05332100700"
            };
            _studentParentInformationRepository.Setup(x => x.CreateAndSave(It.IsAny<StudentParentInformation>(), It.IsAny<int?>(), It.IsAny<bool>()));

            var result = await _updateStudentParentInformationCommandHandler.Handle(_updateStudentParentInformationCommand, new CancellationToken());
            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task UpdateStudentParentInformationCommand_Update_Success()
        {
            // TODO Unittest generic mesaj yapısından ötürü çalışmıyor. tekrar test edielcek.
            _updateStudentParentInformationCommand = new()
            {
                CitizenId = 52265263252,
                Email = "yadaskin@gmail.com",
                Name = "Yusuf",
                SurName = "Daşkın",
                MobilePhones = "05332100700"
            };


            var list = new List<StudentParentInformation>()
            {
                new StudentParentInformation
                {
                    Id=1,
                    UserId=1
                }
            };

            _studentParentInformationRepository.Setup(x => x.Query()).Returns(list.AsQueryable().BuildMock());
            _studentParentInformationRepository.Setup(x => x.UpdateAndSave(It.IsAny<StudentParentInformation>(), It.IsAny<int?>(), It.IsAny<bool>()));

            var result = await _updateStudentParentInformationCommandHandler.Handle(_updateStudentParentInformationCommand, new CancellationToken());
            result.Success.Should().BeTrue();
        }
    }
}
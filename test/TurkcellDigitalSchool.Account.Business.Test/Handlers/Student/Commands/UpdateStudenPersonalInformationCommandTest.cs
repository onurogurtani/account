using MediatR;
using Moq;
using NUnit.Framework;
using System.Threading;
using System.Threading.Tasks;
using static TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands.UpdateStudentPersonalInformationCommand;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Business.Services.User;
using FluentAssertions;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Student.Commands
{
    [TestFixture]
    public class UpdateStudentPersonalInformationCommandTest
    {
        private UpdateStudentPersonalInformationCommand _updateStudentPersonalInformationCommand;
        private UpdateStudentPersonalInformationCommandHandler _updateStudentPersonalInformationCommandHandler;

        private Mock<IUserRepository> _userRepository;
        private Mock<IUserService> _userService;
        private Mock<ITokenHelper> _tokenHelper;
        private Mock<IMediator> _mediator;

        [SetUp]
        public void Setup()
        {
            _mediator = new Mock<IMediator>();
            _userRepository = new Mock<IUserRepository>();
            _userService = new Mock<IUserService>();
            _tokenHelper = new Mock<ITokenHelper>();

            _updateStudentPersonalInformationCommand = new UpdateStudentPersonalInformationCommand();
            _updateStudentPersonalInformationCommandHandler = new UpdateStudentPersonalInformationCommandHandler(_userRepository.Object, _userService.Object, _tokenHelper.Object, _mediator.Object);
        }

        [Test]
        public async Task UpdateStudentPersonalInformationCommand_Success()
        {
            _updateStudentPersonalInformationCommand = new()
            {
                MobilPhone = "",
                ResidenceCityId = 1,
                ResidenceCountyId = 1,
                UserName = "yadaskinn@gmail.com"
            };
            _tokenHelper.Setup(s => s.GetUserIdByCurrentToken()).Returns(1);
            _userService.Setup(w => w.GetUserById(It.IsAny<long>())).Returns(new User { Id = 1, AvatarId = 1 });
            _userService.Setup(w => w.IsExistUserName(It.IsAny<long>(), It.IsAny<string>())).Returns(false);
            _userRepository.Setup(x => x.CreateAndSave(It.IsAny<User>(), It.IsAny<int>(), It.IsAny<bool>()));
            var result = await _updateStudentPersonalInformationCommandHandler.Handle(_updateStudentPersonalInformationCommand, new CancellationToken());
            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task UpdateStudentPersonalInformationCommand_RecordDoesNotExist_Error()
        {
            _updateStudentPersonalInformationCommand = new()
            {
                MobilPhone = "",
                ResidenceCityId = 1,
                ResidenceCountyId = 1,
                UserName = "yadaskinn@gmail.com"
            };
            _tokenHelper.Setup(s => s.GetUserIdByCurrentToken()).Returns(1);
            _userService.Setup(w => w.GetUserById(It.IsAny<long>())).Returns((User)null);
            var result = await _updateStudentPersonalInformationCommandHandler.Handle(_updateStudentPersonalInformationCommand, new CancellationToken());
            result.Success.Should().BeFalse();
        }

        [Test]
        public async Task UpdateStudentPersonalInformationCommand_ExistUserName_Error()
        {
            _updateStudentPersonalInformationCommand = new()
            {
                MobilPhone = "",
                ResidenceCityId = 1,
                ResidenceCountyId = 1,
                UserName = "yadaskinn@gmail.com"
            };
            _tokenHelper.Setup(s => s.GetUserIdByCurrentToken()).Returns(1);
            _userService.Setup(w => w.GetUserById(It.IsAny<long>())).Returns(new User { Id = 1, AvatarId = 1 });
            _userService.Setup(w => w.IsExistUserName(It.IsAny<long>(), It.IsAny<string>())).Returns(true);
            var result = await _updateStudentPersonalInformationCommandHandler.Handle(_updateStudentPersonalInformationCommand, new CancellationToken());
            result.Success.Should().BeFalse();
        }
    }
}

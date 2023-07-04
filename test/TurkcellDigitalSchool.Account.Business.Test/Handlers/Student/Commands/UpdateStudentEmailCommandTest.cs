using Moq;
using NUnit.Framework;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using static TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands.UpdateStudentEmailCommand;
using FluentAssertions;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Account.Business.Services.Otp;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Student.Commands
{
    [TestFixture]
    public class UpdateStudentEmailCommandTest
    {
        private UpdateStudentEmailCommand _updateStudentEmailCommand;
        private UpdateStudentEmailCommandHandler _updateStudentEmailCommandHandler;

        //OTP geliştirmesi yazıldıktan sonra testi yazılacak.
        private Mock<IUserRepository> _userRepository;
        private Mock<IUserService> _userService;
        private Mock<ITokenHelper> _tokenHelper;
        private Mock<IOtpService> _otpService;

        [SetUp]
        public void Setup()
        {
            _userRepository = new Mock<IUserRepository>();
            _userService = new Mock<IUserService>();

            _updateStudentEmailCommand = new UpdateStudentEmailCommand();
            _updateStudentEmailCommandHandler = new UpdateStudentEmailCommandHandler(_userRepository.Object, _userService.Object, _tokenHelper.Object, _otpService.Object);
        }

        [Test]
        public async Task UpdateStudentEmailCommand_Success()
        {
            _updateStudentEmailCommand = new()
            {
                Email = "yusuf.daskin@turkcell.com.tr"
            };

            _userService.Setup(w => w.GetUserById(It.IsAny<long>())).Returns(new User { Id = 1, AvatarId = 1 });
            _userRepository.Setup(x => x.UpdateAndSave(It.IsAny<User>(), It.IsAny<int>(), It.IsAny<bool>()));
            var result = await _updateStudentEmailCommandHandler.Handle(_updateStudentEmailCommand, new CancellationToken());
            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task UpdateStudentEmailCommand_RecordDoesNotExist_Error()
        {
            _updateStudentEmailCommand = new()
            {
                Email = "yusuf.daskin@turkcell.com.tr"
            };

            _userService.Setup(w => w.GetUserById(It.IsAny<long>())).Returns((User)null);
            var result = await _updateStudentEmailCommandHandler.Handle(_updateStudentEmailCommand, new CancellationToken());
            result.Success.Should().BeFalse();
        }

        [Test]
        public async Task UpdateStudentEmailCommand_EnterDifferentEmail_Error()
        {
            _updateStudentEmailCommand = new()
            {
                Email = "yusuf.daskin@turkcell.com.tr"
            };

            var userInfo = new User
            {
                Id = 1,
                Email = "yusuf.daskin@turkcell.com.tr"
            };

            (_updateStudentEmailCommand.Email == userInfo.Email).Should().BeTrue("Bu Mail Adresine Ait Kayıtlı Hesap Bulunmaktadır.");

            var result = await _updateStudentEmailCommandHandler.Handle(_updateStudentEmailCommand, new CancellationToken());
            result.Success.Should().BeFalse();
        }

        [Test]
        public async Task UpdateStudentEmailCommand_ExistEmail_Error()
        {
            _updateStudentEmailCommand = new()
            {
                Email = "yusuf.daskin@turkcell.com.tr"
            };
            _userService.Setup(w => w.GetUserById(It.IsAny<long>())).Returns(new User { Id = 1, AvatarId = 1 });
            _userService.Setup(w => w.IsExistEmail(It.IsAny<long>(), It.IsAny<string>())).Returns(true);
            var result = await _updateStudentEmailCommandHandler.Handle(_updateStudentEmailCommand, new CancellationToken());
            result.Success.Should().BeFalse();
        }
    }
}

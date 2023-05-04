using MediatR;
using Microsoft.AspNetCore.Http;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using static TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands.UpdateStudentParentInformationCommand;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using static TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands.UpdateStudentPersonalInformationCommand;
using TurkcellDigitalSchool.Account.Business.Services.User;
using static TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands.UpdateStudentVerifyMobilPhoneCommand;
using FluentAssertions;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Student.Commands
{
    [TestFixture]
    public class UpdateStudentVerifyMobilPhoneCommandTest
    {
        //OTP geliştirmesi yazıldıktan sonra testi yazılacak.
        Mock<IUserRepository> _userRepository;
        Mock<IUserService> _userService;
        UpdateStudentVerifyMobilPhoneCommand _updateStudentVerifyMobilPhoneCommand;
        UpdateStudentVerifyMobilPhoneCommandHandler _updateStudentVerifyMobilPhoneCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;
        Mock<RedisService> _redisService;


        [SetUp]
        public void Setup()
        {
            _userRepository = new Mock<IUserRepository>();
            _userService = new Mock<IUserService>();

            _updateStudentVerifyMobilPhoneCommand = new UpdateStudentVerifyMobilPhoneCommand();
            _updateStudentVerifyMobilPhoneCommandHandler = new UpdateStudentVerifyMobilPhoneCommandHandler(_userRepository.Object, _userService.Object);

            _mediator = new Mock<IMediator>();
            _serviceProvider = new Mock<IServiceProvider>();
            _httpContextAccessor = new Mock<IHttpContextAccessor>();
            _httpContext = new Mock<HttpRequest>();
            _headerDictionary = new Mock<IHeaderDictionary>();
            _redisService = new Mock<RedisService>();

            _serviceProvider.Setup(x => x.GetService(typeof(IMediator))).Returns(_mediator.Object);
            ServiceTool.ServiceProvider = _serviceProvider.Object;
            _headerDictionary.Setup(x => x["Referer"]).Returns("");
            _httpContext.Setup(x => x.Headers).Returns(_headerDictionary.Object);
            _httpContextAccessor.Setup(x => x.HttpContext.Request).Returns(_httpContext.Object);
            _serviceProvider.Setup(x => x.GetService(typeof(IHttpContextAccessor))).Returns(_httpContextAccessor.Object);
            _serviceProvider.Setup(x => x.GetService(typeof(RedisService))).Returns(_redisService.Object);

        }



        [Test]
        public async Task UpdateStudentVerifyMobilPhoneCommand_Success()
        {
            _updateStudentVerifyMobilPhoneCommand = new()
            {
                UserId = 1,
            };

            _userService.Setup(w => w.GetUserById(It.IsAny<long>())).Returns(new User { Id = 1, AvatarId = 1 });
            _userRepository.Setup(x => x.UpdateAndSave(It.IsAny<User>(), It.IsAny<int>(), It.IsAny<bool>()));
            var result = await _updateStudentVerifyMobilPhoneCommandHandler.Handle(_updateStudentVerifyMobilPhoneCommand, new CancellationToken());
            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task UpdateStudentVerifyMobilPhoneCommand_RecordDoesNotExist_Error()
        {
            _updateStudentVerifyMobilPhoneCommand = new()
            {
                UserId = 1,
            };

            _userService.Setup(w => w.GetUserById(It.IsAny<long>())).Returns((User)null);
            var result = await _updateStudentVerifyMobilPhoneCommandHandler.Handle(_updateStudentVerifyMobilPhoneCommand, new CancellationToken());
            result.Success.Should().BeFalse();
        }

        

    }
}

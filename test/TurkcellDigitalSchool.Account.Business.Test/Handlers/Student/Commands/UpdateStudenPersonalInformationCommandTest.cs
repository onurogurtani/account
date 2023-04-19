﻿using MediatR;
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
using static TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands.UpdateStudentPersonalInformationCommand;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Account.Business.Services.User;
using FluentAssertions;
using System.Linq.Expressions;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Student.Commands
{
    [TestFixture]
    public class UpdateStudentPersonalInformationCommandTest
    {
        Mock<IUserRepository> _userRepository;
        Mock<IUserService> _userService;
        UpdateStudentPersonalInformationCommand _updateStudentPersonalInformationCommand;
        UpdateStudentPersonalInformationCommandHandler _updateStudentPersonalInformationCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;


        [SetUp]
        public void Setup()
        {
            _userRepository = new Mock<IUserRepository>();
            _userService = new Mock<IUserService>();

            _updateStudentPersonalInformationCommand = new UpdateStudentPersonalInformationCommand();
            _updateStudentPersonalInformationCommandHandler = new UpdateStudentPersonalInformationCommandHandler(_userRepository.Object, _userService.Object);

            _mediator = new Mock<IMediator>();
            _serviceProvider = new Mock<IServiceProvider>();
            _httpContextAccessor = new Mock<IHttpContextAccessor>();
            _httpContext = new Mock<HttpRequest>();
            _headerDictionary = new Mock<IHeaderDictionary>();

            _serviceProvider.Setup(x => x.GetService(typeof(IMediator))).Returns(_mediator.Object);
            ServiceTool.ServiceProvider = _serviceProvider.Object;
            _headerDictionary.Setup(x => x["Referer"]).Returns("");
            _httpContext.Setup(x => x.Headers).Returns(_headerDictionary.Object);
            _httpContextAccessor.Setup(x => x.HttpContext.Request).Returns(_httpContext.Object);
            _serviceProvider.Setup(x => x.GetService(typeof(IHttpContextAccessor))).Returns(_httpContextAccessor.Object);
        }

        [Test]
        public async Task UpdateStudentPersonalInformationCommand_Success()
        {
            // TODO Unittest generic mesaj yapısından ötürü çalışmıyor. tekrar test edielcek.
            _updateStudentPersonalInformationCommand = new()
            {
                UserId = 1,
                AvatarId = 1,
                MobilPhone = "",
                ResidenceCityId = 1,
                ResidenceCountyId = 1,
                UserName = "yadaskinn@gmail.com"

            };
            _userService.Setup(w => w.GetUserById(It.IsAny<long>())).Returns(new Entities.Concrete.Core.User { Id = 1, AvatarId = 1 });
            _userService.Setup(w => w.IsExistUserName(It.IsAny<long>(), It.IsAny<string>())).Returns(false);
            _userRepository.Setup(x => x.CreateAndSave(It.IsAny<Entities.Concrete.Core.User>(), It.IsAny<int>(), It.IsAny<bool>()));
            var result = await _updateStudentPersonalInformationCommandHandler.Handle(_updateStudentPersonalInformationCommand, new CancellationToken());
            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task UpdateStudentPersonalInformationCommand_RecordDoesNotExist_Error()
        {
            // TODO Unittest generic mesaj yapısından ötürü çalışmıyor. tekrar test edielcek.
            _updateStudentPersonalInformationCommand = new()
            {
                UserId = 1,
                AvatarId = 1,
                MobilPhone = "",
                ResidenceCityId = 1,
                ResidenceCountyId = 1,
                UserName = "yadaskinn@gmail.com"
            };
            _userService.Setup(w => w.GetUserById(It.IsAny<long>())).Returns((Entities.Concrete.Core.User)null);
            var result = await _updateStudentPersonalInformationCommandHandler.Handle(_updateStudentPersonalInformationCommand, new CancellationToken());
            result.Success.Should().BeFalse();
        }

        [Test]
        public async Task UpdateStudentPersonalInformationCommand_ExistUserName_Error()
        {
            // TODO Unittest generic mesaj yapısından ötürü çalışmıyor. tekrar test edielcek.
            _updateStudentPersonalInformationCommand = new()
            {
                UserId = 1,
                AvatarId = 1,
                MobilPhone = "",
                ResidenceCityId = 1,
                ResidenceCountyId = 1,
                UserName = "yadaskinn@gmail.com"
            };
            _userService.Setup(w => w.GetUserById(It.IsAny<long>())).Returns(new Entities.Concrete.Core.User { Id = 1, AvatarId = 1 });
            _userService.Setup(w => w.IsExistUserName(It.IsAny<long>(), It.IsAny<string>())).Returns(true);
            var result = await _updateStudentPersonalInformationCommandHandler.Handle(_updateStudentPersonalInformationCommand, new CancellationToken());
            result.Success.Should().BeFalse();
        }
    }
}

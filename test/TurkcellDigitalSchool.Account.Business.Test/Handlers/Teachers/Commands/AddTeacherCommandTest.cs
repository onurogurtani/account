using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using static TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands.AddTeacherCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Teachers.Commands
{
    [TestFixture]
    public class AddTeacherCommandTest
    {
        Mock<IUserRepository> _userRepository;

        AddTeacherCommand _addTeacherCommand;
        AddTeacherCommandHandler _addTeacherCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;

        List<User> _fakeUsers;

        [SetUp]
        public void Setup()
        {
            _userRepository = new Mock<IUserRepository>();

            _addTeacherCommand = new AddTeacherCommand();
            _addTeacherCommandHandler = new(_userRepository.Object);

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

            _fakeUsers = new List<User>
            {
                new User{
                    Id = 1,
                    UserName = "Ali",
                    SurName = "UnitTest",
                    Status = true,
                    ResidenceCounty = "County",
                    ResidenceCity = "City",
                    RemindLater = true,
                    RelatedIdentity = "UnitTest",
                    RegisterStatus = Core.Enums.RegisterStatus.Registered,
                    AddingType = UserAddingType.Default,
                    Address = "Adres",
                    AdminTypeEnum = Core.Enums.AdminTypeEnum.Admin,
                    CitizenId = 12345676787,
                    Email = "email@hotmail.com",
                    MobilePhones = "5554443322",
                    UserTypeEnum = Core.Enums.UserTypeEnum.Teacher,
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

            _userRepository.Verify(x => x.SaveChangesAsync());
            result.Success.Should().BeTrue();
            result.Message.Should().Be(Messages.Added);
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
            result.Message.Should().Be(Messages.CitizenIdAlreadyExist);
        }


    }

}


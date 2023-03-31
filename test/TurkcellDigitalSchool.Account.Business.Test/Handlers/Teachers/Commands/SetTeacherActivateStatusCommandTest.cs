using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using static TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands.SetTeacherActivateStatusCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Teachers.Commands
{
    [TestFixture]
    public class SetTeacherActivateStatusCommandTest
    {
        SetTeacherActivateStatusCommand _setTeacherActivateStatusCommand;
        SetTeacherActivateStatusCommandHandler _setTeacherActivateStatusCommandHandler;

        Mock<IUserRepository> _userRepository;

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

            _setTeacherActivateStatusCommand = new SetTeacherActivateStatusCommand();
            _setTeacherActivateStatusCommandHandler = new SetTeacherActivateStatusCommandHandler(_userRepository.Object);

            _mediator = new Mock<IMediator>();
            _serviceProvider = new Mock<IServiceProvider>();
            _serviceProvider.Setup(x => x.GetService(typeof(IMediator))).Returns(_mediator.Object);
            ServiceTool.ServiceProvider = _serviceProvider.Object;
            _httpContextAccessor = new Mock<IHttpContextAccessor>();
            _httpContext = new Mock<HttpRequest>();
            _headerDictionary = new Mock<IHeaderDictionary>();
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
                },
                new User{
                    Id = 2,
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
                    CitizenId = 12345676789,
                    Email = "email2@hotmail.com",
                    MobilePhones = "5554443321",
                    UserTypeEnum = Core.Enums.UserTypeEnum.Student,
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

            _userRepository.Verify(x => x.SaveChangesAsync());
            result.Success.Should().BeTrue();
            result.Message.Should().Be(Messages.SuccessfulOperation);
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
            result.Message.Should().Be(Account.Business.Constants.Messages.UserIsNotTeacher);
        }

    }

}


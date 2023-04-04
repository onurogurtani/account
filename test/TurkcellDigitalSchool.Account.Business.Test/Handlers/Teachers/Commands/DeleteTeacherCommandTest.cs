using FluentAssertions;
using Flurl.Http.Content;
using MediatR;
using Microsoft.AspNetCore.Http;
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
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using static TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands.DeleteTeacherCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Teachers.Commands
{
    [TestFixture]
    public class DeleteTeacherCommandTest
    {
        Mock<IUserRepository> _userRepository;
        Mock<IOrganisationUserRepository> _organisationUserRepository;

        DeleteTeacherCommand _deleteTeacherCommand;
        DeleteTeacherCommandHandler _deleteTeacherCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;

        List<OrganisationUser> _fakeOrganisationUsers;
        List<User> _fakeUsers;

        [SetUp]
        public void Setup()
        {
            _userRepository = new Mock<IUserRepository>();
            _organisationUserRepository = new Mock<IOrganisationUserRepository>();

            _deleteTeacherCommand = new DeleteTeacherCommand();
            _deleteTeacherCommandHandler = new(_userRepository.Object, _organisationUserRepository.Object);

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

            _organisationUserRepository.Verify(x => x.SaveChangesAsync());

            result.Success.Should().BeTrue();
            result.Message.Should().Be(Messages.SuccessfulOperation);
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
            result.Message.Should().Be(Messages.RecordDoesNotExist);
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

            _organisationUserRepository.Verify(x => x.SaveChangesAsync());

            result.Success.Should().BeFalse();
            result.Message.Should().Be(Messages.RecordDoesNotExist);
        }


    }

}


using AutoMapper;
using FluentAssertions;
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
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using static TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands.DeleteTeacherCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Teachers.Commands
{
    [TestFixture]
    public class DeleteTeacherCommandTest
    {
        DeleteTeacherCommand _deleteTeacherCommand;
        DeleteTeacherCommandHandler _deleteTeacherCommandHandler;

        Mock<IUserRepository> _userRepository;
        Mock<IOrganisationUserRepository> _organisationUserRepository;

        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpRequest;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IServiceProvider> _serviceProvider;
        Mock<IMediator> _mediator;
        Mock<IMapper> _mapper;
        Mock<RedisService> _redisService;

        List<OrganisationUser> _fakeOrganisationUsers;
        List<User> _fakeUsers;

        [SetUp]
        public void Setup()
        {
            _mediator = new Mock<IMediator>();
            _serviceProvider = new Mock<IServiceProvider>();
            _httpContextAccessor = new Mock<IHttpContextAccessor>();
            _httpRequest = new Mock<HttpRequest>();
            _headerDictionary = new Mock<IHeaderDictionary>();
            _mapper = new Mock<IMapper>();
            _redisService = new Mock<RedisService>();

            _serviceProvider.Setup(x => x.GetService(typeof(IMediator))).Returns(_mediator.Object);
            ServiceTool.ServiceProvider = _serviceProvider.Object;
            _headerDictionary.Setup(x => x["Referer"]).Returns("");
            _httpRequest.Setup(x => x.Headers).Returns(_headerDictionary.Object);
            _httpContextAccessor.Setup(x => x.HttpContext.Request).Returns(_httpRequest.Object);
            _serviceProvider.Setup(x => x.GetService(typeof(IHttpContextAccessor))).Returns(_httpContextAccessor.Object);
            _serviceProvider.Setup(x => x.GetService(typeof(RedisService))).Returns(_redisService.Object);

            _userRepository = new Mock<IUserRepository>();
            _organisationUserRepository = new Mock<IOrganisationUserRepository>();

            _deleteTeacherCommand = new DeleteTeacherCommand();
            _deleteTeacherCommandHandler = new(_userRepository.Object, _organisationUserRepository.Object);

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

            result.Success.Should().BeTrue();
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

            result.Success.Should().BeFalse();
        }
    }
}


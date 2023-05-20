using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using static TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands.UpdateTeacherCommand;


namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Teachers.Commands
{
    [TestFixture]
    public class UpdateTeacherCommandTest
    {
        UpdateTeacherCommand _updateTeacherCommand;
        UpdateTeacherCommandHandler _updateTeacherCommandHandler;

        Mock<IUserRepository> _userRepository;

        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpRequest;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IServiceProvider> _serviceProvider;
        Mock<IMediator> _mediator;
        Mock<IMapper> _mapper;
        Mock<RedisService> _redisService;

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

            _updateTeacherCommand = new UpdateTeacherCommand();
            _updateTeacherCommandHandler = new(_userRepository.Object);

            _fakeUsers = new List<User>
            {
                new User{
                    Id = 1,
                    UserName = "Ali",
                    SurName = "UnitTest",
                    Status = true,
                    ResidenceCountyId = 1, ResidenceCityId = 1,
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
                },
                new User{
                    Id = 2,
                    UserName = "Ali",
                    SurName = "UnitTest",
                    Status = true,
                    ResidenceCountyId = 1, ResidenceCityId = 1,
                    RemindLater = true,
                    RelatedIdentity = "UnitTest",
                    RegisterStatus = RegisterStatus.Registered,
                    AddingType = UserAddingType.Default,
                    Address = "Adres",
                    UserType = UserType.Student,
                    CitizenId = 12345676789,
                    Email = "email2@hotmail.com",
                    MobilePhones = "5554443321",
                    IsDeleted = false
                },
            };
        }

        [Test]
        public async Task UpdateTeacherCommand_Success()
        {
            _updateTeacherCommand = new()
            {
                Id = 1,
                Name = "TestUpdate",
                SurName = "UnitTestUpdate",
                Email = "email@hotmail.com",
                CitizenId = 123321123457,
                MobilePhones = "5554443324",
            };

            _userRepository.Setup(x => x.Query()).Returns(_fakeUsers.AsQueryable().BuildMock());
            _userRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<User, bool>>>())).ReturnsAsync(_fakeUsers.Where(q => q.Id == 1).FirstOrDefault());
            _userRepository.Setup(x => x.Update(It.IsAny<User>())).Returns(new User());

            var result = await _updateTeacherCommandHandler.Handle(_updateTeacherCommand, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task UpdateTeacherCommand_Teacher_Entity_Null()
        {
            _updateTeacherCommand = new()
            {
                Id = 3,
                Name = "",
                SurName = "Test",
                Email = null,
                CitizenId = 123321123456,
                MobilePhones = "5554443323",
            };

            _userRepository.Setup(x => x.Query()).Returns(_fakeUsers.AsQueryable().BuildMock());
            _userRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<User, bool>>>())).ReturnsAsync(_fakeUsers.Where(q => q.Id == 3).FirstOrDefault());
            _userRepository.Setup(x => x.Update(It.IsAny<User>())).Returns(new User());

            var result = await _updateTeacherCommandHandler.Handle(_updateTeacherCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }

        [Test]
        public async Task UpdateTeacherCommand_Teacher_CitizenId_Exist()
        {
            _updateTeacherCommand = new()
            {
                Id = 1,
                Name = "",
                SurName = "Test",
                Email = null,
                CitizenId = 12345676789,
                MobilePhones = "5554443323",
            };

            _userRepository.Setup(x => x.Query()).Returns(_fakeUsers.AsQueryable().BuildMock());
            _userRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<User, bool>>>())).ReturnsAsync(_fakeUsers.Where(q => q.Id == 1).FirstOrDefault());
            _userRepository.Setup(x => x.Update(It.IsAny<User>())).Returns(new User());

            var result = await _updateTeacherCommandHandler.Handle(_updateTeacherCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }

        [Test]
        public async Task UpdateTeacherCommand_RecordDoesNotExist_Teacher()
        {
            _updateTeacherCommand = new()
            {
                Id = 2,
                Name = "Ali",
                SurName = "Test",
                Email = "update@hotmail.com",
                CitizenId = 12345676782,
                MobilePhones = "5554443321",
            };

            _userRepository.Setup(x => x.Query()).Returns(_fakeUsers.AsQueryable().BuildMock());
            _userRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<User, bool>>>())).ReturnsAsync(_fakeUsers.Where(q => q.Id == 3).FirstOrDefault());
            _userRepository.Setup(x => x.Update(It.IsAny<User>())).Returns(new User());

            var result = await _updateTeacherCommandHandler.Handle(_updateTeacherCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }

        [Test]
        public async Task UpdateTeacherCommand_Not_Teacher()
        {
            _updateTeacherCommand = new()
            {
                Id = 2,
                Name = "",
                SurName = "Test",
                Email = null,
                CitizenId = 12345676782,
                MobilePhones = "5554443321",
            };

            _userRepository.Setup(x => x.Query()).Returns(_fakeUsers.AsQueryable().BuildMock());
            _userRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<User, bool>>>())).ReturnsAsync(_fakeUsers.Where(q => q.Id == 2).FirstOrDefault());
            _userRepository.Setup(x => x.Update(It.IsAny<User>())).Returns(new User());

            var result = await _updateTeacherCommandHandler.Handle(_updateTeacherCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }
    }
}


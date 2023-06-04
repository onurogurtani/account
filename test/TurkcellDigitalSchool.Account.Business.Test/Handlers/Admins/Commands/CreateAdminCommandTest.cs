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
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using DotNetCore.CAP;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Admins.Commands
{
    [TestFixture]
    public class CreateAdminCommandTest
    {
        private CreateAdminCommand _createAdminCommand;
        private CreateAdminCommand.CreateAdminCommandHandler _createAdminCommandHandler;

        private Mock<IUserRepository> _userRepository;
        private Mock<IUserRoleRepository> _userRoleRepository;
        private Mock<ITokenHelper> _tokenHelper;
        private Mock<ICapPublisher> _capPublisher;

        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpRequest;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IServiceProvider> _serviceProvider;
        Mock<IMediator> _mediator;
        Mock<IMapper> _mapper;
        Mock<RedisService> _redisService;

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

            _tokenHelper = new Mock<ITokenHelper>();
            _userRepository = new Mock<IUserRepository>();
            _userRoleRepository = new Mock<IUserRoleRepository>();
            _capPublisher = new Mock<ICapPublisher>();

            _createAdminCommand = new CreateAdminCommand();
            _createAdminCommandHandler = new CreateAdminCommand.CreateAdminCommandHandler(_userRoleRepository.Object, _userRepository.Object, _tokenHelper.Object, _mapper.Object, _capPublisher.Object);
        }

        [Test]
        public async Task CreateAdminCommand_Success()
        {
            _createAdminCommand = new()
            {
                Admin = new CreateUpdateAdminDto
                {
                    Id = 0,
                    Name = "Test",
                    CitizenId = "11111111111",
                    Email = "test@test.com",
                    MobilePhones = "1111111111",
                    RoleIds = new List<long>(),

                }
            };
            var users = new List<User>
            {
                new User{Id = 0, UserType = UserType.Admin }
            };

            _userRepository.Setup(x => x.Query()).Returns(users.AsQueryable().BuildMock());
            _userRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<User, bool>>>())).ReturnsAsync(users[0]);
            _userRepository.Setup(x => x.Update(It.IsAny<User>())).Returns(new User());
            _mapper.Setup(x => x.Map<CreateUpdateAdminDto, User>(_createAdminCommand.Admin)).Returns(users[0]);

            var result = await _createAdminCommandHandler.Handle(_createAdminCommand, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task CreateAdminCommand_Not_Success()
        {
            _createAdminCommand = new()
            {
                Admin = new CreateUpdateAdminDto
                {
                    Id = 0,
                    Name = "Test",
                    CitizenId = "11111111111",
                    Email = "test@test.com",
                    MobilePhones = "1111111111",
                    RoleIds = new List<long>(),

                }
            };
            var users = new List<User>
            {
                new User{Id = 1}
            };

            _userRepository.Setup(x => x.Query()).Returns(users.AsQueryable().BuildMock());
            _userRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<User, bool>>>())).ReturnsAsync(users[0]);
            _userRepository.Setup(x => x.Update(It.IsAny<User>())).Returns(new User());
            _mapper.Setup(x => x.Map<CreateUpdateAdminDto, User>(_createAdminCommand.Admin)).Returns(users[0]);

            var result = await _createAdminCommandHandler.Handle(_createAdminCommand, CancellationToken.None);
            result.Success.Should().BeFalse();
        }
    }
}

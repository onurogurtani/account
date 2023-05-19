using AutoMapper;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Moq;
using NUnit.Framework;
using System;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using static TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands.DeleteAdminCommand;
using System.Collections.Generic;
using System.Linq.Expressions;
using TurkcellDigitalSchool.Core.Enums;
using System.Linq;
using MockQueryable.Moq;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Admins.Commands
{
    [TestFixture]
    public class DeleteAdminCommandTest
    {
        private DeleteAdminCommand _deleteAdminCommand;
        private DeleteAdminCommandHandler _deleteAdminCommandHandler;

        private Mock<IUserRepository> _userRepository;

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

            _userRepository = new Mock<IUserRepository>();
            _deleteAdminCommand = new DeleteAdminCommand();
            _deleteAdminCommandHandler = new DeleteAdminCommandHandler(_userRepository.Object);
        }

        [Test]
        public async Task DeleteAdminCommand_Success()
        {
            _deleteAdminCommand = new DeleteAdminCommand { Id = 1 };
            var users = new List<User>
            {
                new User{Id = 1, UserType = UserType.Admin }
            };

            _userRepository.Setup(x => x.Query()).Returns(users.AsQueryable().BuildMock());
            _userRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<User, bool>>>())).ReturnsAsync(users[0]);
            _userRepository.Setup(x => x.Update(It.IsAny<User>())).Returns(new User());

            var result = await _deleteAdminCommandHandler.Handle(_deleteAdminCommand, CancellationToken.None);
            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task DeleteAdminCommand_Not_Success()
        {
            var result = await _deleteAdminCommandHandler.Handle(_deleteAdminCommand, CancellationToken.None);
            result.Success.Should().BeFalse();
        }
    }
}

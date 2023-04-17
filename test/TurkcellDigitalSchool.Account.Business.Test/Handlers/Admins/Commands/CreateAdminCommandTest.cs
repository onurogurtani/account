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
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Entities.Dtos.Admin;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using static TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands.CreateAdminCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Admins.Commands
{
    [TestFixture]
    public class CreateAdminCommandTest
    {
        private CreateAdminCommand _createAdminCommand;
        private CreateAdminCommandHandler _createAdminCommandHandler;


        private Mock<IUserRepository> _userRepository;
        private Mock<IUserRoleRepository> _userRoleRepository;

        private Mock<ITokenHelper> _tokenHelper;


        Mock<IMediator> _mediator;        
        Mock<IMapper> _mapper;

        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpRequest;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IServiceProvider> _serviceProvider;

        [SetUp]
        public void Setup()
        {
          
            _mediator = new Mock<IMediator>();
            _mapper = new Mock<IMapper>();
            
            _headerDictionary = new Mock<IHeaderDictionary>();
            _headerDictionary.Setup(x => x["Referer"]).Returns("");
            _httpRequest = new Mock<HttpRequest>();
            _httpRequest.Setup(x => x.Headers).Returns(_headerDictionary.Object);
            
            _httpContextAccessor = new Mock<IHttpContextAccessor>();
            _httpContextAccessor.Setup(x => x.HttpContext.Request).Returns(_httpRequest.Object);
            
            _serviceProvider = new Mock<IServiceProvider>();
            _serviceProvider.Setup(x => x.GetService(typeof(IHttpContextAccessor))).Returns(_httpContextAccessor.Object);
            _serviceProvider.Setup(x => x.GetService(typeof(IMediator))).Returns(_mediator.Object);
            ServiceTool.ServiceProvider = _serviceProvider.Object;

            _tokenHelper = new Mock<ITokenHelper>();
            _userRepository = new Mock<IUserRepository>();
            _userRoleRepository = new Mock<IUserRoleRepository>();

            _createAdminCommand = new CreateAdminCommand();
            _createAdminCommandHandler = new CreateAdminCommandHandler(_userRoleRepository.Object, _userRepository.Object, _tokenHelper.Object, _mapper.Object );
        }

        [Test]
        public async Task CreateAdminCommand_Success()
        {
            _createAdminCommand = new()
            {
                Admin = new Entities.Dtos.Admin.CreateUpdateAdminDto
                {
                    Id = 0,
                    Name = "Test",
                    CitizenId = "11111111111",
                    Email = "test@test.com",
                    MobilePhones = "1111111111" ,
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
                Admin = new Entities.Dtos.Admin.CreateUpdateAdminDto
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

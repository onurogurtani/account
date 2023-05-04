using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.UserBasketPackages.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt; 

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.UserBasketPackages.Commands
{
    [TestFixture]

    public class DeleteUserBasketPackageCommandTest
    {
        Mock<IUserBasketPackageRepository> _userBasketPackageRepository;
        Mock<ITokenHelper> _tokenHelper;

        private DeleteUserBasketPackageCommand _deleteUserBasketPackageCommand;
        private DeleteUserBasketPackageCommand.DeleteUserBasketPackageCommandHandler _deleteUserBasketPackageCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;


        [SetUp]
        public void Setup()
        {
            _userBasketPackageRepository = new Mock<IUserBasketPackageRepository>();
            _tokenHelper = new Mock<ITokenHelper>();

            _deleteUserBasketPackageCommand = new DeleteUserBasketPackageCommand();
            _deleteUserBasketPackageCommandHandler = new(_userBasketPackageRepository.Object, _tokenHelper.Object);

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
        }


        [Test]

        public async Task DeleteUserBasketPackageCommand_Success()
        {
            _deleteUserBasketPackageCommand.Id = 1;

            var userBasketPackages = new List<UserBasketPackage>
            {
                new UserBasketPackage{
                    Id = 0,
                    InsertUserId= 1,
                    PackageId= 1,
                    Package = new Package{ Id=1,},
                    Quantity=1,
                    UserId=1,
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                }
            };

            _tokenHelper.Setup(x => x.GetUserIdByCurrentToken()).Returns(1);

            _userBasketPackageRepository.Setup(x => x.Query()).Returns(userBasketPackages.AsQueryable().BuildMock());
            _userBasketPackageRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<UserBasketPackage, bool>>>())).ReturnsAsync(new UserBasketPackage());
            _userBasketPackageRepository.Setup(x => x.Delete(It.IsAny<UserBasketPackage>()));

            var result = await _deleteUserBasketPackageCommandHandler.Handle(_deleteUserBasketPackageCommand, new CancellationToken());

            result.Success.Should().BeTrue();

        }

      
        [Test]
        public async Task DeleteUserBasketPackageCommand_EntityNull_Error()
        {
            _deleteUserBasketPackageCommand.Id = 1;


            var userBasketPackages = new List<UserBasketPackage>
            {
                new UserBasketPackage{Id = 1, UserId=1 },
            };

            _tokenHelper.Setup(x => x.GetUserIdByCurrentToken()).Returns(1);

            _userBasketPackageRepository.Setup(x => x.Query()).Returns(userBasketPackages.AsQueryable().BuildMock());
            _userBasketPackageRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<UserBasketPackage, bool>>>())).ReturnsAsync(() => null);

            var result = await _deleteUserBasketPackageCommandHandler.Handle(_deleteUserBasketPackageCommand, new CancellationToken());

            result.Success.Should().BeFalse();

        }

    }
}


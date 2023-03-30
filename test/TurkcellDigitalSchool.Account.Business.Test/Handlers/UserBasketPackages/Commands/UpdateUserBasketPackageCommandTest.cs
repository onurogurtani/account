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
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Entities.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.UserBasketPackages.Commands.UpdateUserBasketPackageCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.UserBasketPackages.Commands
{
    [TestFixture]

    public class UpdateUserBasketPackageCommandTest
    {
        Mock<IUserBasketPackageRepository> _userBasketPackageRepository;
        Mock<ITokenHelper> _tokenHelper;

        private UpdateUserBasketPackageCommand _updateUserBasketPackageCommand;
        private UpdateUserBasketPackageCommandHandler _updateUserBasketPackageCommandHandler;

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

            _updateUserBasketPackageCommand = new UpdateUserBasketPackageCommand();
            _updateUserBasketPackageCommandHandler = new(_userBasketPackageRepository.Object, _tokenHelper.Object);

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

        public async Task UpdateUserBasketPackageCommand_Success()
        {
            _updateUserBasketPackageCommand = new UpdateUserBasketPackageCommand { Id=1, Quantity = 1 };

            var userBasketPackages = new List<UserBasketPackage>
            {
                new UserBasketPackage{
                    Id = 1,
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
            _userBasketPackageRepository.Setup(x => x.Update(It.IsAny<UserBasketPackage>())).Returns(new UserBasketPackage());

            var result = await _updateUserBasketPackageCommandHandler.Handle(_updateUserBasketPackageCommand, new CancellationToken());

            result.Success.Should().BeTrue();

        }

        [Test]
        public async Task UpdateUserBasketPackageCommand_EntityNull_Error()
        {
            _updateUserBasketPackageCommand = new UpdateUserBasketPackageCommand { Id = 1, Quantity = 1 };


            var userBasketPackages = new List<UserBasketPackage>
            {
                new UserBasketPackage{Id = 1, UserId=1 },
            };

            _tokenHelper.Setup(x => x.GetUserIdByCurrentToken()).Returns(1);

            _userBasketPackageRepository.Setup(x => x.Query()).Returns(userBasketPackages.AsQueryable().BuildMock());
            _userBasketPackageRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<UserBasketPackage, bool>>>())).ReturnsAsync(() => null);

            var result = await _updateUserBasketPackageCommandHandler.Handle(_updateUserBasketPackageCommand, new CancellationToken());

            result.Success.Should().BeFalse();

        }



    }
}


using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.UserBasketPackages.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using static TurkcellDigitalSchool.Account.Business.Handlers.UserBasketPackages.Commands.CreateUserBasketPackageCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.UserBasketPackages.Commands
{
    [TestFixture]

    public class CreateUserBasketPackageCommandTest
    {
        private CreateUserBasketPackageCommand _createUserBasketPackageCommand;
        private CreateUserBasketPackageCommandHandler _createUserBasketPackageCommandHandler;

        private Mock<IUserBasketPackageRepository> _userBasketPackageRepository;
        private Mock<ITokenHelper> _tokenHelper;

        [SetUp]
        public void Setup()
        {
            _userBasketPackageRepository = new Mock<IUserBasketPackageRepository>();
            _tokenHelper = new Mock<ITokenHelper>();

            _createUserBasketPackageCommand = new CreateUserBasketPackageCommand();
            _createUserBasketPackageCommandHandler = new(_userBasketPackageRepository.Object, _tokenHelper.Object);
        }

        [Test]
        public async Task CreateUserBasketPackageCommand_Success()
        {
            _createUserBasketPackageCommand.PackageId = 1;

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
            _userBasketPackageRepository.Setup(x => x.Add(It.IsAny<UserBasketPackage>())).Returns(new UserBasketPackage());

            var result = await _createUserBasketPackageCommandHandler.Handle(_createUserBasketPackageCommand, new CancellationToken());

            result.Success.Should().BeTrue();
        }
    }
}


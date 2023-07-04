using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands.CreatePackageTypeCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.PackageTypes.Commands
{
    [TestFixture]

    public class CreateTargetScreenCommandTest
    {
        private CreatePackageTypeCommand _createPackageTypeCommand;
        private CreatePackageTypeCommandHandler _createPackageTypeCommandHandler;

        private Mock<IPackageTypeRepository> _packageTypeRepository;

        [SetUp]
        public void Setup()
        {
            _packageTypeRepository = new Mock<IPackageTypeRepository>();

            _createPackageTypeCommand = new CreatePackageTypeCommand();
            _createPackageTypeCommandHandler = new(_packageTypeRepository.Object);
        }


        [Test]

        public async Task CreatePackageTypeCommand_Success()
        {
            _createPackageTypeCommand = new()
            {
                PackageType = new()
                {
                    Id = 0,
                    IsCanSeeTargetScreen = true,
                    InsertUserId = 1,
                    IsActive = true,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId = 1,
                    UpdateTime = DateTime.Now,

                },
            };

            var pagetypes = new List<PackageType>
            {
                new PackageType{
                    Id = 0,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen = true,
                }
            };

            _packageTypeRepository.Setup(x => x.Query()).Returns(pagetypes.AsQueryable().BuildMock());
            _packageTypeRepository.Setup(x => x.Add(It.IsAny<PackageType>())).Returns(new PackageType());

            var result = await _createPackageTypeCommandHandler.Handle(_createPackageTypeCommand, new CancellationToken());

            result.Success.Should().BeTrue();
        }
    }
}


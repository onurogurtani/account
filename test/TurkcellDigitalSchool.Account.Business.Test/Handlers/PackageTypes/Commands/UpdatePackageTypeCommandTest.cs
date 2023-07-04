using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands.UpdatePackageTypeCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.PackageTypes.Commands
{
    [TestFixture]

    public class UpdateTargetScreenCommandTest
    {
        private UpdatePackageTypeCommand _updatePackageTypeCommand;
        private UpdatePackageTypeCommandHandler _updatePackageTypeCommandHandler;

        private Mock<IPackageTypeRepository> _packageTypeRepository;
        private Mock<IPackageTypeTargetScreenRepository> _packageTypeTargetScreenRepository;

        [SetUp]
        public void Setup()
        {
            _packageTypeRepository = new Mock<IPackageTypeRepository>();
            _packageTypeTargetScreenRepository = new Mock<IPackageTypeTargetScreenRepository>();

            _updatePackageTypeCommand = new UpdatePackageTypeCommand();
            _updatePackageTypeCommandHandler = new(_packageTypeRepository.Object, _packageTypeTargetScreenRepository.Object);
        }

        [Test]
        public async Task UpdatePackageTypeCommand_Success()
        {
            _updatePackageTypeCommand = new()
            {
                PackageType = new()
                {
                    Id = 2,
                    InsertUserId = 1,
                    IsActive = true,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId = 1,
                    UpdateTime = DateTime.Now,
                    IsCanSeeTargetScreen = true
                },
            };

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen= true
                }

            };
            var pageTypeTargetScreen = new List<PackageTypeTargetScreen>
            {
                new PackageTypeTargetScreen{

                    Id = 1,
                    InsertUserId= 1,
                    PackageType=new PackageType{ Id=3, InsertUserId=1, Name="Test"},
                    PackageTypeId=3,
                    TargetScreenId=1,
                    TargetScreen=new TargetScreen{ Id=1, },
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                }

            };

            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());
            _packageTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<PackageType, bool>>>())).ReturnsAsync(_updatePackageTypeCommand.PackageType);

            _packageTypeTargetScreenRepository.Setup(x => x.Query()).Returns(pageTypeTargetScreen.AsQueryable().BuildMock());
            _packageTypeTargetScreenRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<PackageTypeTargetScreen, bool>>>())).ReturnsAsync(pageTypeTargetScreen);
            _packageTypeRepository.Setup(x => x.Update(It.IsAny<PackageType>())).Returns(new PackageType());

            var result = await _updatePackageTypeCommandHandler.Handle(_updatePackageTypeCommand, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task UpdatePackageTypeCommand_EntityNull_Error()
        {
            _updatePackageTypeCommand = new()
            {
                PackageType = new()
                {
                    Id = 1,
                    InsertUserId = 1,
                    IsActive = true,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId = 1,
                    UpdateTime = DateTime.Now,
                    IsCanSeeTargetScreen = true
                },
            };

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen= true
                }

            };

            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());
            _packageTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<PackageType, bool>>>())).ReturnsAsync(() => null);

            var result = await _updatePackageTypeCommandHandler.Handle(_updatePackageTypeCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }
    }
}


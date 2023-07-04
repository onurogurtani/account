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
using static TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands.DeletePackageTypeCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.PackageTypes.Commands
{
    [TestFixture]

    public class DeleteTargetScreenCommandTest
    {
        private DeletePackageTypeCommand _deletePackageTypeCommand;
        private DeletePackageTypeCommandHandler _deletePackageTypeCommandHandler;

        private Mock<IPackageTypeRepository> _packageTypeRepository;

        [SetUp]
        public void Setup()
        {
            _packageTypeRepository = new Mock<IPackageTypeRepository>();

            _deletePackageTypeCommand = new DeletePackageTypeCommand();
            _deletePackageTypeCommandHandler = new(_packageTypeRepository.Object);
        }

        [Test]

        public async Task DeletePackageTypeCommand_Success()
        {
            _deletePackageTypeCommand.Id = 1;

            var packageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now
                }
            };

            _packageTypeRepository.Setup(x => x.Query()).Returns(packageTypes.AsQueryable().BuildMock());
            _packageTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<PackageType, bool>>>())).ReturnsAsync(new PackageType());
            _packageTypeRepository.Setup(x => x.Delete(It.IsAny<PackageType>()));

            var result = await _deletePackageTypeCommandHandler.Handle(_deletePackageTypeCommand, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task DeletePackageTypeCommand_EntityNull_Error()
        {
            _deletePackageTypeCommand.Id = 1;


            var packageTypes = new List<PackageType>
            {
                new PackageType{Id = 1, Name="Test", IsActive=true },
            };

            _packageTypeRepository.Setup(x => x.Query()).Returns(packageTypes.AsQueryable().BuildMock());
            _packageTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<PackageType, bool>>>())).ReturnsAsync(() => null);

            var result = await _deletePackageTypeCommandHandler.Handle(_deletePackageTypeCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }
    }
}


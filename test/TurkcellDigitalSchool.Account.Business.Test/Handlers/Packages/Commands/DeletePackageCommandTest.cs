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
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands.DeletePackageCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Packages.Commands
{
    [TestFixture]

    public class DeletePackageCommandTest
    {
        private DeletePackageCommand _deletePackageCommand;
        private DeletePackageCommandHandler _deletePackageCommandHandler;

        private Mock<IPackageRepository> _packageRepository;

        [SetUp]
        public void Setup()
        {
            _packageRepository = new Mock<IPackageRepository>();

            _deletePackageCommand = new DeletePackageCommand();
            _deletePackageCommandHandler = new DeletePackageCommandHandler(_packageRepository.Object);
        }

        [Test]

        public async Task DeletePackageCommand_Success()
        {
            _deletePackageCommand.Id = 1;

            var pages = new List<Package>
            {
                new Package{
                    Id = 1,
                    FinishDate= DateTime.Now,
                    HasCoachService= false,
                    HasMotivationEvent= false,
                    HasTryingTest= false,
                    InsertUserId= 1,
                    IsActive= true,
                    TryingTestQuestionCount= 0,
                    StartDate= DateTime.Now,
                    Name = "Deneme",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                    Summary= "Deneme",
                    Content= "Deneme",
                    EducationYearId = 1,
                },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pages.AsQueryable().BuildMock());
            _packageRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Package, bool>>>())).ReturnsAsync(new Package());
            _packageRepository.Setup(x => x.Delete(It.IsAny<Package>()));

            var result = await _deletePackageCommandHandler.Handle(_deletePackageCommand, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task DeletePackageCommand_EntityNull_Error()
        {
            _deletePackageCommand.Id = 1;


            var pages = new List<Package>
            {
                new Package{Id = 1, Name="Test", IsActive=true },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pages.AsQueryable().BuildMock());
            _packageRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Package, bool>>>())).ReturnsAsync(() => null);

            var result = await _deletePackageCommandHandler.Handle(_deletePackageCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }
    }
}


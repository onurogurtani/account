using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MediatR;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands.CreatePackageCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Packages.Commands
{
    [TestFixture]

    public class CreatePackageCommandTest
    {
        private CreatePackageCommand _createPackageCommand;
        private CreatePackageCommandHandler _createPackageCommandHandler;

        private Mock<IPackageRepository> _packageRepository;
        private Mock<IMediator> _mediator;

        [SetUp]
        public void Setup()
        {
            _mediator = new Mock<IMediator>();
            _packageRepository = new Mock<IPackageRepository>();

            _createPackageCommand = new CreatePackageCommand();
            _createPackageCommandHandler = new CreatePackageCommandHandler(_packageRepository.Object, _mediator.Object);
        }

        [Test]

        public async Task CreatePackageCommand_Success()
        {
            _createPackageCommand = new()
            {
                Package = new()
                {
                    Id = 0,
                    FinishDate = DateTime.Now,
                    HasCoachService = false,
                    HasMotivationEvent = false,
                    HasTryingTest = false,
                    InsertUserId = 1,
                    IsActive = true,
                    TryingTestQuestionCount = 0,
                    StartDate = DateTime.Now,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId = 1,
                    UpdateTime = DateTime.Now,
                    Summary = "Test",
                    Content = "Test",
                    EducationYearId = 1,
                },
            };

            var pages = new List<Package>
            {
                new Package{
                    Id = 0, FinishDate= DateTime.Now,
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
            _packageRepository.Setup(x => x.Add(It.IsAny<Package>())).Returns(new Package());

            var result = await _createPackageCommandHandler.Handle(_createPackageCommand, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task CreatePackageCommand_ExistName_Error()
        {
            _createPackageCommand = new()
            {
                Package = new()
                {
                    Id = 0,
                    FinishDate = DateTime.Now,
                    HasCoachService = false,
                    HasMotivationEvent = false,
                    HasTryingTest = false,
                    InsertUserId = 1,
                    IsActive = true,
                    TryingTestQuestionCount = 0,
                    StartDate = DateTime.Now,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId = 1,
                    UpdateTime = DateTime.Now,
                    Summary = "Test",
                    Content = "Test",
                    EducationYearId = 1,
                },
            };

            var pages = new List<Package>
            {
                new Package{Id = 1, Name="Test", IsActive=true },
            };

            _packageRepository.Setup(x => x.Query()).Returns(pages.AsQueryable().BuildMock());
            _packageRepository.Setup(x => x.Add(It.IsAny<Package>())).Returns(new Package());

            var result = await _createPackageCommandHandler.Handle(_createPackageCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }
    }
}


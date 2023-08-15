using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DotNetCore.CAP;
using FluentAssertions;
using MediatR;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using static TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands.UpdateOrganisationCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Organisations.Commands
{
    [TestFixture]

    public class UpdateOrganisationCommandTest
    {
        private UpdateOrganisationCommand _UpdateOrganisationCommand;
        private UpdateOrganisationCommandHandler _UpdateOrganisationCommandHandler;

        private Mock<IOrganisationRepository> _organisationRepository;
        private Mock<IOrganisationTypeRepository> _organisationTypeRepository;
        private Mock<IPackageRoleRepository> _packageRoleRepository;
        private Mock<IUserRepository> _userRepository;
        private Mock<IPackageRepository> _packageRepository;
        private Mock<IMediator> _mediator;
        private Mock<IMapper> _mapper;
        private Mock<ICapPublisher> _capPublisher;

        [SetUp]
        public void Setup()
        {
            _mediator = new Mock<IMediator>();
            _mapper = new Mock<IMapper>();
            _organisationRepository = new Mock<IOrganisationRepository>();
            _organisationTypeRepository = new Mock<IOrganisationTypeRepository>();
            _packageRoleRepository = new Mock<IPackageRoleRepository>();
            _userRepository = new Mock<IUserRepository>();
            _capPublisher = new Mock<ICapPublisher>();
            _packageRepository = new Mock<IPackageRepository>();

            _UpdateOrganisationCommand = new UpdateOrganisationCommand();
            _UpdateOrganisationCommandHandler = new(_organisationRepository.Object, _organisationTypeRepository.Object, _mapper.Object, _packageRoleRepository.Object, _userRepository.Object, _mediator.Object , _packageRepository.Object);
        }

        [Test]
        public async Task UpdateOrganisationCommand_Success()
        {
            _UpdateOrganisationCommand = new()
            {
                Organisation = new()
                {
                    Id = 1,
                    Name = "Test",
                    PackageId = 1,
                }
            };

            var organisations = new List<Organisation>
            {
                new Organisation{ Id = 1, Name = "Deneme" }
            };

            var organisationTypes = new List<OrganisationType>
            {
                new OrganisationType{ Id = 1, Name = "Deneme", IsSingularOrganisation = true }
            };

            var packages = new List<Package>
            {
                new Package{ Id = 1, Name = "Test"}
            };

            var packageRoles = new List<PackageRole>
            {
                new PackageRole{ Id = 1, PackageId = 124, RoleId = 59}
            };

            var users = new List<User>
            {
                new User{ Id = 1, Name = "Deneme" }
            };

            var user = new UpdateAdminCommand
            {
                Admin = new CreateUpdateAdminDto
                {
                    Id = users.First().Id,
                    UserName = "22222222222",
                    UserType = UserType.OrganisationAdmin,
                    CitizenId = "22222222222",
                    Name = "test",
                    SurName = "test",
                    Email = "test@test.com",
                    MobilePhones = "5552223344",
                    RoleIds = new List<long> { 1 },
                    Status = true
                }
            };

            var fakeEntity = new Organisation()
            {
                Id = 0,
                Name = _UpdateOrganisationCommand.Organisation.Name,
            };

            _mediator.Setup(x => x.Send(It.IsAny<UpdateAdminCommand>(), CancellationToken.None)).ReturnsAsync(new SuccessResult());

            _organisationTypeRepository.Setup(x => x.Query()).Returns(organisationTypes.AsQueryable().BuildMock());
            _organisationTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<OrganisationType, bool>>>())).ReturnsAsync(organisationTypes.FirstOrDefault());

            _packageRepository.Setup(x => x.Query()).Returns(packages.AsQueryable().BuildMock());
            _packageRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Package, bool>>>())).ReturnsAsync(packages.FirstOrDefault(x => x.Id == _UpdateOrganisationCommand.Organisation.PackageId));

            _packageRoleRepository.Setup(x => x.Query()).Returns(packageRoles.AsQueryable().BuildMock());
            _packageRoleRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<PackageRole, bool>>>())).ReturnsAsync(packageRoles.FirstOrDefault());

            _userRepository.Setup(x => x.Query()).Returns(users.AsQueryable().BuildMock());
            _userRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<User, bool>>>())).ReturnsAsync(users.FirstOrDefault());

            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Organisation, bool>>>())).ReturnsAsync(organisations.FirstOrDefault());

            _mapper.Setup(x => x.Map<Organisation>(It.IsAny<object>())).Returns(fakeEntity);

            _organisationRepository.Setup(x => x.Update(It.IsAny<Organisation>())).Returns(new Organisation());

            var result = await _UpdateOrganisationCommandHandler.Handle(_UpdateOrganisationCommand, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task UpdateOrganisationCommand_OrganisationNameExist_Error()
        {
            _UpdateOrganisationCommand = new()
            {
                Organisation = new()
                {
                    Id = 1,
                    Name = "Test",
                    CrmId = 1,
                }
            };

            var organisations = new List<Organisation>
            {
                new Organisation{Id = 2, Name = "Test", CrmId = 1 }
            };

            var fakeEntity = new Organisation()
            {
                Id = 0,
                Name = _UpdateOrganisationCommand.Organisation.Name,
            };

            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Organisation, bool>>>())).ReturnsAsync(organisations.FirstOrDefault());

            _mapper.Setup(x => x.Map<Organisation>(It.IsAny<object>())).Returns(fakeEntity);
            _organisationRepository.Setup(x => x.Update(It.IsAny<Organisation>())).Returns(new Organisation());

            var result = await _UpdateOrganisationCommandHandler.Handle(_UpdateOrganisationCommand, CancellationToken.None);

            result.Success.Should().BeFalse();
        }

        [Test]
        public async Task UpdateOrganisationCommand_Organisation_Entity_Null()
        {
            _UpdateOrganisationCommand = new()
            {
                Organisation = new()
                {
                    Id = 1,

                }
            };

            var organisations = new List<Organisation>
            {
                new Organisation{
                    Id = 1
                }
            };

            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Organisation, bool>>>())).ReturnsAsync(() => null);

            var result = await _UpdateOrganisationCommandHandler.Handle(_UpdateOrganisationCommand, CancellationToken.None);

            result.Success.Should().BeFalse();
        }
    }
}


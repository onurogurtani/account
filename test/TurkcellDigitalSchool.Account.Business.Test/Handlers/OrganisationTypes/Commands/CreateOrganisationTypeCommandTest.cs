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
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Commands.CreateOrganisationTypeCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.OrganisationTypes.Commands
{
    public class CreateOrganisationTypeCommandTest
    {
        private CreateOrganisationTypeCommand _createOrganisationTypeCommand;
        private CreateOrganisationTypeCommandHandler _createOrganisationTypeCommandHandler;

        private Mock<IOrganisationTypeRepository> _organisationTypeRepository;

        [SetUp]
        public void Setup()
        {
            _organisationTypeRepository = new Mock<IOrganisationTypeRepository>();

            _createOrganisationTypeCommand = new CreateOrganisationTypeCommand();
            _createOrganisationTypeCommandHandler = new CreateOrganisationTypeCommandHandler(_organisationTypeRepository.Object);
        }

        [Test]
        public async Task CreateOrganisationTypeCommand_Success()
        {
            _createOrganisationTypeCommand = new()
            {
                OrganisationType = new()
                {
                    Id = 1,
                    Code = "Test",
                    Description = "Test",
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    IsSingularOrganisation = true
                }
            };
            var contractTypes = new List<OrganisationType>
            {
                new OrganisationType{Id = 1, Name = "Deneme " }
            };

            _organisationTypeRepository.Setup(x => x.Query()).Returns(contractTypes.AsQueryable().BuildMock());
            _organisationTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<OrganisationType, bool>>>())).ReturnsAsync(_createOrganisationTypeCommand.OrganisationType);
            _organisationTypeRepository.Setup(x => x.Update(It.IsAny<OrganisationType>())).Returns(new OrganisationType());

            var result = await _createOrganisationTypeCommandHandler.Handle(_createOrganisationTypeCommand, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task CreateOrganisationTypeCommand_OrganisationTypeExist_Error()
        {
            _createOrganisationTypeCommand = new()
            {
                OrganisationType = new()
                {
                    Id = 1,
                    Code = "Test",
                    Description = "Test",
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    IsSingularOrganisation = true
                }
            };
            var organisationTypes = new List<OrganisationType>
            {
                new OrganisationType{Id = 2, Name = "Test " }
            };

            _organisationTypeRepository.Setup(x => x.Query()).Returns(organisationTypes.AsQueryable().BuildMock());
            _organisationTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<OrganisationType, bool>>>())).ReturnsAsync(_createOrganisationTypeCommand.OrganisationType);
            _organisationTypeRepository.Setup(x => x.Update(It.IsAny<OrganisationType>())).Returns(new OrganisationType());

            var result = await _createOrganisationTypeCommandHandler.Handle(_createOrganisationTypeCommand, CancellationToken.None);

            result.Success.Should().BeFalse();
        }
    }
}

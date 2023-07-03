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
using TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Enums;
using static TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands.UpdateOrganisationStatusCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Organisations.Commands
{
    [TestFixture]

    public class UpdateOrganisationStatusCommandTest
    {
        private UpdateOrganisationStatusCommand _UpdateOrganisationStatusCommand;
        private UpdateOrganisationStatusCommandHandler _UpdateOrganisationStatusCommandHandler;

        private Mock<IOrganisationRepository> _organisationRepository;

        [SetUp]
        public void Setup()
        {
            _organisationRepository = new Mock<IOrganisationRepository>();

            _UpdateOrganisationStatusCommand = new UpdateOrganisationStatusCommand();
            _UpdateOrganisationStatusCommandHandler = new(_organisationRepository.Object);
        }

        [Test]
        public async Task UpdateOrganisationStatusCommand_Success()
        {
            _UpdateOrganisationStatusCommand = new()
            {
                Id = 1,
                OrganisationStatusInfo = OrganisationStatusInfo.Active,
                ReasonForStatus = "Test"

            };
            var organisations = new List<Organisation>
            {
                new Organisation{Id = 1}
            };

            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Organisation, bool>>>())).ReturnsAsync(organisations.First());
            _organisationRepository.Setup(x => x.Update(It.IsAny<Organisation>())).Returns(new Organisation());

            var result = await _UpdateOrganisationStatusCommandHandler.Handle(_UpdateOrganisationStatusCommand, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
    }
}


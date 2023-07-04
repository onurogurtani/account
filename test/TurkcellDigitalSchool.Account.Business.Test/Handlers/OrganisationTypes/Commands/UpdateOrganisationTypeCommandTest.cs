using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Commands.UpdateOrganisationTypeCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.OrganisationTypes.Commands
{
    public class UpdateOrganisationTypeCommandTest
    {
        private UpdateOrganisationTypeCommand _updateOrganisationTypeCommand;
        private UpdateOrganisationTypeCommandHandler _updateOrganisationTypeCommandHandler;

        private Mock<IOrganisationTypeRepository> _organisationTypeRepository;
        private Mock<IOrganisationRepository> _organisationRepository;
        private Mock<IMapper> _mapper;

        [SetUp]
        public void Setup()
        {
            _mapper = new Mock<IMapper>();
            _organisationTypeRepository = new Mock<IOrganisationTypeRepository>();
            _organisationRepository = new Mock<IOrganisationRepository>();

            _updateOrganisationTypeCommand = new UpdateOrganisationTypeCommand();
            _updateOrganisationTypeCommandHandler = new(_organisationTypeRepository.Object, _mapper.Object, _organisationRepository.Object);
        }

        [Test]
        public async Task UpdateOrganisationTypeCommand_Success()
        {
            _updateOrganisationTypeCommand = new()
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
            _organisationTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<OrganisationType, bool>>>())).ReturnsAsync(_updateOrganisationTypeCommand.OrganisationType);
            _organisationTypeRepository.Setup(x => x.Update(It.IsAny<OrganisationType>())).Returns(new OrganisationType());

            var result = await _updateOrganisationTypeCommandHandler.Handle(_updateOrganisationTypeCommand, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task UpdateOrganisationTypeCommand_OrganisationTypeExist_Error()
        {
            _updateOrganisationTypeCommand = new()
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
            _organisationTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<OrganisationType, bool>>>())).ReturnsAsync(_updateOrganisationTypeCommand.OrganisationType);
            _organisationTypeRepository.Setup(x => x.Update(It.IsAny<OrganisationType>())).Returns(new OrganisationType());

            var result = await _updateOrganisationTypeCommandHandler.Handle(_updateOrganisationTypeCommand, CancellationToken.None);

            result.Success.Should().BeFalse();
        }
    }
}

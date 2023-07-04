using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using static TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries.GetByFilterPagedOrganisationsQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Organisations.Queries
{

    public class GetByFilterPagedOrganisationsQueryTest
    {
        private GetByFilterPagedOrganisationsQuery _getByFilterPagedOrganisationsQuery;
        private GetByFilterPagedOrganisationsQueryHandler _getByFilterPagedOrganisationsQueryHandler;

        private Mock<IOrganisationRepository> _organisationRepository;

        [SetUp]
        public void Setup()
        {
            _organisationRepository = new Mock<IOrganisationRepository>();

            _getByFilterPagedOrganisationsQuery = new GetByFilterPagedOrganisationsQuery();
            _getByFilterPagedOrganisationsQueryHandler = new GetByFilterPagedOrganisationsQueryHandler(_organisationRepository.Object);
        }

        [Test]
        public async Task GetByFilterPagedOrganisationsQuery_Success()
        {
            _getByFilterPagedOrganisationsQuery = new GetByFilterPagedOrganisationsQuery
            {
                OrganisationDetailSearch = new OrganisationDetailSearch()
            };

            var organisations = new List<Organisation>
            {
                new Organisation{},
            };
            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());

            var result = await _getByFilterPagedOrganisationsQueryHandler.Handle(_getByFilterPagedOrganisationsQuery, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedOrganisationsQuery_Error()
        {
            _getByFilterPagedOrganisationsQuery = new GetByFilterPagedOrganisationsQuery
            {
                // OrganisationDetailSearch = new Entities.Dtos.OrganisationDtos.OrganisationDetailSearch()
            };

            var organisations = new List<Organisation>
            {
                new Organisation{},
            };
            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());

            var result = await _getByFilterPagedOrganisationsQueryHandler.Handle(_getByFilterPagedOrganisationsQuery, new CancellationToken());

            result.Success.Should().BeTrue();
        }
    }
}

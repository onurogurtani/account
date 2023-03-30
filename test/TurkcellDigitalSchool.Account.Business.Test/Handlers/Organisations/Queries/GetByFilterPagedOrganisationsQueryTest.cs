using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Organisations.Queries
{

    public class GetByFilterPagedOrganisationsQueryTest
    {
        private GetByFilterPagedOrganisationsQuery _getByFilterPagedOrganisationsQuery;
        private GetByFilterPagedOrganisationsQuery.GetByFilterPagedOrganisationsQueryHandler _getByFilterPagedOrganisationsQueryHandler;

        private Mock<IOrganisationRepository> _organisationRepository;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;

        [SetUp]
        public void Setup()
        {
            _mediator = new Mock<IMediator>();
            _serviceProvider = new Mock<IServiceProvider>();
            _serviceProvider.Setup(x => x.GetService(typeof(IMediator))).Returns(_mediator.Object);
            ServiceTool.ServiceProvider = _serviceProvider.Object;
            _httpContextAccessor = new Mock<IHttpContextAccessor>();
            _httpContext = new Mock<HttpRequest>();
            _headerDictionary = new Mock<IHeaderDictionary>();
            _headerDictionary.Setup(x => x["Referer"]).Returns("");
            _httpContext.Setup(x => x.Headers).Returns(_headerDictionary.Object);
            _httpContextAccessor.Setup(x => x.HttpContext.Request).Returns(_httpContext.Object);
            _serviceProvider.Setup(x => x.GetService(typeof(IHttpContextAccessor))).Returns(_httpContextAccessor.Object);

            _organisationRepository = new Mock<IOrganisationRepository>();

            _getByFilterPagedOrganisationsQuery = new GetByFilterPagedOrganisationsQuery();
            _getByFilterPagedOrganisationsQueryHandler = new GetByFilterPagedOrganisationsQuery.GetByFilterPagedOrganisationsQueryHandler(_organisationRepository.Object);
        }

        [Test]
        public async Task GetByFilterPagedOrganisationsQuery_Success()
        {
            _getByFilterPagedOrganisationsQuery = new GetByFilterPagedOrganisationsQuery
            {
                OrganisationDetailSearch = new Entities.Dtos.OrganisationDtos.OrganisationDetailSearch()
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

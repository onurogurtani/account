using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using static TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries.GetByFilterPagedOrganisationsQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Organisations.Queries
{

    public class GetByFilterPagedOrganisationsQueryTest
    {
        private GetByFilterPagedOrganisationsQuery _getByFilterPagedOrganisationsQuery;
        private GetByFilterPagedOrganisationsQueryHandler _getByFilterPagedOrganisationsQueryHandler;

        private Mock<IOrganisationRepository> _organisationRepository;

        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpRequest;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IServiceProvider> _serviceProvider;
        Mock<IMediator> _mediator;
        Mock<IMapper> _mapper;
        Mock<RedisService> _redisService;

        [SetUp]
        public void Setup()
        {
            _mediator = new Mock<IMediator>();
            _serviceProvider = new Mock<IServiceProvider>();
            _httpContextAccessor = new Mock<IHttpContextAccessor>();
            _httpRequest = new Mock<HttpRequest>();
            _headerDictionary = new Mock<IHeaderDictionary>();
            _mapper = new Mock<IMapper>();
            _redisService = new Mock<RedisService>();

            _serviceProvider.Setup(x => x.GetService(typeof(IMediator))).Returns(_mediator.Object);
            ServiceTool.ServiceProvider = _serviceProvider.Object;
            _headerDictionary.Setup(x => x["Referer"]).Returns("");
            _httpRequest.Setup(x => x.Headers).Returns(_headerDictionary.Object);
            _httpContextAccessor.Setup(x => x.HttpContext.Request).Returns(_httpRequest.Object);
            _serviceProvider.Setup(x => x.GetService(typeof(IHttpContextAccessor))).Returns(_httpContextAccessor.Object);
            _serviceProvider.Setup(x => x.GetService(typeof(RedisService))).Returns(_redisService.Object);

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

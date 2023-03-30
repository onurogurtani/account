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
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries.GetPackageNamesQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Packages.Queries
{
    [TestFixture]
    public class GetPackageNamesQueryTest
    {
        private GetPackageNamesQuery _getPackageNamesQuery;
        private GetPackageNamesQueryHandler _getPackageNamesQueryHandler;

        private Mock<IPackageRepository> _packageRepository;

        Mock<IMapper> _mapper;

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

            _packageRepository = new Mock<IPackageRepository>();

            _mapper = new Mock<IMapper>();

            _getPackageNamesQuery = new GetPackageNamesQuery();
            _getPackageNamesQueryHandler = new GetPackageNamesQueryHandler( _packageRepository.Object);
        }

        [Test]
        public async Task GetPackageNamesQueryTest_Success()
        {
            _getPackageNamesQuery = new GetPackageNamesQuery();

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    Name = "Test"
                },

            };

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getPackageNamesQueryHandler.Handle(_getPackageNamesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
       
    }
}
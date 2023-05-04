using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Documents.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Utilities.IoC;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Documents.Queries
{
    [TestFixture]
    public class GetVersionQueryTest
    {
        private GetNewVersionQuery _getVersionQuery;
        private GetNewVersionQuery.GetNewVersionQueryHandler _getVersionQueryHandler;

        private Mock<IDocumentRepository> _documentRepository;

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

            _documentRepository = new Mock<IDocumentRepository>();

            _mapper = new Mock<IMapper>();

            _getVersionQuery = new GetNewVersionQuery();
            _getVersionQueryHandler = new GetNewVersionQuery.GetNewVersionQueryHandler(_documentRepository.Object);
        }

        [Test]
        public async Task GetVersionQuery_Success()
        {
            _getVersionQuery = new()
            {
                ContractKindId=1,
            };

            var documents = new List<Document>
            {
                new Document{ Id = 1, ContractKindId=1}
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents.First());

            var result = await _getVersionQueryHandler.Handle(_getVersionQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
        [Test]
        public async Task GetVersionQuery_GetByContractKindId_Null_Error()
        {
            _getVersionQuery = new()
            {
                ContractKindId = 1,

            };
            var documents = new List<Document>
            {
                new Document{ Id = 1, ContractKindId=1}
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(()=>null);

            var result = await _getVersionQueryHandler.Handle(_getVersionQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

    }
}
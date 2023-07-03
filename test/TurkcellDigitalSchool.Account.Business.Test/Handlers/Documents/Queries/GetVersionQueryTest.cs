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
using TurkcellDigitalSchool.Account.Business.Handlers.Documents.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.Documents.Queries.GetNewVersionQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Documents.Queries
{
    [TestFixture]
    public class GetVersionQueryTest
    {
        private GetNewVersionQuery _getVersionQuery;
        private GetNewVersionQueryHandler _getVersionQueryHandler;

        private Mock<IDocumentRepository> _documentRepository;

        [SetUp]
        public void Setup()
        {
            _documentRepository = new Mock<IDocumentRepository>();

            _getVersionQuery = new GetNewVersionQuery();
            _getVersionQueryHandler = new GetNewVersionQueryHandler(_documentRepository.Object);
        }

        [Test]
        public async Task GetVersionQuery_Success()
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
            _documentRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(() => null);

            var result = await _getVersionQueryHandler.Handle(_getVersionQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
    }
}
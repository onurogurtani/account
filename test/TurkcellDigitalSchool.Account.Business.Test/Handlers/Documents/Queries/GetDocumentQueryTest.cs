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
using TurkcellDigitalSchool.Account.Business.Handlers.Documents.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using static TurkcellDigitalSchool.Account.Business.Handlers.Documents.Queries.GetDocumentQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Documents.Queries
{
    [TestFixture]
    public class GetDocumentQueryTest
    {
        private GetDocumentQuery _getDocumentQuery;
        private GetDocumentQueryHandler _getDocumentQueryHandler;

        private Mock<IDocumentRepository> _documentRepository;
        private Mock<IUserRepository> _userRepository;
        private Mock<IMapper> _mapper;

        [SetUp]
        public void Setup()
        {
            _mapper = new Mock<IMapper>();
            _documentRepository = new Mock<IDocumentRepository>();
            _userRepository = new Mock<IUserRepository>();

            _getDocumentQuery = new GetDocumentQuery();
            _getDocumentQueryHandler = new GetDocumentQueryHandler(_userRepository.Object, _documentRepository.Object, _mapper.Object);
        }

        [Test]
        public async Task GetDocumentsQuery_Success()
        {
            _getDocumentQuery.Id = 1;

            var documents = new List<Document>
            {
                new Document{
                   Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new(),
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Now,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId=1
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents.FirstOrDefault());

            _mapper.Setup(s => s.Map<DocumentDto>(It.IsAny<Document>())).Returns(
                new DocumentDto()
                {
                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new(),
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Now,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1

                });
            var result = await _getDocumentQueryHandler.Handle(_getDocumentQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetDocumentsQuery_GetById_Null_Error()
        {
            _getDocumentQuery.Id = 1;
            var documents = new List<Document>
            {
                new Document{
                    Id=2
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(() => null);

            var result = await _getDocumentQueryHandler.Handle(_getDocumentQuery, CancellationToken.None);

            result.Success.Should().BeFalse();
        }
    }
}
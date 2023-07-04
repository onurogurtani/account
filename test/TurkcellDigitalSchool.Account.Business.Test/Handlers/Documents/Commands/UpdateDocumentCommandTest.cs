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
using TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands.UpdateDocumentCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Documents.Commands
{
    [TestFixture]

    public class UpdateDocumentCommandTest
    {
        private UpdateDocumentCommand _updateDocumentCommand;
        private UpdateDocumentCommandHandler _updateDocumentCommandHandler;

        private Mock<IDocumentRepository> _documentRepository;
        private Mock<IDocumentContractTypeRepository> _documentContractTypeRepository;
        private Mock<AccountDbContext> _accountDbContext;

        [SetUp]
        public void Setup()
        {
            _documentRepository = new Mock<IDocumentRepository>();
            _documentContractTypeRepository = new Mock<IDocumentContractTypeRepository>();
            _accountDbContext = new Mock<AccountDbContext>();

            _updateDocumentCommand = new UpdateDocumentCommand();
            _updateDocumentCommandHandler = new UpdateDocumentCommandHandler(_documentRepository.Object, _documentContractTypeRepository.Object, _accountDbContext.Object);
        }

        [Test]
        public async Task UpdateDocumentCommand_Success()
        {
            _updateDocumentCommand = new()
            {
                Entity = new()
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

                }
            };

            var documents = new List<Document>
            {
                new Document{
                    Id = 1
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(_updateDocumentCommand.Entity);
            _documentRepository.Setup(x => x.Update(It.IsAny<Document>())).Returns(new Document());

            var result = await _updateDocumentCommandHandler.Handle(_updateDocumentCommand, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task UpdateDocumentCommand_Document_Entity_Null()
        {
            _updateDocumentCommand = new()
            {
                Entity = new()
                {
                    Id = 1

                }
            };

            var documents = new List<Document>
            {
                new Document{
                    Id = 1
                }
            };
            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());

            _documentRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(() => null);

            var result = await _updateDocumentCommandHandler.Handle(_updateDocumentCommand, CancellationToken.None);

            result.Success.Should().BeFalse();
        }
    }
}


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
using TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands.CopyDocumentCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Documents.Commands
{
    [TestFixture]

    public class CopyDocumentCommandTest
    {
        private CopyDocumentCommand _copyDocumentCommand;
        private CopyDocumentCommandHandler _copyDocumentCommandHandler;

        private Mock<IDocumentRepository> _documentRepository;
        private Mock<IDocumentContractTypeRepository> _documentContractTypeRepository;
        private Mock<IMapper> _mapper;

        [SetUp]
        public void Setup()
        {
            _mapper = new Mock<IMapper>();

            _documentRepository = new Mock<IDocumentRepository>();
            _documentContractTypeRepository = new Mock<IDocumentContractTypeRepository>();

            _copyDocumentCommand = new CopyDocumentCommand();
            _copyDocumentCommandHandler = new CopyDocumentCommandHandler(_documentRepository.Object, _documentContractTypeRepository.Object, _mapper.Object);
        }

        [Test]
        public async Task CopyDocumentCommand_Success()
        {
            _copyDocumentCommand = new()
            {
                Id = 1,
            };

            var documents = new List<Document>
            {
                new Document{
                    Id = 1,
                    ContractKindId=1,
                    Version=1,
                    ClientRequiredApproval=true,
                    RequiredApproval=true,
                    Content="test",
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Now,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    ContractKind=new ContractKind{
                        Id=1,
                        ContractTypeId=1,
                        ContractType=new ContractType{ Id=1,Description="Test"},

                    },
                    RecordStatus=Core.Enums.RecordStatus.Active
                }
            };
            var documentTypes = new List<DocumentContractType>
            {
                new DocumentContractType{
                    Id = 1,
                    ContractTypeId=1,
                    ContractType=new ContractType{ Id=1,Description="Test"},
                    DocumentId=1,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,

                }
            };
            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents.FirstOrDefault());

            _documentContractTypeRepository.Setup(x => x.Query()).Returns(documentTypes.AsQueryable().BuildMock());
            _documentContractTypeRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<DocumentContractType, bool>>>())).ReturnsAsync(documentTypes);

            _mapper.Setup(s => s.Map<Document, Document>(It.IsAny<Document>())).Returns(
                new Document()
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

            var result = await _copyDocumentCommandHandler.Handle(_copyDocumentCommand, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task CopyDocumentCommand_Document_Entity_Null()
        {
            _copyDocumentCommand = new()
            {
                Id = 1
            };

            _documentRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(() => null);

            var result = await _copyDocumentCommandHandler.Handle(_copyDocumentCommand, CancellationToken.None);

            result.Success.Should().BeFalse();
        }
    }
}


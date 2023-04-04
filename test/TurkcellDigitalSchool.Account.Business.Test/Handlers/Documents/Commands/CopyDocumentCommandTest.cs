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
using TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Documents.Commands
{
    [TestFixture]

    public class CopyDocumentCommandTest
    {

        Mock<IDocumentRepository> _documentRepository;
        Mock<IDocumentContractTypeRepository> _documentContractTypeRepository;

        private CopyDocumentCommand _copyDocumentCommand;
        private CopyDocumentCommand.CopyDocumentCommandHandler _copyDocumentCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;
        Mock<IMapper> _mapper;


        [SetUp]
        public void Setup()
        {
            _documentRepository = new Mock<IDocumentRepository>();
            _documentContractTypeRepository = new Mock<IDocumentContractTypeRepository>();
            _mapper = new Mock<IMapper>();

            _copyDocumentCommand = new CopyDocumentCommand();
            _copyDocumentCommandHandler = new(_documentRepository.Object, _documentContractTypeRepository.Object, _mapper.Object);

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
            result.Message.Should().Be(Messages.RecordDoesNotExist);
        }

    }
}

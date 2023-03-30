using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
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

    public class UpdateDocumentCommandTest
    {

        Mock<IDocumentRepository> _documentRepository;
        Mock<IDocumentContractTypeRepository> _documentContractTypeRepository;

        private UpdateDocumentCommand _updateDocumentCommand;
        private UpdateDocumentCommand.UpdateDocumentCommandHandler _updateDocumentCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;


        [SetUp]
        public void Setup()
        {
            _documentRepository = new Mock<IDocumentRepository>();
            _documentContractTypeRepository = new Mock<IDocumentContractTypeRepository>();

            _updateDocumentCommand = new UpdateDocumentCommand();
            _updateDocumentCommandHandler = new(_documentRepository.Object, _documentContractTypeRepository.Object);

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
            result.Message.Should().Be(Messages.RecordDoesNotExist);
        }

    }
}


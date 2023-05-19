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
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Utilities.IoC;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Documents.Commands
{
    [TestFixture]

    public class UpdateDocumentCommandTest
    {
        private UpdateDocumentCommand _updateDocumentCommand;
        private UpdateDocumentCommand.UpdateDocumentCommandHandler _updateDocumentCommandHandler;

        Mock<IDocumentRepository> _documentRepository;
        Mock<IDocumentContractTypeRepository> _documentContractTypeRepository;

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

            _documentRepository = new Mock<IDocumentRepository>();
            _documentContractTypeRepository = new Mock<IDocumentContractTypeRepository>();

            _updateDocumentCommand = new UpdateDocumentCommand();
            _updateDocumentCommandHandler = new(_documentRepository.Object, _documentContractTypeRepository.Object);
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


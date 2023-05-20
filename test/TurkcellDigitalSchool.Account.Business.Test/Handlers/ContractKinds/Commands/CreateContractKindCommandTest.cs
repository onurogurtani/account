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
using TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Utilities.IoC;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.ContractKinds.Commands
{
    [TestFixture]

    public class CreateContractKindCommandTest
    {
        private CreateContractKindCommand _createContractKindCommand;
        private CreateContractKindCommand.CreateContractKindCommandHandler _createContractKindCommandHandler;

        Mock<IContractKindRepository> _contractKindRepository;
        Mock<IContractTypeRepository> _contractTypeRepository;

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

            _contractKindRepository = new Mock<IContractKindRepository>();
            _contractTypeRepository = new Mock<IContractTypeRepository>();

            _createContractKindCommand = new CreateContractKindCommand();
            _createContractKindCommandHandler = new(_contractKindRepository.Object);
        }


        [Test]
        //[TestCase(PaymentReferenceType.LoadBalance, 1, "Name", "Name")]
        //[TestCase(PaymentReferenceType.LoadBalance, 1, "ContractTypeId", "1")]
        public async Task CreateContractKindCommand_Success()
        {
            _createContractKindCommand = new()
            {
                ContractKind = new()
                {
                    Id = 0,
                    Code = "Test",
                    ContractType = new() { Id = 1, },
                    ContractTypeId = 1,
                    Description = "Test",
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active
                },
            };

            var contractKinds = new List<ContractKind>
            {
                new ContractKind{Id = 0, Name = "Deneme ", RecordStatus = Core.Enums.RecordStatus.Active, ContractTypeId = 1 },
            };

            _contractKindRepository.Setup(x => x.Query()).Returns(contractKinds.AsQueryable().BuildMock());
            _contractKindRepository.Setup(x => x.Add(It.IsAny<ContractKind>())).Returns(new ContractKind());

            var result = await _createContractKindCommandHandler.Handle(_createContractKindCommand, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task CreateContractKindCommand_ExistNameWithContractType_Error()
        {
            _createContractKindCommand = new()
            {
                ContractKind = new()
                {
                    Id = 0,
                    Code = "Test",
                    ContractType = new() { Id = 1, },
                    ContractTypeId = 1,
                    Description = "Test",
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active
                },

            };

            var contractKinds = new List<ContractKind>
            {
                new ContractKind{Id = 0, Name = "Test", RecordStatus = Core.Enums.RecordStatus.Active, ContractTypeId = 1 },
            };

            _contractKindRepository.Setup(x => x.Query()).Returns(contractKinds.AsQueryable().BuildMock());

            _contractKindRepository.Setup(x => x.Add(It.IsAny<ContractKind>())).Returns(new ContractKind());

            var result = await _createContractKindCommandHandler.Handle(_createContractKindCommand, new CancellationToken());

            result.Success.Should().BeFalse();
            result.Message.Should().Be(Messages.NameAlreadyExist);
        }
    }
}


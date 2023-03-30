using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.ContractKinds.Commands
{
    [TestFixture]

    public class CreateContractKindCommandTest
    {
        Mock<IContractKindRepository> _contractKindRepository;
        Mock<IContractTypeRepository> _contractTypeRepository;


        private CreateContractKindCommand _createContractKindCommand;
        private CreateContractKindCommand.CreateContractKindCommandHandler _createContractKindCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;


        [SetUp]
        public void Setup()
        {
            _contractKindRepository = new Mock<IContractKindRepository>();
            _contractTypeRepository = new Mock<IContractTypeRepository>();

            _createContractKindCommand = new CreateContractKindCommand();
            _createContractKindCommandHandler = new(_contractKindRepository.Object);

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


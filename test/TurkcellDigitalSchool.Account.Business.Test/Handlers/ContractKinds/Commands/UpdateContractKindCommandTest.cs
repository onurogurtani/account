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
using TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.ContractKinds.Commands
{
    [TestFixture]

    public class UpdateContractKindCommandTest
    {
        Mock<IContractKindRepository> _contractKindRepository;
        Mock<IContractTypeRepository> _contractTypeRepository;

        private UpdateContractKindCommand _updateContractKindCommand;
        private UpdateContractKindCommand.UpdateContractKindCommandHandler _updateContractKindCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;
        Mock<IMapper> _mapper;


        [SetUp]
        public void Setup()
        {
            _contractKindRepository = new Mock<IContractKindRepository>();
            _contractTypeRepository = new Mock<IContractTypeRepository>();
            _mapper = new Mock<IMapper>();

            _updateContractKindCommand = new UpdateContractKindCommand();
            _updateContractKindCommandHandler = new(_contractKindRepository.Object, _mapper.Object);

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
        public async Task UpdateContractKindCommand_Success()
        {
            _updateContractKindCommand = new()
            {
                ContractKind = new()
                {
                    Id = 1,
                    Code = "Test",
                    ContractType = new() { Id = 1, },
                    ContractTypeId = new(),
                    Description = "Test",
                    Name = "Test",
                    UpdateTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active
                },

            };
            var contractTypes = new List<ContractKind>
            {
                new ContractKind{

                    Id = 1,
                    Code = "Deneme",
                    ContractType = new() { Id = 1, },
                    ContractTypeId = new(),
                    Description = "Deneme",
                    Name = "Deneme",
                    UpdateTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active
                },
            };

            _contractKindRepository.Setup(x => x.Query()).Returns(contractTypes.AsQueryable().BuildMock());
            _contractKindRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<ContractKind, bool>>>())).ReturnsAsync(_updateContractKindCommand.ContractKind);
            _contractKindRepository.Setup(x => x.Update(It.IsAny<ContractKind>())).Returns(new ContractKind());

            var result = await _updateContractKindCommandHandler.Handle(_updateContractKindCommand, CancellationToken.None);

            result.Success.Should().BeTrue();

        }

        [Test]
        public async Task UpdateContractKindCommand_ExistName_Error()
        {
            _updateContractKindCommand = new()
            {
                ContractKind = new()
                {
                    Id = 1,
                    Code = "Test",
                    ContractType = new() { Id = 1, },
                    ContractTypeId = new(),
                    Description = "Test",
                    Name = "Test",
                    UpdateTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active
                },

            };
            var contractTypes = new List<ContractKind>
            {
                new ContractKind{

                    Id = 2,
                    Code = "Deneme",
                    ContractType = new() { Id = 1, },
                    ContractTypeId = new(),
                    Description = "Deneme",
                    Name = "Test",
                    UpdateTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active
                },
            };

            _contractKindRepository.Setup(x => x.Query()).Returns(contractTypes.AsQueryable().BuildMock());
            _contractKindRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<ContractKind, bool>>>())).ReturnsAsync(_updateContractKindCommand.ContractKind);
            _contractKindRepository.Setup(x => x.Update(It.IsAny<ContractKind>())).Returns(new ContractKind());

            var result = await _updateContractKindCommandHandler.Handle(_updateContractKindCommand, CancellationToken.None);

            result.Success.Should().BeFalse();
            result.Message.Should().Be(Messages.NameAlreadyExist);

        }

        [Test]
        public async Task UpdateContractKindCommand_ContractKind_Entity_Null()
        {
            _updateContractKindCommand = new()
            {
                ContractKind = new()
                {
                    Id = 1
                },

            };
            var contractTypes = new List<ContractKind>
            {
                new ContractKind{

                    Id = 1
                },
            };

            _contractKindRepository.Setup(x => x.Query()).Returns(contractTypes.AsQueryable().BuildMock());
            _contractKindRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<ContractKind, bool>>>())).ReturnsAsync(() => null);

            var result = await _updateContractKindCommandHandler.Handle(_updateContractKindCommand, CancellationToken.None);

            result.Success.Should().BeFalse();
            result.Message.Should().Be(Messages.RecordDoesNotExist);
        }
    }
}


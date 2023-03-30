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
using TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.ContractTypes.Commands
{
    [TestFixture]

    public class UpdateContractTypeCommandTest
    {
        Mock<IContractTypeRepository> _contractTypeRepository;

        private UpdateContractTypeCommand _updateContractTypeCommand;
        private UpdateContractTypeCommand.UpdateContractTypeCommandHandler _updateContractTypeCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;
        Mock<IMapper> _mapper;


        [SetUp]
        public void Setup()
        {
            _contractTypeRepository = new Mock<IContractTypeRepository>();
            _contractTypeRepository = new Mock<IContractTypeRepository>();
            _mapper = new Mock<IMapper>();

            _updateContractTypeCommand = new UpdateContractTypeCommand();
            _updateContractTypeCommandHandler = new(_contractTypeRepository.Object, _mapper.Object);

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
        public async Task UpdateContractTypeCommand_Success()
        {
            _updateContractTypeCommand = new()
            {
                ContractType = new()
                {
                    Id = 1,
                    Code = "Test",
                    Description = "Test",
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                }
            };
            var contractTypes = new List<ContractType>
            {
                new ContractType{Id = 1, Name = "Deneme " }
            };

            _contractTypeRepository.Setup(x => x.Query()).Returns(contractTypes.AsQueryable().BuildMock());
            _contractTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<ContractType, bool>>>())).ReturnsAsync(_updateContractTypeCommand.ContractType);
            _contractTypeRepository.Setup(x => x.Update(It.IsAny<ContractType>())).Returns(new ContractType());

            var result = await _updateContractTypeCommandHandler.Handle(_updateContractTypeCommand, CancellationToken.None);

            result.Success.Should().BeTrue();

        }

        [Test]
        public async Task UpdateContractTypeCommand_ContractTypeExist_Error()
        {
            _updateContractTypeCommand = new()
            {
                ContractType = new()
                {
                    Id = 1,
                    Code = "Test",
                    Description = "Test",
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                }
            };
            var contractTypes = new List<ContractType>
            {
                new ContractType{Id = 2, Name = "Test " }
            };

            _contractTypeRepository.Setup(x => x.Query()).Returns(contractTypes.AsQueryable().BuildMock());
            _contractTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<ContractType, bool>>>())).ReturnsAsync(_updateContractTypeCommand.ContractType);
            _contractTypeRepository.Setup(x => x.Update(It.IsAny<ContractType>())).Returns(new ContractType());

            var result = await _updateContractTypeCommandHandler.Handle(_updateContractTypeCommand, CancellationToken.None);

            result.Success.Should().BeFalse();
            result.Message.Should().Be(Messages.NameAlreadyExist);

        }

        [Test]
        public async Task UpdateContractTypeCommand_ContractType_Entity_Null()
        {
            _updateContractTypeCommand = new()
            {
                ContractType = new()
                {
                    Id = 1,

                }
            };
            var contractTypes = new List<ContractType>
            {
                new ContractType{
                    Id = 1
                }
            };
            _contractTypeRepository.Setup(x => x.Query()).Returns(contractTypes.AsQueryable().BuildMock());
            _contractTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<ContractType, bool>>>())).ReturnsAsync(() => null);

            var result = await _updateContractTypeCommandHandler.Handle(_updateContractTypeCommand, CancellationToken.None);

            result.Success.Should().BeFalse();
            result.Message.Should().Be(Messages.RecordDoesNotExist);
        }

    }
}


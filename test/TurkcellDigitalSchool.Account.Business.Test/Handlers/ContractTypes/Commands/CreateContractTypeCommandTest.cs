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
using TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Utilities.IoC;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.ContractTypes.Commands
{
    [TestFixture]

    public class CreateContractTypeCommandTest
    {
        private CreateContractTypeCommand _createContractTypeCommand;
        private CreateContractTypeCommand.CreateContractTypeCommandHandler _createContractTypeCommandHandler;

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

            _contractTypeRepository = new Mock<IContractTypeRepository>();

            _createContractTypeCommand = new CreateContractTypeCommand();
            _createContractTypeCommandHandler = new(_contractTypeRepository.Object);
        }

        [Test]
        public async Task CreateContractTypeCommand_Success()
        {
            _createContractTypeCommand = new()
            {
                ContractType = new()
                {
                    Id = 0,
                    Code = "Test",
                    Description = "Test",
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                }
            };
            var contractTypes = new List<ContractType>
            {
                new ContractType{Id = 0, Name = "Deneme ", RecordStatus = Core.Enums.RecordStatus.Active }
            };

            _contractTypeRepository.Setup(x => x.Query()).Returns(contractTypes.AsQueryable().BuildMock());
            _contractTypeRepository.Setup(x => x.Add(It.IsAny<ContractType>())).Returns(new ContractType());

            var result = await _createContractTypeCommandHandler.Handle(_createContractTypeCommand, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task CreateContractTypeCommand_ExistByName_Error()
        {
            _createContractTypeCommand = new()
            {
                ContractType = new()
                {
                    Id = 1,
                    Code = "Test",
                    Description = "Test",
                    Name = "Name",
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active

                },

            };
            var contractTypes = new List<ContractType>
            {
                new ContractType{ Name = "Name " }
            };

            _contractTypeRepository.Setup(x => x.Query()).Returns(contractTypes.AsQueryable().BuildMock());
            _contractTypeRepository.Setup(x => x.Add(It.IsAny<ContractType>())).Returns(new ContractType());

            var result = await _createContractTypeCommandHandler.Handle(_createContractTypeCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }
    }
}


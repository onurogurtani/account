using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.Commands.CreateContractTypeCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.ContractTypes.Commands
{
    [TestFixture]

    public class CreateContractTypeCommandTest
    {
        private CreateContractTypeCommand _createContractTypeCommand;
        private CreateContractTypeCommandHandler _createContractTypeCommandHandler;

        private Mock<IContractTypeRepository> _contractTypeRepository;

        [SetUp]
        public void Setup()
        {
            _contractTypeRepository = new Mock<IContractTypeRepository>();

            _createContractTypeCommand = new CreateContractTypeCommand();
            _createContractTypeCommandHandler = new CreateContractTypeCommandHandler(_contractTypeRepository.Object);
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


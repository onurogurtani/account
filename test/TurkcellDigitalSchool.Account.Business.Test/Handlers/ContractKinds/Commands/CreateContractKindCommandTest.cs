using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Constants;
using static TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Commands.CreateContractKindCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.ContractKinds.Commands
{
    [TestFixture]

    public class CreateContractKindCommandTest
    {
        private CreateContractKindCommand _createContractKindCommand;
        private CreateContractKindCommandHandler _createContractKindCommandHandler;

        private Mock<IContractKindRepository> _contractKindRepository;

        [SetUp]
        public void Setup()
        {
            _contractKindRepository = new Mock<IContractKindRepository>();

            _createContractKindCommand = new CreateContractKindCommand();
            _createContractKindCommandHandler = new CreateContractKindCommandHandler(_contractKindRepository.Object);
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


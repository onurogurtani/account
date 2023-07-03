using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Commands.UpdateContractKindCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.ContractKinds.Commands
{
    [TestFixture]

    public class UpdateContractKindCommandTest
    {
        private UpdateContractKindCommand _updateContractKindCommand;
        private UpdateContractKindCommandHandler _updateContractKindCommandHandler;

        private Mock<IContractKindRepository> _contractKindRepository;
        private Mock<IMapper> _mapper;

        [SetUp]
        public void Setup()
        {
            _mapper = new Mock<IMapper>();
            _contractKindRepository = new Mock<IContractKindRepository>();

            _updateContractKindCommand = new UpdateContractKindCommand();
            _updateContractKindCommandHandler = new UpdateContractKindCommandHandler(_contractKindRepository.Object, _mapper.Object);
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
        }
    }
}


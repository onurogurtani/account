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
using TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.Commands.UpdateContractTypeCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.ContractTypes.Commands
{
    [TestFixture]

    public class UpdateContractTypeCommandTest
    {
        private UpdateContractTypeCommand _updateContractTypeCommand;
        private UpdateContractTypeCommandHandler _updateContractTypeCommandHandler;

        private Mock<IContractTypeRepository> _contractTypeRepository;
        private Mock<IMapper> _mapper;

        [SetUp]
        public void Setup()
        {
            _mapper = new Mock<IMapper>();
            _contractTypeRepository = new Mock<IContractTypeRepository>();

            _updateContractTypeCommand = new UpdateContractTypeCommand();
            _updateContractTypeCommandHandler = new UpdateContractTypeCommandHandler(_contractTypeRepository.Object, _mapper.Object);
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
        }
    }
}


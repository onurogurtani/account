using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Queries.GetContractKindQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.ContractKinds.Queries
{
    [TestFixture]
    public class GetContractKindQueryTest
    {
        private GetContractKindQuery _getContractKindQuery;
        private GetContractKindQueryHandler _getContractKindQueryHandler;

        private Mock<IContractKindRepository> _contractKindRepository;

        [SetUp]
        public void Setup()
        {
            _contractKindRepository = new Mock<IContractKindRepository>();

            _getContractKindQuery = new GetContractKindQuery();
            _getContractKindQueryHandler = new GetContractKindQueryHandler(_contractKindRepository.Object);
        }

        [Test]
        public async Task GetContractKindQuery_Success()
        {
            _getContractKindQuery.Id = 1;

            var contractKinds = new List<ContractKind>
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

            _contractKindRepository.Setup(x => x.Query()).Returns(contractKinds.AsQueryable().BuildMock());
            _contractKindRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<ContractKind, bool>>>())).ReturnsAsync(contractKinds.FirstOrDefault());

            var result = await _getContractKindQueryHandler.Handle(_getContractKindQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetContractKindQuery_GetById_Null_Error()
        {
            _getContractKindQuery.Id = 1;
            var contractKinds = new List<ContractKind>
            {
                new ContractKind{

                    Id = 2
                },
            };

            _contractKindRepository.Setup(x => x.Query()).Returns(contractKinds.AsQueryable().BuildMock());
            _contractKindRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<ContractKind, bool>>>())).ReturnsAsync(() => null);

            var result = await _getContractKindQueryHandler.Handle(_getContractKindQuery, CancellationToken.None);

            result.Success.Should().BeFalse();
        }
    }
}
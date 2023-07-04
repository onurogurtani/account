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
using static TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Queries.GetContractKindsByContractTypesQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.ContractKinds.Queries
{
    [TestFixture]
    public class GetContractKindsByContractTypesQueryTest
    {
        private GetContractKindsByContractTypesQuery _getContractTypesByContractTypesQuery;
        private GetContractKindsByContractTypesQueryHandler _getContractTypesByContractTypesQueryHandler;

        private Mock<IContractTypeRepository> _contractTypeRepository;
        private Mock<IDocumentRepository> _documentRepository;

        [SetUp]
        public void Setup()
        {
            _contractTypeRepository = new Mock<IContractTypeRepository>();
            _documentRepository = new Mock<IDocumentRepository>();

            _getContractTypesByContractTypesQuery = new GetContractKindsByContractTypesQuery();
            _getContractTypesByContractTypesQueryHandler = new GetContractKindsByContractTypesQueryHandler(_documentRepository.Object, _contractTypeRepository.Object);
        }

        [Test]
        public async Task GetContractKindsByContractTypesQuery_Success()
        {
            _getContractTypesByContractTypesQuery.Ids = new long[] { 1, 2, 3 };

            var contractTypes = new List<ContractType>
            {
                new ContractType{

                    Id = 1,
                    Code = "Deneme",
                    Description = "Deneme",
                    Name = "Deneme",
                    UpdateTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active
                },
            };

            var documents = new List<Document>
            {
                new Document{
                   Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new(),
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Now,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content=   "",
                    ContractTypes=new List<DocumentContractType>{
                      new DocumentContractType
                      {
                          Id = 1,
                          ContractType =new ContractType{ Id = 1, RecordStatus=Core.Enums.RecordStatus.Active},
                          ContractTypeId = 1,
                          DocumentId = 1,
                      }
                    },
                }
            };

            _contractTypeRepository.Setup(x => x.Query()).Returns(contractTypes.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            var result = await _getContractTypesByContractTypesQueryHandler.Handle(_getContractTypesByContractTypesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
        [Test]
        public async Task GetContractKindsByContractTypesQuery_GetById_Null_Error()
        {
            _getContractTypesByContractTypesQuery.Ids = new long[] { 1, 2, 3 };
            var ContractTypes = new List<ContractType>
            {
                new ContractType{

                    Id = 4
                },
            };

            _contractTypeRepository.Setup(x => x.Query()).Returns(ContractTypes.AsQueryable().BuildMock());
            _contractTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<ContractType, bool>>>())).ReturnsAsync(() => null);

            var result = await _getContractTypesByContractTypesQueryHandler.Handle(_getContractTypesByContractTypesQuery, CancellationToken.None);

            result.Success.Should().BeFalse();
        }
    }
}
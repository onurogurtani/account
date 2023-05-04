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
using TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Utilities.IoC;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.ContractKinds.Queries
{
    [TestFixture]
    public class GetByFilterPagedContractKindsQueryTest
    {
        private GetByFilterPagedContractKindsQuery _getcontractKindQuery;
        private GetByFilterPagedContractKindsQuery.GetByFilterPagedContractKindsQueryHandler _getcontractKindQueryHandler;

        private Mock<IContractKindRepository> _contractKindRepository;

        Mock<IMapper> _mapper;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;

        [SetUp]
        public void Setup()
        {
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

            _contractKindRepository = new Mock<IContractKindRepository>();

            _mapper = new Mock<IMapper>();

            _getcontractKindQuery = new GetByFilterPagedContractKindsQuery();
            _getcontractKindQueryHandler = new GetByFilterPagedContractKindsQuery.GetByFilterPagedContractKindsQueryHandler(_contractKindRepository.Object, _mapper.Object);
        }

        [Test]
        public async Task GetByFilterPagedContractKindsQuery_Success()
        {
            _getcontractKindQuery = new()
            {
                ContractKindDto = new()
                {
                    ContractTypeIds = new List<long> { 1, 2 },
                    PageNumber = 1,
                    PageSize = 10,
                }
            };

            var contractKinds = new List<ContractKind>
            {
                new ContractKind{Id = 1, Name = "Test",ContractTypeId=1},
            };

            _contractKindRepository.Setup(x => x.Query()).Returns(contractKinds.AsQueryable().BuildMock());
            _mapper.Setup(s => s.Map<List<ContractKindDto>>(It.IsAny<List<ContractKind>>()))
                .Returns(new List<ContractKindDto> { new ContractKindDto() {
                    ContractTypeIds= new List<long> {1,2},
                    PageNumber = 1,
                    PageSize = 10,
                }
                });

            var result = await _getcontractKindQueryHandler.Handle(_getcontractKindQuery, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedContractKindsQuery_OrderBy_IdDESC_Success()
        {
            _getcontractKindQuery = new()
            {
                ContractKindDto = new()
                {
                    ContractTypeIds = new List<long> { 1, 2 },
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "IdDESC",

                }
            };

            var contractKinds = new List<ContractKind>
            {
                new ContractKind{Id = 1, Name = "Test",ContractTypeId=1, ContractType= new ContractType{Name="a", Id=1}, Description= "Test", RecordStatus=Core.Enums.RecordStatus.Active},
                new ContractKind{ Id = 2, Name = "Deneme",ContractTypeId=2, ContractType= new ContractType{Name="b", Id=2},Description= "Deneme", RecordStatus=Core.Enums.RecordStatus.Passive }
            };

            _contractKindRepository.Setup(x => x.Query()).Returns(contractKinds.AsQueryable().BuildMock());
            _mapper.Setup(s => s.Map<List<ContractKindDto>>(It.IsAny<List<ContractKind>>()))
                .Returns(new List<ContractKindDto> { new ContractKindDto() {
                    ContractTypeIds= new List<long> {1,2},
                    PageNumber = 1,
                    PageSize = 10,
                }
                });

            var result = await _getcontractKindQueryHandler.Handle(_getcontractKindQuery, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedContractKindsQuery_OrderBy_IdASC_Success()
        {
            _getcontractKindQuery = new()
            {
                ContractKindDto = new()
                {
                    ContractTypeIds = new List<long> { 1, 2 },
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "IdASC",

                }
            };

            var contractKinds = new List<ContractKind>
            {
                new ContractKind{Id = 1, Name = "Test",ContractTypeId=1, ContractType= new ContractType{Name="a", Id=1}, Description= "Test", RecordStatus=Core.Enums.RecordStatus.Active},
                new ContractKind{ Id = 2, Name = "Deneme",ContractTypeId=2, ContractType= new ContractType{Name="b", Id=2},Description= "Deneme", RecordStatus=Core.Enums.RecordStatus.Passive }
            };


            _contractKindRepository.Setup(x => x.Query()).Returns(contractKinds.AsQueryable().BuildMock());
            _mapper.Setup(s => s.Map<List<ContractKindDto>>(It.IsAny<List<ContractKind>>()))
                .Returns(new List<ContractKindDto> { new ContractKindDto() {
                    ContractTypeIds= new List<long> {1,2},
                    PageNumber = 1,
                    PageSize = 10,
                }
                });

            var result = await _getcontractKindQueryHandler.Handle(_getcontractKindQuery, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedContractKindsQuery_OrderBy_NameDESC_Success()
        {
            _getcontractKindQuery = new()
            {
                ContractKindDto = new()
                {
                    ContractTypeIds = new List<long> { 1, 2 },
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "NameDESC",

                }
            };

            var contractKinds = new List<ContractKind>
            {
                new ContractKind{Id = 1, Name = "Test",ContractTypeId=1, ContractType= new ContractType{Name="a", Id=1}, Description= "Test", RecordStatus=Core.Enums.RecordStatus.Active},
                new ContractKind{ Id = 2, Name = "Deneme",ContractTypeId=2, ContractType= new ContractType{Name="b", Id=2},Description= "Deneme", RecordStatus=Core.Enums.RecordStatus.Passive }
            };


            _contractKindRepository.Setup(x => x.Query()).Returns(contractKinds.AsQueryable().BuildMock());
            _mapper.Setup(s => s.Map<List<ContractKindDto>>(It.IsAny<List<ContractKind>>()))
                .Returns(new List<ContractKindDto> { new ContractKindDto() {
                    ContractTypeIds= new List<long> {1,2},
                    PageNumber = 1,
                    PageSize = 10,
                }
                });

            var result = await _getcontractKindQueryHandler.Handle(_getcontractKindQuery, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedContractKindsQuery_OrderBy_NameASC_Success()
        {
            _getcontractKindQuery = new()
            {
                ContractKindDto = new()
                {
                    ContractTypeIds = new List<long> { 1, 2 },
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "NameASC",

                }
            };

            var contractKinds = new List<ContractKind>
            {
                new ContractKind{Id = 1, Name = "Test",ContractTypeId=1, ContractType= new ContractType{Name="a", Id=1}, Description= "Test", RecordStatus=Core.Enums.RecordStatus.Active},
                new ContractKind{ Id = 2, Name = "Deneme",ContractTypeId=2, ContractType= new ContractType{Name="b", Id=2},Description= "Deneme", RecordStatus=Core.Enums.RecordStatus.Passive }
            };


            _contractKindRepository.Setup(x => x.Query()).Returns(contractKinds.AsQueryable().BuildMock());
            _mapper.Setup(s => s.Map<List<ContractKindDto>>(It.IsAny<List<ContractKind>>()))
                .Returns(new List<ContractKindDto> { new ContractKindDto() {
                    ContractTypeIds= new List<long> {1,2},
                    PageNumber = 1,
                    PageSize = 10,
                }
                });

            var result = await _getcontractKindQueryHandler.Handle(_getcontractKindQuery, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedContractKindsQuery_OrderBy_ContractTypeNameDESC_Success()
        {
            _getcontractKindQuery = new()
            {
                ContractKindDto = new()
                {
                    ContractTypeIds = new List<long> { 1, 2 },
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "ContractTypeNameDESC",

                }
            };

            var contractKinds = new List<ContractKind>
            {
                new ContractKind{Id = 1, Name = "Test",ContractTypeId=1, ContractType= new ContractType{Name="a", Id=1}, Description= "Test", RecordStatus=Core.Enums.RecordStatus.Active},
                new ContractKind{ Id = 2, Name = "Deneme",ContractTypeId=2, ContractType= new ContractType{Name="b", Id=2},Description= "Deneme", RecordStatus=Core.Enums.RecordStatus.Passive }
            };

            _contractKindRepository.Setup(x => x.Query()).Returns(contractKinds.AsQueryable().BuildMock());
            _mapper.Setup(s => s.Map<List<ContractKindDto>>(It.IsAny<List<ContractKind>>()))
                .Returns(new List<ContractKindDto> { new ContractKindDto() {
                    ContractTypeIds= new List<long> {1,2},
                    PageNumber = 1,
                    PageSize = 10,
                }
                });

            var result = await _getcontractKindQueryHandler.Handle(_getcontractKindQuery, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedContractKindsQuery_OrderBy_ContractTypeNameASC_Success()
        {
            _getcontractKindQuery = new()
            {
                ContractKindDto = new()
                {
                    ContractTypeIds = new List<long> { 1, 2 },
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "ContractTypeNameASC",

                }
            };

            var contractKinds = new List<ContractKind>
            {
                new ContractKind{Id = 1, Name = "Test",ContractTypeId=1, ContractType= new ContractType{Name="a", Id=1}, Description= "Test", RecordStatus=Core.Enums.RecordStatus.Active},
                new ContractKind{ Id = 2, Name = "Deneme",ContractTypeId=2, ContractType= new ContractType{Name="b", Id=2},Description= "Deneme", RecordStatus=Core.Enums.RecordStatus.Passive }
            };

            _contractKindRepository.Setup(x => x.Query()).Returns(contractKinds.AsQueryable().BuildMock());
            _mapper.Setup(s => s.Map<List<ContractKindDto>>(It.IsAny<List<ContractKind>>()))
                .Returns(new List<ContractKindDto> { new ContractKindDto() {
                    ContractTypeIds= new List<long> {1,2},
                    PageNumber = 1,
                    PageSize = 10,
                }
                });

            var result = await _getcontractKindQueryHandler.Handle(_getcontractKindQuery, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedContractKindsQuery_OrderBy_RecordStatusDESC_Success()
        {
            _getcontractKindQuery = new()
            {
                ContractKindDto = new()
                {
                    ContractTypeIds = new List<long> { 1, 2 },
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "RecordStatusDESC",

                }
            };

            var contractKinds = new List<ContractKind>
            {
                new ContractKind{Id = 1, Name = "Test",ContractTypeId=1, ContractType= new ContractType{Name="a", Id=1}, Description= "Test", RecordStatus=Core.Enums.RecordStatus.Active},
                new ContractKind{ Id = 2, Name = "Deneme",ContractTypeId=2, ContractType= new ContractType{Name="b", Id=2},Description= "Deneme", RecordStatus=Core.Enums.RecordStatus.Passive }
            };

            _contractKindRepository.Setup(x => x.Query()).Returns(contractKinds.AsQueryable().BuildMock());
            _mapper.Setup(s => s.Map<List<ContractKindDto>>(It.IsAny<List<ContractKind>>()))
                .Returns(new List<ContractKindDto> { new ContractKindDto() {
                    ContractTypeIds= new List<long> {1,2},
                    PageNumber = 1,
                    PageSize = 10,

                }
                });

            var result = await _getcontractKindQueryHandler.Handle(_getcontractKindQuery, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedContractKindsQuery_OrderBy_RecordStatusASC_Success()
        {
            _getcontractKindQuery = new()
            {
                ContractKindDto = new()
                {
                    ContractTypeIds = new List<long> { 1, 2 },
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "RecordStatusASC",

                }
            };

            var contractKinds = new List<ContractKind>
            {
                new ContractKind{Id = 1, Name = "Test",ContractTypeId=1, ContractType= new ContractType{Name="a", Id=1}, Description= "Test", RecordStatus=Core.Enums.RecordStatus.Active},
                new ContractKind{ Id = 2, Name = "Deneme",ContractTypeId=2, ContractType= new ContractType{Name="b", Id=2},Description= "Deneme", RecordStatus=Core.Enums.RecordStatus.Passive }
            };

            _contractKindRepository.Setup(x => x.Query()).Returns(contractKinds.AsQueryable().BuildMock());
            _mapper.Setup(s => s.Map<List<ContractKindDto>>(It.IsAny<List<ContractKind>>()))
                .Returns(new List<ContractKindDto> { new ContractKindDto() {
                    ContractTypeIds= new List<long> {1,2},
                    PageNumber = 1,
                    PageSize = 10,
                }
                });

            var result = await _getcontractKindQueryHandler.Handle(_getcontractKindQuery, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedContractKindsQuery_OrderBy_DescriptionDESC_Success()
        {
            _getcontractKindQuery = new()
            {
                ContractKindDto = new()
                {
                    ContractTypeIds = new List<long> { 1, 2 },
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "DescriptionDESC",

                }
            };

            var contractKinds = new List<ContractKind>
            {
                new ContractKind{Id = 1, Name = "Test",ContractTypeId=1, ContractType= new ContractType{Name="a", Id=1}, Description= "Test", RecordStatus=Core.Enums.RecordStatus.Active},
                new ContractKind{ Id = 2, Name = "Deneme",ContractTypeId=2, ContractType= new ContractType{Name="b", Id=2},Description= "Deneme", RecordStatus=Core.Enums.RecordStatus.Passive }
            };

            _contractKindRepository.Setup(x => x.Query()).Returns(contractKinds.AsQueryable().BuildMock());
            _mapper.Setup(s => s.Map<List<ContractKindDto>>(It.IsAny<List<ContractKind>>()))
                .Returns(new List<ContractKindDto> { new ContractKindDto() {
                    ContractTypeIds= new List<long> {1,2},
                    PageNumber = 1,
                    PageSize = 10,

                }
                });

            var result = await _getcontractKindQueryHandler.Handle(_getcontractKindQuery, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedContractKindsQuery_OrderBy_DescriptionASC_Success()
        {
            _getcontractKindQuery = new()
            {
                ContractKindDto = new()
                {
                    ContractTypeIds = new List<long> { 1, 2 },
                    PageNumber = 1,
                    PageSize = 10,
                    OrderBy = "DescriptionASC",

                }
            };

            var contractKinds = new List<ContractKind>
            {
                new ContractKind{Id = 1, Name = "Test",ContractTypeId=1, ContractType= new ContractType{Name="a", Id=1}, Description= "Test", RecordStatus=Core.Enums.RecordStatus.Active},
                new ContractKind{ Id = 2, Name = "Deneme",ContractTypeId=2, ContractType= new ContractType{Name="b", Id=2},Description= "Deneme", RecordStatus=Core.Enums.RecordStatus.Passive }
            };

            _contractKindRepository.Setup(x => x.Query()).Returns(contractKinds.AsQueryable().BuildMock());
            _mapper.Setup(s => s.Map<List<ContractKindDto>>(It.IsAny<List<ContractKind>>()))
                .Returns(new List<ContractKindDto> { new ContractKindDto() {
                    ContractTypeIds= new List<long> {1,2},
                    PageNumber = 1,
                    PageSize = 10,
                }
                });

            var result = await _getcontractKindQueryHandler.Handle(_getcontractKindQuery, new CancellationToken());

            result.Success.Should().BeTrue();
        }



    }
}
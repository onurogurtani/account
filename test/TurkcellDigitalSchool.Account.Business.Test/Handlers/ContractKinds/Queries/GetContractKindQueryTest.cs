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
using TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Utilities.IoC;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.ContractKinds.Queries
{
    [TestFixture]
    public class GetContractKindQueryTest
    {
        private GetContractKindQuery _getContractKindQuery;
        private GetContractKindQuery.GetContractKindQueryHandler _getContractKindQueryHandler;

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

            _getContractKindQuery = new GetContractKindQuery();
            _getContractKindQueryHandler = new GetContractKindQuery.GetContractKindQueryHandler( _contractKindRepository.Object);
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
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
using TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Queries.GetPackageTypeQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.PackageTypes.Queries
{
    [TestFixture]
    public class GetPackageTypeQueryTest
    {
        private GetPackageTypeQuery _getPackageTypeQuery;
        private GetPackageTypeQueryHandler _getPackageTypeQueryHandler;

        private Mock<IPackageTypeRepository> _packageTypeRepository;

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

            _packageTypeRepository = new Mock<IPackageTypeRepository>();

            _mapper = new Mock<IMapper>();

            _getPackageTypeQuery = new GetPackageTypeQuery();
            _getPackageTypeQueryHandler = new GetPackageTypeQueryHandler( _packageTypeRepository.Object);
        }

        [Test]
        public async Task GetPackageTypeQueryTest_Success()
        {
            _getPackageTypeQuery.Id = 1;

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen= true
                }

            };
            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());
            _packageTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<PackageType, bool>>>())).ReturnsAsync(pageTypes.FirstOrDefault());

            var result = await _getPackageTypeQueryHandler.Handle(_getPackageTypeQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
        [Test]
        public async Task GetPackageTypeQueryTest_GetById_Null_Error()
        {
            _getPackageTypeQuery.Id = 1;

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 2,
                    IsActive= true,
                    Name = "Deneme"
                }

            };
            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());
            _packageTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<PackageType, bool>>>())).ReturnsAsync(() => null);

            var result = await _getPackageTypeQueryHandler.Handle(_getPackageTypeQuery, CancellationToken.None);


            result.Success.Should().BeFalse();
        }

    }
}
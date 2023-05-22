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
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using static TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries.GetPackageQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Packages.Queries
{
    [TestFixture]
    public class GetPackageQueryTest
    {
        private GetPackageQuery _getPackageQuery;
        private GetPackageQueryHandler _getPackageQueryHandler;

        private Mock<IPackageRepository> _packageRepository;

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

            _packageRepository = new Mock<IPackageRepository>();

            _getPackageQuery = new GetPackageQuery();
            _getPackageQueryHandler = new GetPackageQueryHandler(_packageRepository.Object);
        }

        [Test]
        public async Task GetPackageQueryTest_Success()
        {
            _getPackageQuery.Id = 1;

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    FinishDate = DateTime.Now,
                    HasCoachService = false,
                    HasMotivationEvent = false,
                    HasTryingTest = false,
                    InsertUserId = 1,
                    IsActive = true,
                    TryingTestQuestionCount = 0,
                    StartDate = DateTime.Now,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId = 1,
                    UpdateTime = DateTime.Now,
                    Summary = "Test",
                    Content = "Test",
                    EducationYearId = 1,
                },

            };
            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());
            _packageRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Package, bool>>>())).ReturnsAsync(pageTypes.FirstOrDefault());

            var result = await _getPackageQueryHandler.Handle(_getPackageQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetPackageQueryTest_GetById_Null_Error()
        {
            _getPackageQuery.Id = 1;

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 2,
                    FinishDate = DateTime.Now,
                    HasCoachService = false,
                    HasMotivationEvent = false,
                    HasTryingTest = false,
                    InsertUserId = 1,
                    IsActive = true,
                    TryingTestQuestionCount = 0,
                    StartDate = DateTime.Now,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId = 1,
                    UpdateTime = DateTime.Now,
                    Summary = "Test",
                    Content = "Test",
                    EducationYearId = 1,
                },

            };
            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());
            _packageRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Package, bool>>>())).ReturnsAsync(() => null);

            var result = await _getPackageQueryHandler.Handle(_getPackageQuery, CancellationToken.None);

            result.Success.Should().BeFalse();
        }
    }
}
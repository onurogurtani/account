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
using TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using static TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Queries.GetTargetScreenQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.TargetScreens.Queries
{
    [TestFixture]
    public class GetTargetScreenQueryTest
    {
        private GetTargetScreenQuery _getTargetScreenQueryTest;
        private GetTargetScreenQueryHandler _getTargetScreenQueryTestHandler;

        private Mock<ITargetScreenRepository> _targetScreenRepository;

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

            _targetScreenRepository = new Mock<ITargetScreenRepository>();

            _getTargetScreenQueryTest = new GetTargetScreenQuery();
            _getTargetScreenQueryTestHandler = new GetTargetScreenQueryHandler(_targetScreenRepository.Object);
        }

        [Test]
        public async Task GetTargetScreenQueryTest_Success()
        {
            _getTargetScreenQueryTest.Id = 1;

            var targetScreen = new List<TargetScreen>
            {
                new TargetScreen{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                    PageName = "Test",
                }

            };
            _targetScreenRepository.Setup(x => x.Query()).Returns(targetScreen.AsQueryable().BuildMock());
            _targetScreenRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<TargetScreen, bool>>>())).ReturnsAsync(targetScreen.FirstOrDefault());

            var result = await _getTargetScreenQueryTestHandler.Handle(_getTargetScreenQueryTest, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetTargetScreenQueryTest_GetById_Null_Error()
        {
            _getTargetScreenQueryTest.Id = 1;

            var targetScreen = new List<TargetScreen>
            {
                new TargetScreen{
                    Id = 2,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                    PageName = "Test",
                }

            };

            _targetScreenRepository.Setup(x => x.Query()).Returns(targetScreen.AsQueryable().BuildMock());
            _targetScreenRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<TargetScreen, bool>>>())).ReturnsAsync(() => null);

            var result = await _getTargetScreenQueryTestHandler.Handle(_getTargetScreenQueryTest, CancellationToken.None);

            result.Success.Should().BeFalse();
        }
    }
}
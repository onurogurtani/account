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
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Queries.GetTargetScreenQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.TargetScreens.Queries
{
    [TestFixture]
    public class GetTargetScreenQueryTest
    {
        private GetTargetScreenQuery _getTargetScreenQueryTest;
        private GetTargetScreenQueryHandler _getTargetScreenQueryTestHandler;

        private Mock<ITargetScreenRepository> _targetScreenRepository;

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

            _targetScreenRepository = new Mock<ITargetScreenRepository>();

            _mapper = new Mock<IMapper>();

            _getTargetScreenQueryTest = new GetTargetScreenQuery();
            _getTargetScreenQueryTestHandler = new GetTargetScreenQueryHandler( _targetScreenRepository.Object);
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
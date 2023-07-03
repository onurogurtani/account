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
using TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Queries.GetTargetScreenQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.TargetScreens.Queries
{
    [TestFixture]
    public class GetTargetScreenQueryTest
    {
        private GetTargetScreenQuery _getTargetScreenQueryTest;
        private GetTargetScreenQueryHandler _getTargetScreenQueryTestHandler;

        private Mock<ITargetScreenRepository> _targetScreenRepository;

        [SetUp]
        public void Setup()
        {
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
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
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries.GetPackageQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Packages.Queries
{
    [TestFixture]
    public class GetPackageQueryTest
    {
        private GetPackageQuery _getPackageQuery;
        private GetPackageQueryHandler _getPackageQueryHandler;

        private Mock<IPackageRepository> _packageRepository;

        [SetUp]
        public void Setup()
        {
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
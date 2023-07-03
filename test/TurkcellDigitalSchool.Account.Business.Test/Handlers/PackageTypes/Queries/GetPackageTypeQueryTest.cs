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
using TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Queries.GetPackageTypeQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.PackageTypes.Queries
{
    [TestFixture]
    public class GetPackageTypeQueryTest
    {
        private GetPackageTypeQuery _getPackageTypeQuery;
        private GetPackageTypeQueryHandler _getPackageTypeQueryHandler;

        private Mock<IPackageTypeRepository> _packageTypeRepository;

        [SetUp]
        public void Setup()
        {
            _packageTypeRepository = new Mock<IPackageTypeRepository>();

            _getPackageTypeQuery = new GetPackageTypeQuery();
            _getPackageTypeQueryHandler = new GetPackageTypeQueryHandler(_packageTypeRepository.Object);
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
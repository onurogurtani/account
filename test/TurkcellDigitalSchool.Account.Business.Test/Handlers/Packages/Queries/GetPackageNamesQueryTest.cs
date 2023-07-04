using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries.GetPackageNamesQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Packages.Queries
{
    [TestFixture]
    public class GetPackageNamesQueryTest
    {
        private GetPackageNamesQuery _getPackageNamesQuery;
        private GetPackageNamesQueryHandler _getPackageNamesQueryHandler;

        private Mock<IPackageRepository> _packageRepository;

        [SetUp]
        public void Setup()
        {
            _packageRepository = new Mock<IPackageRepository>();

            _getPackageNamesQuery = new GetPackageNamesQuery();
            _getPackageNamesQueryHandler = new GetPackageNamesQueryHandler(_packageRepository.Object);
        }

        [Test]
        public async Task GetPackageNamesQueryTest_Success()
        {
            _getPackageNamesQuery = new GetPackageNamesQuery();

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    Name = "Test"
                },

            };
            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getPackageNamesQueryHandler.Handle(_getPackageNamesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
    }
}
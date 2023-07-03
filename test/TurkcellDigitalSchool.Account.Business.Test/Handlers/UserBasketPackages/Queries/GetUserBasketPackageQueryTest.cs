using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.UserBasketPackages.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using static TurkcellDigitalSchool.Account.Business.Handlers.UserBasketPackages.Queries.GetUserBasketPackagesQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.UserBasketPackages.Queries
{
    [TestFixture]
    public class GetUserBasketPackageQueryTest
    {
        private GetUserBasketPackagesQuery _getUserBasketPackagesQuery;
        private GetUserBasketPackagesQueryHandler _getUserBasketPackagesQueryHandler;

        private Mock<IUserBasketPackageRepository> _userBasketPackageRepository;
        private Mock<ITokenHelper> _tokenHelper;

        [SetUp]
        public void Setup()
        {
            _userBasketPackageRepository = new Mock<IUserBasketPackageRepository>();
            _tokenHelper = new Mock<ITokenHelper>();

            _getUserBasketPackagesQuery = new GetUserBasketPackagesQuery();
            _getUserBasketPackagesQueryHandler = new GetUserBasketPackagesQueryHandler(_userBasketPackageRepository.Object, _tokenHelper.Object);
        }

        [Test]
        public async Task GetUserBasketPackagesQuery_Success()
        {
            _getUserBasketPackagesQuery = new()
            {
                Pagination = new() { PageNumber = 1, PageSize = 10 },
            };

            var userBasketPackages = new List<UserBasketPackage>
            {
                 new UserBasketPackage{
                    Id = 1,
                    InsertUserId= 1,
                    PackageId= 1,
                    Package = new Package{ Id=1,},
                    Quantity=1,
                    UserId=1,
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                }
            };

            _tokenHelper.Setup(x => x.GetUserIdByCurrentToken()).Returns(1);

            _userBasketPackageRepository.Setup(x => x.Query()).Returns(userBasketPackages.AsQueryable().BuildMock());

            var result = await _getUserBasketPackagesQueryHandler.Handle(_getUserBasketPackagesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
    }
}
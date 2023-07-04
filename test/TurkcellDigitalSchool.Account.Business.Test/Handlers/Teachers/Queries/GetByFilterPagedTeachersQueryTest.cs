using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Enums;
using static TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Queries.GetByFilterPagedTeachersQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Teachers.Queries
{
    [TestFixture]
    public class GetByFilterPagedTeachersQueryTest
    {
        private GetByFilterPagedTeachersQuery _getByFilterPagedTeachersQuery;
        private GetByFilterPagedTeachersQueryHandler _getByFilterPagedTeachersQueryHandler;

        private Mock<IUserRepository> _userRepository;
        private Mock<IMapper> _mapper;

        List<User> _fakeUsers;

        [SetUp]
        public void Setup()
        {
            _mapper = new Mock<IMapper>();
            _userRepository = new Mock<IUserRepository>();

            _getByFilterPagedTeachersQuery = new GetByFilterPagedTeachersQuery();
            _getByFilterPagedTeachersQueryHandler = new GetByFilterPagedTeachersQueryHandler(_userRepository.Object, _mapper.Object);

            _fakeUsers = new List<User>
            {
                new User{
                    Id = 1,
                    UserName = "Ali",
                    SurName = "UnitTest",
                    Status = true,
                    ResidenceCountyId = 1, ResidenceCityId = 1,
                    RemindLater = true,
                    RelatedIdentity = "UnitTest",
                    RegisterStatus = RegisterStatus.Registered,
                    AddingType = UserAddingType.Default,
                    Address = "Adres",
                    CitizenId = 12345676787,
                    Email = "email@hotmail.com",
                    MobilePhones = "5554443322",
                    UserType = UserType.Teacher,
                    IsDeleted = false
                }
            };
        }

        [Test]
        public async Task GetByFilterPagedTeachersQuery_Success()
        {
            _getByFilterPagedTeachersQuery = new()
            {
                Pagination = new Core.Utilities.Paging.PaginationQuery
                {
                    PageNumber = 1,
                    PageSize = 10
                }
            };

            _userRepository.Setup(x => x.Query()).Returns(_fakeUsers.AsQueryable().BuildMock());

            var result = await _getByFilterPagedTeachersQueryHandler.Handle(_getByFilterPagedTeachersQuery, new CancellationToken());

            result.Success.Should().BeTrue();
        }
    }
}


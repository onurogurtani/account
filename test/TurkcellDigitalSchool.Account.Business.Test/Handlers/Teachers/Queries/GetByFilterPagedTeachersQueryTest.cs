using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using static TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Queries.GetByFilterPagedTeachersQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Teachers.Queries
{
    [TestFixture]
    public class GetByFilterPagedTeachersQueryTest
    {
        GetByFilterPagedTeachersQuery _getByFilterPagedTeachersQuery;
        GetByFilterPagedTeachersQueryHandler _getByFilterPagedTeachersQueryHandler;

        Mock<IUserRepository> _userRepository;

        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpRequest;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IServiceProvider> _serviceProvider;
        Mock<IMediator> _mediator;
        Mock<IMapper> _mapper;
        Mock<RedisService> _redisService;

        List<User> _fakeUsers;

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


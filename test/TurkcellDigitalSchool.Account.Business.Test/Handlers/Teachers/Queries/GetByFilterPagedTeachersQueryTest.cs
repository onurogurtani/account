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
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete.Core; 
using static TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Queries.GetByFilterPagedTeachersQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Teachers.Queries
{
    [TestFixture]
    public class GetByFilterPagedTeachersQueryTest
    {
        GetByFilterPagedTeachersQuery _getByFilterPagedTeachersQuery;
        GetByFilterPagedTeachersQueryHandler _getByFilterPagedTeachersQueryHandler;

        Mock<IUserRepository> _userRepository;
        Mock<IMapper> _mapper;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;

        List<User> _fakeUsers;

        [SetUp]
        public void Setup()
        {
            _userRepository = new Mock<IUserRepository>();
            _mapper = new Mock<IMapper>();

            _getByFilterPagedTeachersQuery = new GetByFilterPagedTeachersQuery();
            _getByFilterPagedTeachersQueryHandler = new GetByFilterPagedTeachersQueryHandler(_userRepository.Object, _mapper.Object);

            _mediator = new Mock<IMediator>();
            _serviceProvider = new Mock<IServiceProvider>();
            _httpContextAccessor = new Mock<IHttpContextAccessor>();
            _httpContext = new Mock<HttpRequest>();
            _headerDictionary = new Mock<IHeaderDictionary>();

            _serviceProvider.Setup(x => x.GetService(typeof(IMediator))).Returns(_mediator.Object);
            ServiceTool.ServiceProvider = _serviceProvider.Object;
            _headerDictionary.Setup(x => x["Referer"]).Returns("");
            _httpContext.Setup(x => x.Headers).Returns(_headerDictionary.Object);
            _httpContextAccessor.Setup(x => x.HttpContext.Request).Returns(_httpContext.Object);
            _serviceProvider.Setup(x => x.GetService(typeof(IHttpContextAccessor))).Returns(_httpContextAccessor.Object);

            _fakeUsers = new List<User>
            {
                new User{
                    Id = 1,
                    UserName = "Ali",
                    SurName = "UnitTest",
                    Status = true,
                    ResidenceCounty = "County",
                    ResidenceCity = "City",
                    RemindLater = true,
                    RelatedIdentity = "UnitTest",
                    RegisterStatus = Core.Enums.RegisterStatus.Registered,
                    AddingType = UserAddingType.Default,
                    Address = "Adres",
                    CitizenId = 12345676787,
                    Email = "email@hotmail.com",
                    MobilePhones = "5554443322",
                    UserType = Core.Enums.UserType.Teacher,
                    IsDeleted = false
                }
            };
        }

        [Test]
        public async Task GetByFilterPagedTeachersQuery_Success()
        {
            _getByFilterPagedTeachersQuery = new()
            {
                Pagination =new Core.Utilities.Paging.PaginationQuery
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


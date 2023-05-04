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
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Enums;
using static TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Queries.GetTeacherQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Teachers.Queries
{
    [TestFixture]
    public class GetTeacherQueryTest
    {
        private GetTeacherQuery _getTeacherQuery;
        private GetTeacherQueryHandler _getTeacherQueryHandler;

        private Mock<IUserRepository> _userRepository;
        private Mock<IMapper> _mapper;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;

        List<User> _fakeUsers;

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

            _userRepository = new Mock<IUserRepository>();
            _mapper = new Mock<IMapper>();

            _getTeacherQuery = new GetTeacherQuery();
            _getTeacherQueryHandler = new GetTeacherQueryHandler(_userRepository.Object, _mapper.Object);

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
        public async Task GetTeacherQuery_Success()
        {
            _getTeacherQuery = new()
            {
                Id = 1
            };
            _userRepository.Setup(x => x.Query()).Returns(_fakeUsers.AsQueryable().BuildMock());

            var result = await _getTeacherQueryHandler.Handle(_getTeacherQuery, new CancellationToken());

            result.Success.Should().BeTrue();
        }

    }

}


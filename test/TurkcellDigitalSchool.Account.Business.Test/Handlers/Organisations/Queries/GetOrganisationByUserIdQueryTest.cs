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
using TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using static TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries.GetOrganisationByUserIdQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Organisations.Queries
{
    [TestFixture]
    public class GetOrganisationByUserIdQueryTest
    {
        private GetOrganisationByUserIdQuery _getOrganisationByUserIdQuery;
        private GetOrganisationByUserIdQueryHandler _getOrganisationByUserIdQueryHandler;

        private Mock<IOrganisationUserRepository> _organisationUserRepository;
        private Mock<ITokenHelper> _tokenHelper;

        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpRequest;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IServiceProvider> _serviceProvider;
        Mock<IMediator> _mediator;
        Mock<IMapper> _mapper;
        Mock<RedisService> _redisService;

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

            _organisationUserRepository = new Mock<IOrganisationUserRepository>();
            _tokenHelper = new Mock<ITokenHelper>();

            _getOrganisationByUserIdQuery = new GetOrganisationByUserIdQuery();
            _getOrganisationByUserIdQueryHandler = new GetOrganisationByUserIdQueryHandler(_organisationUserRepository.Object, _tokenHelper.Object);
        }

        [Test]
        public async Task GetOrganisationByUserIdQueryTest_Success()
        {
            var organisationUsers = new List<OrganisationUser>
            {
                new OrganisationUser{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                    UserId=1,
                    OrganisationId=1,
                    User= new User{ Id=1, },
                    Organisation= new Organisation{ Id=1}
                }

            };
            _tokenHelper.Setup(x => x.GetUserIdByCurrentToken()).Returns(1);
            _organisationUserRepository.Setup(x => x.Query()).Returns(organisationUsers.AsQueryable().BuildMock());

            var result = await _getOrganisationByUserIdQueryHandler.Handle(_getOrganisationByUserIdQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetOrganisationByUserIdQueryTest_RecordIsNotFound_Error()
        {
            var organisationUsers = new List<OrganisationUser>
            {
                new OrganisationUser{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now,
                    UserId=2,
                    OrganisationId=1,
                    User= new  User{ Id=2, },
                    Organisation= new Organisation{ Id=1}
                }

            };
            _tokenHelper.Setup(x => x.GetUserIdByCurrentToken()).Returns(1);
            _organisationUserRepository.Setup(x => x.Query()).Returns(organisationUsers.AsQueryable().BuildMock());

            var result = await _getOrganisationByUserIdQueryHandler.Handle(_getOrganisationByUserIdQuery, CancellationToken.None);

            result.Success.Should().BeFalse();
        }
    }
}
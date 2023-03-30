using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Dtos.OrganisationDtos;
using TurkcellDigitalSchool.Entities.Dtos.OrganisationUserDtos;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Organisations.Queries
{
    [TestFixture]
    public class GetUserOrganisationInfoByOrganisationIdQueryTest
    {
        private GetUserOrganisationInfoByOrganisationIdQuery _getUserOrganisationInfoByOrganisationIdQuery;
        private GetUserOrganisationInfoByOrganisationIdQuery.GetUserOrganisationInfoByOrganisationIdQueryHandler _getUserOrganisationInfoByOrganisationIdQueryHandler;

        private Mock<IOrganisationUserRepository> _organisationUserRepository;
        private Mock<ITokenHelper> _tokenHelper;
        private Mock<ICityRepository> _cityRepository;
        private Mock<ICountyRepository> _countyRepository;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;

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

            _organisationUserRepository = new Mock<IOrganisationUserRepository>();
            _tokenHelper = new Mock<ITokenHelper>();
            _cityRepository = new Mock<ICityRepository>();
            _countyRepository = new Mock<ICountyRepository>();


            _getUserOrganisationInfoByOrganisationIdQuery = new GetUserOrganisationInfoByOrganisationIdQuery();
            _getUserOrganisationInfoByOrganisationIdQueryHandler = new GetUserOrganisationInfoByOrganisationIdQuery.GetUserOrganisationInfoByOrganisationIdQueryHandler(_cityRepository.Object, _countyRepository.Object,_mediator.Object, _tokenHelper.Object);
        }

        [Test]
        public async Task GetUserOrganisationInfoByOrganisationIdQueryTest_Success()
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
                    User= new Entities.Concrete.Core.User{
                        Id=1,
                    OrganisationUsers= new List<OrganisationUser>{
                        new OrganisationUser { 
                            Id = 1, UserId = 1, OrganisationId = 1, User = new Entities.Concrete.Core.User { Id = 1 },
                            Organisation = new Organisation { Id = 1 } } 
                    }
                    },
                    Organisation= new Organisation{ Id=1, OrganisationTypeId=1, OrganisationType= new OrganisationType{ Id=1},  }
                }

            };
            _cityRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<City, bool>>>())).ReturnsAsync(new City());
            _countyRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<County, bool>>>())).ReturnsAsync(new County());

            _tokenHelper.Setup(x => x.GetCurrentOrganisationId()).Returns(1);
            _mediator.Setup(m => m.Send(It.IsAny<GetOrganisationByUserIdQuery>(), CancellationToken.None))
                .ReturnsAsync(new SuccessDataResult<OrganisationUsersDto>(new OrganisationUsersDto { UserId = 1, OrganisationUsers = new List<OrganisationUserDto> { new OrganisationUserDto { Id = 1, CityName="Test", CountyName="Deneme" } } }));

            var result = await _getUserOrganisationInfoByOrganisationIdQueryHandler.Handle(_getUserOrganisationInfoByOrganisationIdQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetUserOrganisationInfoByOrganisationIdQueryTest_RecordIsNotFound_Error()
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
                    User= new Entities.Concrete.Core.User{ Id=2, },
                    Organisation= new Organisation{ Id=1}
                }

            };
            _tokenHelper.Setup(x => x.GetCurrentOrganisationId()).Returns(2);
            _mediator.Setup(m => m.Send(It.IsAny<GetOrganisationByUserIdQuery>(), CancellationToken.None))
                .ReturnsAsync(new SuccessDataResult<OrganisationUsersDto>(new OrganisationUsersDto { UserId = 1,OrganisationUsers= new List<OrganisationUserDto> { new OrganisationUserDto {  Id=1} } }));

            var result = await _getUserOrganisationInfoByOrganisationIdQueryHandler.Handle(_getUserOrganisationInfoByOrganisationIdQuery, CancellationToken.None);

            result.Success.Should().BeFalse();
        }

    }
}
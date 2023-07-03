using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MediatR;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using static TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries.GetUserOrganisationInfoByOrganisationIdQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Organisations.Queries
{
    [TestFixture]
    public class GetUserOrganisationInfoByOrganisationIdQueryTest
    {
        private GetUserOrganisationInfoByOrganisationIdQuery _getUserOrganisationInfoByOrganisationIdQuery;
        private GetUserOrganisationInfoByOrganisationIdQueryHandler _getUserOrganisationInfoByOrganisationIdQueryHandler;

        private Mock<ITokenHelper> _tokenHelper;
        private Mock<ICityRepository> _cityRepository;
        private Mock<ICountyRepository> _countyRepository;
        private Mock<IMediator> _mediator;

        [SetUp]
        public void Setup()
        {
            _mediator = new Mock<IMediator>();
            _tokenHelper = new Mock<ITokenHelper>();
            _cityRepository = new Mock<ICityRepository>();
            _countyRepository = new Mock<ICountyRepository>();

            _getUserOrganisationInfoByOrganisationIdQuery = new GetUserOrganisationInfoByOrganisationIdQuery();
            _getUserOrganisationInfoByOrganisationIdQueryHandler = new GetUserOrganisationInfoByOrganisationIdQueryHandler(_cityRepository.Object, _countyRepository.Object, _mediator.Object, _tokenHelper.Object);
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
                    User= new User{
                        Id=1,
                    OrganisationUsers= new List<OrganisationUser>{
                        new OrganisationUser {
                            Id = 1, UserId = 1, OrganisationId = 1, User = new  User { Id = 1 },
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
                .ReturnsAsync(new SuccessDataResult<OrganisationUsersDto>(new OrganisationUsersDto { UserId = 1, OrganisationUsers = new List<OrganisationUserDto> { new OrganisationUserDto { Id = 1, CityName = "Test", CountyName = "Deneme" } } }));

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
                    User= new  User{ Id=2, },
                    Organisation= new Organisation{ Id=1}
                }

            };
            _tokenHelper.Setup(x => x.GetCurrentOrganisationId()).Returns(2);
            _mediator.Setup(m => m.Send(It.IsAny<GetOrganisationByUserIdQuery>(), CancellationToken.None))
                .ReturnsAsync(new SuccessDataResult<OrganisationUsersDto>(new OrganisationUsersDto { UserId = 1, OrganisationUsers = new List<OrganisationUserDto> { new OrganisationUserDto { Id = 1 } } }));

            var result = await _getUserOrganisationInfoByOrganisationIdQueryHandler.Handle(_getUserOrganisationInfoByOrganisationIdQuery, CancellationToken.None);

            result.Success.Should().BeFalse();
        }
    }
}
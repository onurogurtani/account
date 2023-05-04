using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.IoC;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Organisations.Queries
{
    public class GetOrganisationQueryTest
    {


        private GetOrganisationQuery _getOrganisationQuery;
        private GetOrganisationQuery.GetOrganisationQueryHandler _getOrganisationQueryHandler;

        private Mock<IOrganisationRepository> _organisationRepository;
        private Mock<IUserRepository> _userRepository;
        private Mock<ICityRepository> _cityRepository;
        private Mock<ICountyRepository> _countyRepository;
        private Mock<IMapper> _mapper;



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

            _organisationRepository = new Mock<IOrganisationRepository>();
            _userRepository = new Mock<IUserRepository>();
            _countyRepository = new Mock<ICountyRepository>();
            _cityRepository = new Mock<ICityRepository>();
            _mapper = new Mock<IMapper>();

            _getOrganisationQuery = new GetOrganisationQuery();

             
            _getOrganisationQueryHandler = new GetOrganisationQuery.GetOrganisationQueryHandler(_organisationRepository.Object, _userRepository.Object, _cityRepository.Object, _countyRepository.Object, _mapper.Object);
        }


        [Test]
        public async Task GetOrganisationQuery_Success()
        {
            _getOrganisationQuery = new GetOrganisationQuery
            {
                Id = 1,
            };

            var organisationDtos =
                new OrganisationDto
                {
                    Id = 1,
                    SegmentType = SegmentType.PA,
                    CityId = 1,
                    CountyId = 1
                };

            var organisations = new List<Organisation>{
                new Organisation{
                    Id = 1,
                }
            };

            var cities = new List<City>
            {
                new City
                {
                    Id = 1,
                    Name = "Test"
                }
            };
            var countries = new List<County>
            {
                new County
                {
                    Id = 1,
                    Name = "Test"
                }
            };

            _cityRepository.Setup(x => x.Query()).Returns(cities.AsQueryable().BuildMock()); 
            _cityRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<City, bool>>>())).ReturnsAsync(cities.FirstOrDefault());

            _countyRepository.Setup(x => x.Query()).Returns(countries.AsQueryable().BuildMock());
            _countyRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<County, bool>>>())).ReturnsAsync(countries.FirstOrDefault());

            _mapper.Setup(s => s.Map<OrganisationDto>(organisations[0])).Returns(organisationDtos);

            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Organisation, bool>>>())).ReturnsAsync(organisations.FirstOrDefault());

            var result = await _getOrganisationQueryHandler.Handle(_getOrganisationQuery, new CancellationToken());

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetOrganisationQuery_Error()
        {
            _getOrganisationQuery = new GetOrganisationQuery
            {
                Id = 0,
            };

            var organisationDtos =
                new OrganisationDto
                {
                    Id = 1,
                };

            var organisations = new List<Organisation>{
                new Organisation{
                    Id = 1,
                }
            };
            var organisation = new List<OrganisationDto>{
                new OrganisationDto{
                }
            };
            _mapper.Setup(s => s.Map<OrganisationDto>(organisations[0])).Returns(organisationDtos);

            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Organisation, bool>>>())).ReturnsAsync(organisations.FirstOrDefault());

            var result = await _getOrganisationQueryHandler.Handle(_getOrganisationQuery, new CancellationToken());

            result.Success.Should().BeFalse();
        }
    }
}

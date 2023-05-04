using AutoMapper;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using System.Linq.Expressions;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Integration.IntegrationServices.FileServices;
using TurkcellDigitalSchool.Integration.IntegrationServices.FileServices.Model.Request;
using TurkcellDigitalSchool.Integration.IntegrationServices.FileServices.Model.Response;
using TurkcellDigitalSchool.Integration.IntegrationServices.FileServices.Model.Response.Dto;
using File = TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly.File;
using OrganisationChangeReqContent = TurkcellDigitalSchool.Account.Domain.Concrete.OrganisationChangeReqContent;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.OrganisationChangeRequests.Queries
{
    [TestFixture]
    public class GetOrganisationChangeRequestByIdQueryTest
    {
        private GetOrganisationChangeRequestByIdQuery _getOrganisationChangeRequestByIdQuery;
        private GetOrganisationChangeRequestByIdQuery.GetOrganisationChangeRequestByIdQueryHandler _getOrganisationChangeRequestByIdQueryHandler;
        private Mock<ICityRepository> _cityRepository;
        private Mock<ICountyRepository> _countyRepository;
        Mock<IFileServices> _fileService;

        private Mock<IOrganisationInfoChangeRequestRepository> _organisationInfoChangeRequestRepository;
        private Mock<IOrganisationChangeReqContentRepository> _organisationChangeReqContentRepository;

        Mock<IMapper> _mapper;

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

            _organisationInfoChangeRequestRepository = new Mock<IOrganisationInfoChangeRequestRepository>();
            _organisationChangeReqContentRepository = new Mock<IOrganisationChangeReqContentRepository>();

            _countyRepository = new Mock<ICountyRepository>();
            _cityRepository = new Mock<ICityRepository>();
            _fileService = new Mock<IFileServices>();
            _mapper = new Mock<IMapper>();

            _getOrganisationChangeRequestByIdQuery = new GetOrganisationChangeRequestByIdQuery();
            _getOrganisationChangeRequestByIdQueryHandler = new GetOrganisationChangeRequestByIdQuery.GetOrganisationChangeRequestByIdQueryHandler(_organisationInfoChangeRequestRepository.Object, _cityRepository.Object, _countyRepository.Object,
               _fileService.Object, _mapper.Object);
        }

        [Test]
        public async Task GetOrganisationChangeRequestByIdQueryTest_Success()
        {
            _getOrganisationChangeRequestByIdQuery.Id = 1;

            var pageTypes = new List<OrganisationInfoChangeRequest>
            {
                new OrganisationInfoChangeRequest{
                    Id = 1,
                    InsertUserId= 3,
                    InsertTime = DateTime.Today,
                    UpdateUserId= 5,
                    UpdateTime= DateTime.Today,
                    RequestDate=DateTime.Today,OrganisationId=1,
                    Organisation= new Organisation{Id=1, CustomerManager="Zeynep"},
                    RequestState=OrganisationChangeRequestState.Forwarded,
                    ResponseState=OrganisationChangeResponseState.BeingEvaluated,
                    OrganisationChangeReqContents =  new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=1,
                            RequestId=1,
                            PropertyEnum=OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Test",
                        },
                        new OrganisationChangeReqContent
                        {
                            Id=1,
                            RequestId=1,
                            PropertyEnum=OrganisationChangePropertyEnum.OrganisationAddress,
                            PropertyValue="Test Adres",
                        }

                    }
                }
            };
            var reqContent = new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=1,
                            RequestId=1,
                            PropertyEnum=OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Test",
                        },
                        new OrganisationChangeReqContent
                        {
                            Id=1,
                            RequestId=1,
                            PropertyEnum=OrganisationChangePropertyEnum.OrganisationAddress,
                            PropertyValue="Test Adres",
                        }

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

            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());
            _organisationInfoChangeRequestRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<OrganisationInfoChangeRequest, bool>>>())).ReturnsAsync(pageTypes.FirstOrDefault());

            _organisationChangeReqContentRepository.Setup(x => x.Query()).Returns(reqContent.AsQueryable().BuildMock());
            _organisationChangeReqContentRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<OrganisationChangeReqContent, bool>>>())).ReturnsAsync(reqContent.FirstOrDefault());

            _fileService.Setup(x => x.GetFileQuery(It.IsAny<GetFileIntegrationRequest>())).ReturnsAsync(new GetFileQueryIntegrationResponse()
            {
                Data = new Integration.IntegrationServices.FileServices.Model.Response.Dto.FileDto 
                {
                    Id = 1,
                    FileName = "Test.jpg",
                    File = new byte[1024]
                },
                Success = true
            });


            var logo = new List<File> { 
                new  File{
                Id = 214, FileName = "test", FilePath="/kg/test" } };

            var organisationLogos = new List<File> { new File { Id = 214, FileName = "test", FilePath = "/kg/test" } };
            

            _mapper.Setup(s => s.Map<GetOrganisationInfoChangeRequestDto>(pageTypes[0])).Returns(new GetOrganisationInfoChangeRequestDto {
                OrganisationChangeReqContents= new List<GetOrganisationChangeReqContentDto> { 
            new GetOrganisationChangeReqContentDto
            {
                Id=1,
                PropertyEnum=OrganisationChangePropertyEnum.Logo,
                RequestId=1,
                PropertyValue="214"

            }
            
            } });

            var result = await _getOrganisationChangeRequestByIdQueryHandler.Handle(_getOrganisationChangeRequestByIdQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetOrganisationChangeRequestByIdQueryTest_GetById_Null_Error()
        {
            _getOrganisationChangeRequestByIdQuery.Id = 3;

            var pageTypes = new List<OrganisationInfoChangeRequest>
            {
                new OrganisationInfoChangeRequest{
                    Id = 1,
                    InsertUserId= 3,
                    InsertTime = DateTime.Today,
                    UpdateUserId= 5,
                    UpdateTime= DateTime.Today,
                    RequestDate=DateTime.Today,OrganisationId=1,
                    Organisation= new Organisation{Id=1, CustomerManager="Zeynep"},
                    RequestState=OrganisationChangeRequestState.Forwarded,
                    ResponseState=OrganisationChangeResponseState.BeingEvaluated,
                    OrganisationChangeReqContents =  new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=1,
                            RequestId=1,
                            PropertyEnum=OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Test",
                        },
                        new OrganisationChangeReqContent
                        {
                            Id=1,
                            RequestId=1,
                            PropertyEnum=OrganisationChangePropertyEnum.OrganisationAddress,
                            PropertyValue="Test Adres",
                        }

                    }
                }
            };
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());
            _organisationInfoChangeRequestRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<OrganisationInfoChangeRequest, bool>>>())).ReturnsAsync(() => null);

            var result = await _getOrganisationChangeRequestByIdQueryHandler.Handle(_getOrganisationChangeRequestByIdQuery, CancellationToken.None);


            result.Success.Should().BeFalse();
        }

    }
}
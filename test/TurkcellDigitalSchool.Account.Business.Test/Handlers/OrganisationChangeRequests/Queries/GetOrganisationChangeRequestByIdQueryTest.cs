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
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using static TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Queries.GetOrganisationChangeRequestByIdQuery;
using System.Linq.Expressions;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.OrganisationChangeRequests.Queries
{
    [TestFixture]
    public class GetOrganisationChangeRequestByIdQueryTest
    {
        private GetOrganisationChangeRequestByIdQuery _getOrganisationChangeRequestByIdQuery;
        private GetOrganisationChangeRequestByIdQueryHandler _getOrganisationChangeRequestByIdQueryHandler;


        private Mock<IOrganisationInfoChangeRequestRepository> _organisationInfoChangeRequestRepository;

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

            _mapper = new Mock<IMapper>();

            _getOrganisationChangeRequestByIdQuery = new GetOrganisationChangeRequestByIdQuery();
            _getOrganisationChangeRequestByIdQueryHandler = new GetOrganisationChangeRequestByIdQueryHandler(_organisationInfoChangeRequestRepository.Object, _mapper.Object);
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
                    RequestState=Entities.Enums.OrganisationChangeRequestState.Forwarded,
                    ResponseState=Entities.Enums.OrganisationChangeResponseState.BeingEvaluated,
                    OrganisationChangeReqContents =  new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=1,
                            RequestId=1,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Test",
                        },
                        new OrganisationChangeReqContent
                        {
                            Id=1,
                            RequestId=1,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress,
                            PropertyValue="Test Adres",
                        }

                    }
                }
            };
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());
            _organisationInfoChangeRequestRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<OrganisationInfoChangeRequest, bool>>>())).ReturnsAsync(pageTypes.FirstOrDefault());

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
                    RequestState=Entities.Enums.OrganisationChangeRequestState.Forwarded,
                    ResponseState=Entities.Enums.OrganisationChangeResponseState.BeingEvaluated,
                    OrganisationChangeReqContents =  new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=1,
                            RequestId=1,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Test",
                        },
                        new OrganisationChangeReqContent
                        {
                            Id=1,
                            RequestId=1,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress,
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
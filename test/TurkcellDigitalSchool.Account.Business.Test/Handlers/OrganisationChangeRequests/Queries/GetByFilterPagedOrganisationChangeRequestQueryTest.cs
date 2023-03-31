﻿using AutoMapper;
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
using TurkcellDigitalSchool.Entities.Dtos.ContractKindDtos;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using static TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Queries.GetByFilterPagedOrganisationChangeRequestQuery;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework;
using System.Linq.Expressions;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;
using TurkcellDigitalSchool.Entities.Dtos;
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.OrganisationChangeRequests.Queries
{
    [TestFixture]
    public class GetByFilterPagedOrganisationChangeRequestQueryTest
    {
        private GetByFilterPagedOrganisationChangeRequestQuery _getByFilterPagedOrganisationChangeRequestQuery;
        private GetByFilterPagedOrganisationChangeRequestQueryHandler _getByFilterPagedOrganisationChangeRequestQueryHandler;

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

            _getByFilterPagedOrganisationChangeRequestQuery = new GetByFilterPagedOrganisationChangeRequestQuery();
            _getByFilterPagedOrganisationChangeRequestQueryHandler = new GetByFilterPagedOrganisationChangeRequestQueryHandler(_organisationInfoChangeRequestRepository.Object);
        }

        [Test]
        [TestCase(1, Entities.Enums.OrganisationChangeRequestState.Forwarded, "01/02/2023", "02/03/2023")]
        public async Task GetByFilterPagedOrganisationChangeRequestQuery_Success( long id, OrganisationChangeRequestState recordStatus, string startDate, string finishDate )
        {
            DateTime _startDate = DateTime.Parse(startDate);
            DateTime _finishDate = DateTime.Parse(finishDate);

            _getByFilterPagedOrganisationChangeRequestQuery = new()
            {
                OrganisationChangeRequestDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "UpdateTimeDESC",
                    Id = id,
                    FinishDate = _finishDate,
                    StartDate = _startDate,
                    RecordStatus =recordStatus

                }
            };

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
                },
                 new OrganisationInfoChangeRequest{
                    Id = 2,
                    InsertUserId= 1,
                    InsertTime = DateTime.Now,
                    UpdateUserId= 6,
                    UpdateTime= DateTime.Now,
                    RequestDate=DateTime.Now, OrganisationId=2,
                    Organisation= new Organisation{Id=2, CustomerManager="Ali"},
                    RequestState=Entities.Enums.OrganisationChangeRequestState.Approved,
                    ResponseState=Entities.Enums.OrganisationChangeResponseState.Approved,
                    OrganisationChangeReqContents =  new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=3,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Deneme",

                        },
                        new OrganisationChangeReqContent
                        {
                            Id=4,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress,
                            PropertyValue="Test Adres",
                        }
                    }
                },
            };
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedOrganisationChangeRequestQueryHandler.Handle(_getByFilterPagedOrganisationChangeRequestQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
        
        [Test]
        [TestCase(1, Entities.Enums.OrganisationChangeRequestState.Forwarded, "01/02/2023", "02/03/2023")]
        public async Task GetByFilterPagedOrganisationChangeRequestQuery_OrderByRequestDateASC_Success( long id, OrganisationChangeRequestState recordStatus, string startDate, string finishDate )
        {
            DateTime _startDate = DateTime.Parse(startDate);
            DateTime _finishDate = DateTime.Parse(finishDate);

            _getByFilterPagedOrganisationChangeRequestQuery = new()
            {
                OrganisationChangeRequestDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "RequestDateASC",
                    Id = id,
                    FinishDate = _finishDate,
                    StartDate = _startDate,
                    RecordStatus =recordStatus

                }
            };

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
                },
                 new OrganisationInfoChangeRequest{
                    Id = 2,
                    InsertUserId= 1,
                    InsertTime = DateTime.Now,
                    UpdateUserId= 6,
                    UpdateTime= DateTime.Now,
                    RequestDate=DateTime.Now, OrganisationId=2,
                    Organisation= new Organisation{Id=2, CustomerManager="Ali"},
                    RequestState=Entities.Enums.OrganisationChangeRequestState.Approved,
                    ResponseState=Entities.Enums.OrganisationChangeResponseState.Approved,
                    OrganisationChangeReqContents =  new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=3,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Deneme",

                        },
                        new OrganisationChangeReqContent
                        {
                            Id=4,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress,
                            PropertyValue="Test Adres",
                        }
                    }
                },
            };
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedOrganisationChangeRequestQueryHandler.Handle(_getByFilterPagedOrganisationChangeRequestQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        [TestCase(1, Entities.Enums.OrganisationChangeRequestState.Forwarded, "01/02/2023", "02/03/2023")]
        public async Task GetByFilterPagedOrganisationChangeRequestQuery_OrderByRequestDateDESC_Success( long id, OrganisationChangeRequestState recordStatus, string startDate, string finishDate )
        {
            DateTime _startDate = DateTime.Parse(startDate);
            DateTime _finishDate = DateTime.Parse(finishDate);

            _getByFilterPagedOrganisationChangeRequestQuery = new()
            {
                OrganisationChangeRequestDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "RequestDateDESC",
                    Id = id,
                    FinishDate = _finishDate,
                    StartDate = _startDate,
                    RecordStatus =recordStatus

                }
            };

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
                },
                 new OrganisationInfoChangeRequest{
                    Id = 2,
                    InsertUserId= 1,
                    InsertTime = DateTime.Now,
                    UpdateUserId= 6,
                    UpdateTime= DateTime.Now,
                    RequestDate=DateTime.Now, OrganisationId=2,
                    Organisation= new Organisation{Id=2, CustomerManager="Ali"},
                    RequestState=Entities.Enums.OrganisationChangeRequestState.Approved,
                    ResponseState=Entities.Enums.OrganisationChangeResponseState.Approved,
                    OrganisationChangeReqContents =  new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=3,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Deneme",

                        },
                        new OrganisationChangeReqContent
                        {
                            Id=4,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress,
                            PropertyValue="Test Adres",
                        }
                    }
                },
            };
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedOrganisationChangeRequestQueryHandler.Handle(_getByFilterPagedOrganisationChangeRequestQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
        
        [Test]
        [TestCase(1, Entities.Enums.OrganisationChangeRequestState.Forwarded, "01/02/2023", "02/03/2023")]
        public async Task GetByFilterPagedOrganisationChangeRequestQuery_OrderByRequestStateASC_Success( long id, OrganisationChangeRequestState recordStatus, string startDate, string finishDate )
        {
            DateTime _startDate = DateTime.Parse(startDate);
            DateTime _finishDate = DateTime.Parse(finishDate);

            _getByFilterPagedOrganisationChangeRequestQuery = new()
            {
                OrganisationChangeRequestDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "RequestStateASC",
                    Id = id,
                    FinishDate = _finishDate,
                    StartDate = _startDate,
                    RecordStatus =recordStatus

                }
            };

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
                },
                 new OrganisationInfoChangeRequest{
                    Id = 2,
                    InsertUserId= 1,
                    InsertTime = DateTime.Now,
                    UpdateUserId= 6,
                    UpdateTime= DateTime.Now,
                    RequestDate=DateTime.Now, OrganisationId=2,
                    Organisation= new Organisation{Id=2, CustomerManager="Ali"},
                    RequestState=Entities.Enums.OrganisationChangeRequestState.Approved,
                    ResponseState=Entities.Enums.OrganisationChangeResponseState.Approved,
                    OrganisationChangeReqContents =  new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=3,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Deneme",

                        },
                        new OrganisationChangeReqContent
                        {
                            Id=4,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress,
                            PropertyValue="Test Adres",
                        }
                    }
                },
            };
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedOrganisationChangeRequestQueryHandler.Handle(_getByFilterPagedOrganisationChangeRequestQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
        
        [Test]
        [TestCase(1, Entities.Enums.OrganisationChangeRequestState.Forwarded, "01/02/2023", "02/03/2023")]
        public async Task GetByFilterPagedOrganisationChangeRequestQuery_OrderByRequestStateDESC_Success( long id, OrganisationChangeRequestState recordStatus, string startDate, string finishDate )
        {
            DateTime _startDate = DateTime.Parse(startDate);
            DateTime _finishDate = DateTime.Parse(finishDate);

            _getByFilterPagedOrganisationChangeRequestQuery = new()
            {
                OrganisationChangeRequestDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "RequestStateDESC",
                    Id = id,
                    FinishDate = _finishDate,
                    StartDate = _startDate,
                    RecordStatus =recordStatus

                }
            };

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
                },
                 new OrganisationInfoChangeRequest{
                    Id = 2,
                    InsertUserId= 1,
                    InsertTime = DateTime.Now,
                    UpdateUserId= 6,
                    UpdateTime= DateTime.Now,
                    RequestDate=DateTime.Now, OrganisationId=2,
                    Organisation= new Organisation{Id=2, CustomerManager="Ali"},
                    RequestState=Entities.Enums.OrganisationChangeRequestState.Approved,
                    ResponseState=Entities.Enums.OrganisationChangeResponseState.Approved,
                    OrganisationChangeReqContents =  new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=3,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Deneme",

                        },
                        new OrganisationChangeReqContent
                        {
                            Id=4,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress,
                            PropertyValue="Test Adres",
                        }
                    }
                },
            };
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedOrganisationChangeRequestQueryHandler.Handle(_getByFilterPagedOrganisationChangeRequestQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
        
        [Test]
        [TestCase(1, Entities.Enums.OrganisationChangeRequestState.Forwarded, "01/02/2023", "02/03/2023")]
        public async Task GetByFilterPagedOrganisationChangeRequestQuery_OrderByCustomerManagerASC_Success( long id, OrganisationChangeRequestState recordStatus, string startDate, string finishDate )
        {
            DateTime _startDate = DateTime.Parse(startDate);
            DateTime _finishDate = DateTime.Parse(finishDate);

            _getByFilterPagedOrganisationChangeRequestQuery = new()
            {
                OrganisationChangeRequestDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "CustomerManagerASC",
                    Id = id,
                    FinishDate = _finishDate,
                    StartDate = _startDate,
                    RecordStatus =recordStatus

                }
            };

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
                },
                 new OrganisationInfoChangeRequest{
                    Id = 2,
                    InsertUserId= 1,
                    InsertTime = DateTime.Now,
                    UpdateUserId= 6,
                    UpdateTime= DateTime.Now,
                    RequestDate=DateTime.Now, OrganisationId=2,
                    Organisation= new Organisation{Id=2, CustomerManager="Ali"},
                    RequestState=Entities.Enums.OrganisationChangeRequestState.Approved,
                    ResponseState=Entities.Enums.OrganisationChangeResponseState.Approved,
                    OrganisationChangeReqContents =  new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=3,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Deneme",

                        },
                        new OrganisationChangeReqContent
                        {
                            Id=4,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress,
                            PropertyValue="Test Adres",
                        }
                    }
                },
            };
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedOrganisationChangeRequestQueryHandler.Handle(_getByFilterPagedOrganisationChangeRequestQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
        
        [Test]
        [TestCase(1, Entities.Enums.OrganisationChangeRequestState.Forwarded, "01/02/2023", "02/03/2023")]
        public async Task GetByFilterPagedOrganisationChangeRequestQuery_OrderByCustomerManagerDESC_Success( long id, OrganisationChangeRequestState recordStatus, string startDate, string finishDate )
        {
            DateTime _startDate = DateTime.Parse(startDate);
            DateTime _finishDate = DateTime.Parse(finishDate);

            _getByFilterPagedOrganisationChangeRequestQuery = new()
            {
                OrganisationChangeRequestDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "CustomerManagerDESC",
                    Id = id,
                    FinishDate = _finishDate,
                    StartDate = _startDate,
                    RecordStatus =recordStatus

                }
            };

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
                },
                 new OrganisationInfoChangeRequest{
                    Id = 2,
                    InsertUserId= 1,
                    InsertTime = DateTime.Now,
                    UpdateUserId= 6,
                    UpdateTime= DateTime.Now,
                    RequestDate=DateTime.Now, OrganisationId=2,
                    Organisation= new Organisation{Id=2, CustomerManager="Ali"},
                    RequestState=Entities.Enums.OrganisationChangeRequestState.Approved,
                    ResponseState=Entities.Enums.OrganisationChangeResponseState.Approved,
                    OrganisationChangeReqContents =  new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=3,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Deneme",

                        },
                        new OrganisationChangeReqContent
                        {
                            Id=4,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress,
                            PropertyValue="Test Adres",
                        }
                    }
                },
            };
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedOrganisationChangeRequestQueryHandler.Handle(_getByFilterPagedOrganisationChangeRequestQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
        
        [Test]
        [TestCase(1, Entities.Enums.OrganisationChangeRequestState.Forwarded, "01/02/2023", "02/03/2023")]
        public async Task GetByFilterPagedOrganisationChangeRequestQuery_OrderByInsertTimeASC_Success( long id, OrganisationChangeRequestState recordStatus, string startDate, string finishDate )
        {
            DateTime _startDate = DateTime.Parse(startDate);
            DateTime _finishDate = DateTime.Parse(finishDate);

            _getByFilterPagedOrganisationChangeRequestQuery = new()
            {
                OrganisationChangeRequestDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "InsertTimeASC",
                    Id = id,
                    FinishDate = _finishDate,
                    StartDate = _startDate,
                    RecordStatus =recordStatus

                }
            };

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
                },
                 new OrganisationInfoChangeRequest{
                    Id = 2,
                    InsertUserId= 1,
                    InsertTime = DateTime.Now,
                    UpdateUserId= 6,
                    UpdateTime= DateTime.Now,
                    RequestDate=DateTime.Now, OrganisationId=2,
                    Organisation= new Organisation{Id=2, CustomerManager="Ali"},
                    RequestState=Entities.Enums.OrganisationChangeRequestState.Approved,
                    ResponseState=Entities.Enums.OrganisationChangeResponseState.Approved,
                    OrganisationChangeReqContents =  new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=3,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Deneme",

                        },
                        new OrganisationChangeReqContent
                        {
                            Id=4,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress,
                            PropertyValue="Test Adres",
                        }
                    }
                },
            };
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedOrganisationChangeRequestQueryHandler.Handle(_getByFilterPagedOrganisationChangeRequestQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
        
        [Test]
        [TestCase(1, Entities.Enums.OrganisationChangeRequestState.Forwarded, "01/02/2023", "02/03/2023")]
        public async Task GetByFilterPagedOrganisationChangeRequestQuery_OrderByInsertTimeDESC_Success( long id, OrganisationChangeRequestState recordStatus, string startDate, string finishDate )
        {
            DateTime _startDate = DateTime.Parse(startDate);
            DateTime _finishDate = DateTime.Parse(finishDate);

            _getByFilterPagedOrganisationChangeRequestQuery = new()
            {
                OrganisationChangeRequestDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "InsertTimeDESC",
                    Id = id,
                    FinishDate = _finishDate,
                    StartDate = _startDate,
                    RecordStatus =recordStatus

                }
            };

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
                },
                 new OrganisationInfoChangeRequest{
                    Id = 2,
                    InsertUserId= 1,
                    InsertTime = DateTime.Now,
                    UpdateUserId= 6,
                    UpdateTime= DateTime.Now,
                    RequestDate=DateTime.Now, OrganisationId=2,
                    Organisation= new Organisation{Id=2, CustomerManager="Ali"},
                    RequestState=Entities.Enums.OrganisationChangeRequestState.Approved,
                    ResponseState=Entities.Enums.OrganisationChangeResponseState.Approved,
                    OrganisationChangeReqContents =  new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=3,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Deneme",

                        },
                        new OrganisationChangeReqContent
                        {
                            Id=4,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress,
                            PropertyValue="Test Adres",
                        }
                    }
                },
            };
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedOrganisationChangeRequestQueryHandler.Handle(_getByFilterPagedOrganisationChangeRequestQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
        
        [Test]
        [TestCase(1, Entities.Enums.OrganisationChangeRequestState.Forwarded, "01/02/2023", "02/03/2023")]
        public async Task GetByFilterPagedOrganisationChangeRequestQuery_OrderByUpdateTimeASC_Success( long id, OrganisationChangeRequestState recordStatus, string startDate, string finishDate )
        {
            DateTime _startDate = DateTime.Parse(startDate);
            DateTime _finishDate = DateTime.Parse(finishDate);

            _getByFilterPagedOrganisationChangeRequestQuery = new()
            {
                OrganisationChangeRequestDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "UpdateTimeASC",
                    Id = id,
                    FinishDate = _finishDate,
                    StartDate = _startDate,
                    RecordStatus =recordStatus

                }
            };

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
                },
                 new OrganisationInfoChangeRequest{
                    Id = 2,
                    InsertUserId= 1,
                    InsertTime = DateTime.Now,
                    UpdateUserId= 6,
                    UpdateTime= DateTime.Now,
                    RequestDate=DateTime.Now, OrganisationId=2,
                    Organisation= new Organisation{Id=2, CustomerManager="Ali"},
                    RequestState=Entities.Enums.OrganisationChangeRequestState.Approved,
                    ResponseState=Entities.Enums.OrganisationChangeResponseState.Approved,
                    OrganisationChangeReqContents =  new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=3,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Deneme",

                        },
                        new OrganisationChangeReqContent
                        {
                            Id=4,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress,
                            PropertyValue="Test Adres",
                        }
                    }
                },
            };
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedOrganisationChangeRequestQueryHandler.Handle(_getByFilterPagedOrganisationChangeRequestQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
        
        [Test]
        [TestCase(1, Entities.Enums.OrganisationChangeRequestState.Forwarded, "01/02/2023", "02/03/2023")]
        public async Task GetByFilterPagedOrganisationChangeRequestQuery_OrderByUpdateTimeDESC_Success( long id, OrganisationChangeRequestState recordStatus, string startDate, string finishDate )
        {
            DateTime _startDate = DateTime.Parse(startDate);
            DateTime _finishDate = DateTime.Parse(finishDate);

            _getByFilterPagedOrganisationChangeRequestQuery = new()
            {
                OrganisationChangeRequestDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "UpdateTimeDESC",
                    Id = id,
                    FinishDate = _finishDate,
                    StartDate = _startDate,
                    RecordStatus =recordStatus

                }
            };

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
                },
                 new OrganisationInfoChangeRequest{
                    Id = 2,
                    InsertUserId= 1,
                    InsertTime = DateTime.Now,
                    UpdateUserId= 6,
                    UpdateTime= DateTime.Now,
                    RequestDate=DateTime.Now, OrganisationId=2,
                    Organisation= new Organisation{Id=2, CustomerManager="Ali"},
                    RequestState=Entities.Enums.OrganisationChangeRequestState.Approved,
                    ResponseState=Entities.Enums.OrganisationChangeResponseState.Approved,
                    OrganisationChangeReqContents =  new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=3,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Deneme",

                        },
                        new OrganisationChangeReqContent
                        {
                            Id=4,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress,
                            PropertyValue="Test Adres",
                        }
                    }
                },
            };
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedOrganisationChangeRequestQueryHandler.Handle(_getByFilterPagedOrganisationChangeRequestQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
        
        [Test]
        [TestCase(1, Entities.Enums.OrganisationChangeRequestState.Forwarded, "01/02/2023", "02/03/2023")]
        public async Task GetByFilterPagedOrganisationChangeRequestQuery_OrderByIdASC_Success( long id, OrganisationChangeRequestState recordStatus, string startDate, string finishDate )
        {
            DateTime _startDate = DateTime.Parse(startDate);
            DateTime _finishDate = DateTime.Parse(finishDate);

            _getByFilterPagedOrganisationChangeRequestQuery = new()
            {
                OrganisationChangeRequestDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "IdASC",
                    Id = id,
                    FinishDate = _finishDate,
                    StartDate = _startDate,
                    RecordStatus =recordStatus

                }
            };

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
                },
                 new OrganisationInfoChangeRequest{
                    Id = 2,
                    InsertUserId= 1,
                    InsertTime = DateTime.Now,
                    UpdateUserId= 6,
                    UpdateTime= DateTime.Now,
                    RequestDate=DateTime.Now, OrganisationId=2,
                    Organisation= new Organisation{Id=2, CustomerManager="Ali"},
                    RequestState=Entities.Enums.OrganisationChangeRequestState.Approved,
                    ResponseState=Entities.Enums.OrganisationChangeResponseState.Approved,
                    OrganisationChangeReqContents =  new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=3,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Deneme",

                        },
                        new OrganisationChangeReqContent
                        {
                            Id=4,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress,
                            PropertyValue="Test Adres",
                        }
                    }
                },
            };
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedOrganisationChangeRequestQueryHandler.Handle(_getByFilterPagedOrganisationChangeRequestQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
        
        [Test]
        [TestCase(1, Entities.Enums.OrganisationChangeRequestState.Forwarded, "01/02/2023", "02/03/2023")]
        public async Task GetByFilterPagedOrganisationChangeRequestQuery_OrderByIdDESC_Success( long id, OrganisationChangeRequestState recordStatus, string startDate, string finishDate )
        {
            DateTime _startDate = DateTime.Parse(startDate);
            DateTime _finishDate = DateTime.Parse(finishDate);

            _getByFilterPagedOrganisationChangeRequestQuery = new()
            {
                OrganisationChangeRequestDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "IdDESC",
                    Id = id,
                    FinishDate = _finishDate,
                    StartDate = _startDate,
                    RecordStatus =recordStatus

                }
            };

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
                },
                 new OrganisationInfoChangeRequest{
                    Id = 2,
                    InsertUserId= 1,
                    InsertTime = DateTime.Now,
                    UpdateUserId= 6,
                    UpdateTime= DateTime.Now,
                    RequestDate=DateTime.Now, OrganisationId=2,
                    Organisation= new Organisation{Id=2, CustomerManager="Ali"},
                    RequestState=Entities.Enums.OrganisationChangeRequestState.Approved,
                    ResponseState=Entities.Enums.OrganisationChangeResponseState.Approved,
                    OrganisationChangeReqContents =  new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent
                        {
                            Id=3,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Deneme",

                        },
                        new OrganisationChangeReqContent
                        {
                            Id=4,
                            RequestId=2,
                            PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.OrganisationAddress,
                            PropertyValue="Test Adres",
                        }
                    }
                },
            };
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedOrganisationChangeRequestQueryHandler.Handle(_getByFilterPagedOrganisationChangeRequestQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }


    }
}
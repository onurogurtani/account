using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Moq;
using NUnit.Framework;
using System;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using System.Collections.Generic;
using System.Linq;
using MockQueryable.Moq;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using AutoMapper;
using System.Linq.Expressions;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.FileServices;
using Refit;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Enums; 
using OrganisationChangeReqContent = TurkcellDigitalSchool.Account.Domain.Concrete.OrganisationChangeReqContent;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.FileServices.Model.Response;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.OrganisationChangeRequests.Commands
{
    [TestFixture]

    public class UpdateOrganisationChangeRequestCommandTest
    {
        private UpdateOrganisationChangeRequestCommand _updateOrganisationChangeRequestCommand;
        private UpdateOrganisationChangeRequestCommand.UpdateOrganisationChangeRequestCommandHandler _updateOrganisationChangeRequestCommandHandler;

        Mock<IOrganisationInfoChangeRequestRepository> _organisationInfoChangeRequestRepository;
        Mock<IOrganisationChangeReqContentRepository> _organisationChangeReqContentRepository;
        Mock<IOrganisationRepository> _organisationRepository;
        Mock<IFileServices> _fileService;
        Mock<ITokenHelper> _tokenHelper;

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

            _organisationInfoChangeRequestRepository = new Mock<IOrganisationInfoChangeRequestRepository>();
            _organisationChangeReqContentRepository = new Mock<IOrganisationChangeReqContentRepository>();
            _organisationRepository = new Mock<IOrganisationRepository>();
            _fileService = new Mock<IFileServices>();
            _tokenHelper = new Mock<ITokenHelper>();

            _updateOrganisationChangeRequestCommand = new UpdateOrganisationChangeRequestCommand();
            _updateOrganisationChangeRequestCommandHandler = new(_organisationInfoChangeRequestRepository.Object, _organisationChangeReqContentRepository.Object, _organisationRepository.Object, _tokenHelper.Object, _mapper.Object, _fileService.Object, _mediator.Object);
        }

        [Test]
        public async Task UpdateOrganisationChangeRequestCommand_Entity_Null()
        {
            _updateOrganisationChangeRequestCommand = new()
            {

                OrganisationInfoChangeRequest = new()
                {
                    Id = 1
                },

            };
            var changeRequests = new List<OrganisationInfoChangeRequest>
            {
                new OrganisationInfoChangeRequest{Id = 1, OrganisationId=2,Organisation=new Organisation{ Id=2, Name="Test"}, },
            };
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(changeRequests.AsQueryable().BuildMock());
            _organisationInfoChangeRequestRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<OrganisationInfoChangeRequest, bool>>>())).ReturnsAsync(() => null);

            var result = await _updateOrganisationChangeRequestCommandHandler.Handle(_updateOrganisationChangeRequestCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }

        [Test]
        public async Task UpdateOrganisationChangeRequestCommand_RequestState_Error()
        {
            _updateOrganisationChangeRequestCommand = new()
            {

                OrganisationInfoChangeRequest = new()
                {
                    Id = 1
                },

            };
            var changeRequests = new List<OrganisationInfoChangeRequest>
            {
                new OrganisationInfoChangeRequest{Id = 1, OrganisationId=2,Organisation=new Organisation{ Id=2, Name="Test"},RequestState=OrganisationChangeRequestState.Approved },
            };
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(changeRequests.AsQueryable().BuildMock());
            _organisationInfoChangeRequestRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<OrganisationInfoChangeRequest, bool>>>())).ReturnsAsync(() => null);

            var result = await _updateOrganisationChangeRequestCommandHandler.Handle(_updateOrganisationChangeRequestCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }

        [Test]
        public async Task UpdateOrganisationChangeRequestCommand_ContentTypeNull_Error()
        {
            _updateOrganisationChangeRequestCommand = new()
            {

                OrganisationInfoChangeRequest = new()
                {
                    Id = 1,
                    OrganisationChangeReqContents = new List<UpdateOrganisationChangeReqContentDto>
                    {

                        new UpdateOrganisationChangeReqContentDto
                        {
                            PropertyEnum = OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Name",

                        },
                        new UpdateOrganisationChangeReqContentDto
                        {
                            PropertyEnum = OrganisationChangePropertyEnum.Logo,
                            PropertyValue="adsdasdadsdsd"
                        },
                    }

                },
                ContentType = ""
            };

            var changeRequests = new List<OrganisationInfoChangeRequest>
            {
                new OrganisationInfoChangeRequest{Id = 1, OrganisationId=2,Organisation=new Organisation{ Id=2, Name="Test"},RequestState=OrganisationChangeRequestState.Forwarded },
            };
            var organisations = new List<Organisation>
            {
                new Organisation{ Id = 2, Name = "Test", CrmId = 1 }
            };

            _tokenHelper.Setup(x => x.GetCurrentOrganisationId()).Returns(1);
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(changeRequests.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());

            _mapper.Setup(s => s.Map(It.IsAny<UpdateOrganisationInfoChangeRequestDto>(), It.IsAny<OrganisationInfoChangeRequest>()))
                         .Returns(new OrganisationInfoChangeRequest()
                         {
                             Id = 1,
                             OrganisationChangeReqContents = new List<OrganisationChangeReqContent>() {
                                  new OrganisationChangeReqContent() {
                                     Id = 1,
                                     RequestId = 1,
                                     PropertyEnum=OrganisationChangePropertyEnum.Logo,
                                     PropertyValue="Test Logo"
                                  }
                             },
                         });
            _organisationInfoChangeRequestRepository.Setup(x => x.Update(It.IsAny<OrganisationInfoChangeRequest>())).Returns(new OrganisationInfoChangeRequest());

            var result = await _updateOrganisationChangeRequestCommandHandler.Handle(_updateOrganisationChangeRequestCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }

        [Test]
        public async Task UpdateOrganisationChangeRequestCommand_ExistName_Error()
        {
            _updateOrganisationChangeRequestCommand = new()
            {

                OrganisationInfoChangeRequest = new()
                {

                    Id = 1,
                    OrganisationChangeReqContents = new List<UpdateOrganisationChangeReqContentDto>
                    {
                        new UpdateOrganisationChangeReqContentDto
                        {
                            PropertyEnum = OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Test"
                        }
                    }

                },
                ContentType = "image/png"
            };

            var pages = new List<OrganisationInfoChangeRequest>
            {
                new OrganisationInfoChangeRequest{Id = 1, OrganisationId=2,Organisation=new Organisation{ Id=2, Name="Test"},RequestState=OrganisationChangeRequestState.Forwarded },
            };
            var organisations = new List<Organisation>
            {
                new Organisation{ Id = 2, Name = "Test", CrmId = 1 }
            };

            _tokenHelper.Setup(x => x.GetCurrentOrganisationId()).Returns(1);
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pages.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());

            _organisationInfoChangeRequestRepository.Setup(x => x.Update(It.IsAny<OrganisationInfoChangeRequest>())).Returns(new OrganisationInfoChangeRequest());

            var result = await _updateOrganisationChangeRequestCommandHandler.Handle(_updateOrganisationChangeRequestCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }

        [Test]
        public async Task UpdateOrganisationChangeRequestCommand_Success()
        {
            _updateOrganisationChangeRequestCommand = new()
            {
                OrganisationInfoChangeRequest = new()
                {
                    Id = 1,
                    OrganisationChangeReqContents = new List<UpdateOrganisationChangeReqContentDto>
                    {
                          new UpdateOrganisationChangeReqContentDto
                        {
                            RequestId= 1,
                            PropertyEnum = OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Test 12"
                        },
                        new UpdateOrganisationChangeReqContentDto
                        {
                            RequestId= 1,
                            PropertyEnum = OrganisationChangePropertyEnum.Logo,
                            PropertyValue="adsdasdadsdsd"
                        },
                    }

                },
                ContentType = "image/png"
            };

            var changeRequests = new List<OrganisationInfoChangeRequest>
            {
                new OrganisationInfoChangeRequest{Id = 1, OrganisationId=2,Organisation=new Organisation{ Id=2, Name="Test"},RequestState=OrganisationChangeRequestState.Forwarded,
                    OrganisationChangeReqContents=new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent {
                        Id=1,PropertyEnum= OrganisationChangePropertyEnum.Logo, PropertyValue="jhhfd",RequestId=1
                    },
                    new OrganisationChangeReqContent {
                        Id=2,PropertyEnum= OrganisationChangePropertyEnum.OrganisationName, PropertyValue="Test 34",RequestId=1
                    }} },
            };

            var organisations = new List<Organisation>
            {
                new Organisation{ Id = 2, Name = "Test", CrmId = 1 }
            };

            _organisationInfoChangeRequestRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<OrganisationInfoChangeRequest, bool>>>())).ReturnsAsync(() => changeRequests[0]);

            _tokenHelper.Setup(x => x.GetCurrentOrganisationId()).Returns(1);
            _fileService.Setup(x => x.CreateFileCommand(It.IsAny<ByteArrayPart>(), It.IsAny<int>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(new CreateFileCommandIntegrationResponse()
            { Data = new Core.Integration.IntegrationServices.FileServices.Model.Response.Dto.File() { Id = 12, FileType = FileType.OrganisationLogo } });

            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(changeRequests.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());
            _organisationChangeReqContentRepository.Setup(x => x.Query()).Returns(changeRequests[0].OrganisationChangeReqContents.AsQueryable().BuildMock());

            _mapper.Setup(s => s.Map(It.IsAny<UpdateOrganisationInfoChangeRequestDto>(), It.IsAny<OrganisationInfoChangeRequest>()))
                          .Returns(new OrganisationInfoChangeRequest()
                          {
                              Id = 1,
                              OrganisationChangeReqContents = new List<OrganisationChangeReqContent>() {
                                  new OrganisationChangeReqContent() {
                                     Id = 1,
                                     RequestId = 1,
                                     PropertyEnum=OrganisationChangePropertyEnum.Logo,
                                     PropertyValue="Test Logo"
                                  }
                              },
                          });

            _organisationInfoChangeRequestRepository.Setup(x => x.Update(It.IsAny<OrganisationInfoChangeRequest>())).Returns(new OrganisationInfoChangeRequest());

            var result = await _updateOrganisationChangeRequestCommandHandler.Handle(_updateOrganisationChangeRequestCommand, new CancellationToken());

            result.Success.Should().BeTrue();
        }
    }
}


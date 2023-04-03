using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Moq;
using MockQueryable.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Commands.UpdateOrganisationChangeRequestCommand;
using ServiceStack;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Collections.Generic;
using System.Linq;
using MockQueryable.Moq;
using TurkcellDigitalSchool.Entities.Enums;
using TurkcellDigitalSchool.File.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Utilities.File;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using AutoMapper;
using TurkcellDigitalSchool.Entities.Dtos.OrganisationChangeReqContentDtos;
using TurkcellDigitalSchool.Entities.Dtos.OrganisationDtos;
using TurkcellDigitalSchool.Entities.Dtos.OrganisationChangeRequestDtos;
using TurkcellDigitalSchool.Entities.Dtos.PackageDtos;
using TurkcellDigitalSchool.Entities.Dtos;
using TurkcellDigitalSchool.Core.Utilities.File.Model;
using TurkcellDigitalSchool.Core.Utilities.Results;
using System.Linq.Expressions;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.OrganisationChangeRequests.Commands
{
    [TestFixture]

    public class UpdateOrganisationChangeRequestCommandTest
    {

        Mock<IOrganisationInfoChangeRequestRepository> _organisationInfoChangeRequestRepository;
        Mock<IOrganisationChangeReqContentRepository> _organisationChangeReqContentRepository;
        Mock<IOrganisationRepository> _organisationRepository;
        Mock<IFileRepository> _fileRepository;
        Mock<IFileService> _fileService;
        Mock<IPathHelper> _pathHelper;
        Mock<ITokenHelper> _tokenHelper;
        Mock<IMapper> _mapper;

        private UpdateOrganisationChangeRequestCommand _updateOrganisationChangeRequestCommand;
        private UpdateOrganisationChangeRequestCommandHandler _updateOrganisationChangeRequestCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;


        [SetUp]
        public void Setup()
        {
            _organisationInfoChangeRequestRepository = new Mock<IOrganisationInfoChangeRequestRepository>();
            _organisationChangeReqContentRepository = new Mock<IOrganisationChangeReqContentRepository>();
            _organisationRepository = new Mock<IOrganisationRepository>();
            _fileRepository = new Mock<IFileRepository>();
            _fileService = new Mock<IFileService>();
            _pathHelper = new Mock<IPathHelper>();
            _tokenHelper = new Mock<ITokenHelper>();
            _mapper = new Mock<IMapper>();
            _mediator = new Mock<IMediator>();

            _updateOrganisationChangeRequestCommand = new UpdateOrganisationChangeRequestCommand();
            _updateOrganisationChangeRequestCommandHandler = new(_organisationInfoChangeRequestRepository.Object, _organisationChangeReqContentRepository.Object, _organisationRepository.Object, _tokenHelper.Object, _mapper.Object, _fileRepository.Object, _fileService.Object, _pathHelper.Object, _mediator.Object);

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
            result.Message.Should().Be(Messages.RecordDoesNotExist);
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
                new OrganisationInfoChangeRequest{Id = 1, OrganisationId=2,Organisation=new Organisation{ Id=2, Name="Test"},RequestState=Entities.Enums.OrganisationChangeRequestState.Approved },
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
                            PropertyEnum = Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Name",

                        },
                        new UpdateOrganisationChangeReqContentDto
                        {
                            PropertyEnum = Entities.Enums.OrganisationChangePropertyEnum.Logo,
                            PropertyValue="adsdasdadsdsd"
                        },
                    }

                },
                ContentType = ""
            };

            var changeRequests = new List<OrganisationInfoChangeRequest>
            {
                new OrganisationInfoChangeRequest{Id = 1, OrganisationId=2,Organisation=new Organisation{ Id=2, Name="Test"},RequestState=Entities.Enums.OrganisationChangeRequestState.Forwarded },
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
                                     PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.Logo,
                                     PropertyValue="Test Logo"
                                  }
                             },
                         });
            _organisationInfoChangeRequestRepository.Setup(x => x.Update(It.IsAny<OrganisationInfoChangeRequest>())).Returns(new OrganisationInfoChangeRequest());

            var result = await _updateOrganisationChangeRequestCommandHandler.Handle(_updateOrganisationChangeRequestCommand, new CancellationToken());


            result.Success.Should().BeFalse();

        }

        [Test]
        public async Task UpdateOrganisationChangeRequestCommand_PathNotInAllowedType_Error()
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
                            PropertyEnum = Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Name",

                        },
                        new UpdateOrganisationChangeReqContentDto
                        {
                            PropertyEnum = Entities.Enums.OrganisationChangePropertyEnum.Logo,
                            PropertyValue="adsdasdadsdsd"
                        },
                    }

                },
                ContentType = "application/pdf"
            };
            var _filePath = "TestOrganisationLogo";

            var changeRequests = new List<OrganisationInfoChangeRequest>
            {
                new OrganisationInfoChangeRequest{Id = 1, OrganisationId=2,Organisation=new Organisation{ Id=2, Name="Test"},RequestState=Entities.Enums.OrganisationChangeRequestState.Forwarded },
            };
            var organisations = new List<Organisation>
            {
                new Organisation{ Id = 2, Name = "Test", CrmId = 1 }
            };

            _tokenHelper.Setup(x => x.GetCurrentOrganisationId()).Returns(1);
            _pathHelper.Setup(x => x.GetPath(_filePath)).Returns(() => null);

            var saveFileReturn = new DataResult<string>("test", false);
            _fileService.Setup(x => x.SaveFile(It.IsAny<SaveFileRequest>())).ReturnsAsync(saveFileReturn);

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
                                     PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.Logo,
                                     PropertyValue="Test Logo"
                                  }
                              },
                          });
            _organisationInfoChangeRequestRepository.Setup(x => x.Update(It.IsAny<OrganisationInfoChangeRequest>())).Returns(new OrganisationInfoChangeRequest());

            var result = await _updateOrganisationChangeRequestCommandHandler.Handle(_updateOrganisationChangeRequestCommand, new CancellationToken());


            result.Success.Should().BeFalse();

        }

        [Test]
        public async Task UpdateOrganisationChangeRequestCommand_PathNull_Error()
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
                            PropertyEnum = Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Name",

                        },
                        new UpdateOrganisationChangeReqContentDto
                        {
                            PropertyEnum = Entities.Enums.OrganisationChangePropertyEnum.Logo,
                            PropertyValue="adsdasdadsdsd"
                        },
                    }

                },
                ContentType = "image/png"
            };
            var _filePath = "TestOrganisationLogo";

            var changeRequests = new List<OrganisationInfoChangeRequest>
            {
                new OrganisationInfoChangeRequest{Id = 1, OrganisationId=2,Organisation=new Organisation{ Id=2, Name="Test"},RequestState=Entities.Enums.OrganisationChangeRequestState.Forwarded },
            };
            var organisations = new List<Organisation>
            {
                new Organisation{ Id = 2, Name = "Test", CrmId = 1 }
            };

            _tokenHelper.Setup(x => x.GetCurrentOrganisationId()).Returns(1);
            _pathHelper.Setup(x => x.GetPath(_filePath)).Returns(() => null);

            var saveFileReturn = new DataResult<string>("test", false);
            _fileService.Setup(x => x.SaveFile(It.IsAny<SaveFileRequest>())).ReturnsAsync(saveFileReturn);

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
                                     PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.Logo,
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
                            PropertyEnum = Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Test"
                        }
                    }

                },
                ContentType = "image/png"
            };

            var pages = new List<OrganisationInfoChangeRequest>
            {
                new OrganisationInfoChangeRequest{Id = 1, OrganisationId=2,Organisation=new Organisation{ Id=2, Name="Test"},RequestState=Entities.Enums.OrganisationChangeRequestState.Forwarded },
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
                            PropertyEnum = Entities.Enums.OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Test 12"
                        },
                        new UpdateOrganisationChangeReqContentDto
                        {
                            RequestId= 1,
                            PropertyEnum = Entities.Enums.OrganisationChangePropertyEnum.Logo,
                            PropertyValue="adsdasdadsdsd"
                        },
                    }

                },
                ContentType = "image/png"
            };
            var _filePath = "OrganisationLogo";

            var changeRequests = new List<OrganisationInfoChangeRequest>
            {
                new OrganisationInfoChangeRequest{Id = 1, OrganisationId=2,Organisation=new Organisation{ Id=2, Name="Test"},RequestState=Entities.Enums.OrganisationChangeRequestState.Forwarded,
                    OrganisationChangeReqContents=new List<OrganisationChangeReqContent>{
                        new OrganisationChangeReqContent {
                        Id=1,PropertyEnum= Entities.Enums.OrganisationChangePropertyEnum.Logo, PropertyValue="jhhfd",RequestId=1
                    },
                    new OrganisationChangeReqContent {
                        Id=2,PropertyEnum= Entities.Enums.OrganisationChangePropertyEnum.OrganisationName, PropertyValue="Test 34",RequestId=1
                    }} },
            };
            
            var organisations = new List<Organisation>
            {
                new Organisation{ Id = 2, Name = "Test", CrmId = 1 }
            };

            _organisationInfoChangeRequestRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<OrganisationInfoChangeRequest, bool>>>())).ReturnsAsync(() => changeRequests[0]);

            _tokenHelper.Setup(x => x.GetCurrentOrganisationId()).Returns(1);
            _pathHelper.Setup(x => x.GetPath(_filePath)).Returns(() => _filePath);

            var saveFileReturn = new DataResult<string>("test", true);
            _fileService.Setup(x => x.SaveFile(It.IsAny<SaveFileRequest>())).ReturnsAsync(saveFileReturn);

            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(changeRequests.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());
            _organisationChangeReqContentRepository.Setup(x => x.Query()).Returns(changeRequests[0].OrganisationChangeReqContents.AsQueryable().BuildMock());

            _mapper.Setup(s => s.Map( It.IsAny<UpdateOrganisationInfoChangeRequestDto>(), It.IsAny<OrganisationInfoChangeRequest>()))
                          .Returns(new OrganisationInfoChangeRequest()
                          {
                              Id = 1,
                              OrganisationChangeReqContents = new List<OrganisationChangeReqContent>() {
                                  new OrganisationChangeReqContent() {
                                     Id = 1,
                                     RequestId = 1,
                                     PropertyEnum=Entities.Enums.OrganisationChangePropertyEnum.Logo,
                                     PropertyValue="Test Logo"
                                  }
                              },
                          });

            _fileRepository.Setup(x => x.Add(It.IsAny<Entities.Concrete.File>())).Returns(new Entities.Concrete.File());

            _organisationInfoChangeRequestRepository.Setup(x => x.Update(It.IsAny<OrganisationInfoChangeRequest>())).Returns(new OrganisationInfoChangeRequest());

            var result = await _updateOrganisationChangeRequestCommandHandler.Handle(_updateOrganisationChangeRequestCommand, new CancellationToken());


            result.Success.Should().BeTrue();

        }

    }
}


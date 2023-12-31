using FluentAssertions;
using Moq;
using NUnit.Framework;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using System.Collections.Generic;
using System.Linq;
using MockQueryable.Moq;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using AutoMapper;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.FileServices;
using Refit;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using OrganisationChangeReqContent = TurkcellDigitalSchool.Account.Domain.Concrete.OrganisationChangeReqContent;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.FileServices.Model.Response;
using static TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Commands.CreateOrganisationChangeRequestCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.OrganisationChangeRequests.Commands
{
    [TestFixture]

    public class CreateOrganisationChangeRequestCommandTest
    {
        private CreateOrganisationChangeRequestCommand _createOrganisationChangeRequestCommand;
        private CreateOrganisationChangeRequestCommandHandler _createOrganisationChangeRequestCommandHandler;

        private Mock<IOrganisationInfoChangeRequestRepository> _organisationInfoChangeRequestRepository;
        private Mock<IOrganisationRepository> _organisationRepository;
        private Mock<IFileServices> _fileService;
        private Mock<ITokenHelper> _tokenHelper;
        private Mock<IMapper> _mapper;

        [SetUp]
        public void Setup()
        {
            _mapper = new Mock<IMapper>();
            _organisationInfoChangeRequestRepository = new Mock<IOrganisationInfoChangeRequestRepository>();
            _organisationRepository = new Mock<IOrganisationRepository>();
            _fileService = new Mock<IFileServices>();
            _tokenHelper = new Mock<ITokenHelper>();

            _createOrganisationChangeRequestCommand = new CreateOrganisationChangeRequestCommand();
            _createOrganisationChangeRequestCommandHandler = new CreateOrganisationChangeRequestCommandHandler(_organisationInfoChangeRequestRepository.Object, _organisationRepository.Object, _tokenHelper.Object, _mapper.Object, _fileService.Object);
        }

        [Test]
        public async Task CreateOrganisationChangeRequestCommand_ContentTypeNull_Error()
        {
            _createOrganisationChangeRequestCommand = new()
            {
                OrganisationInfoChangeRequest = new()
                {

                    OrganisationChangeReqContents = new List<AddOrganisationChangeReqContentDto>
                    {
                        new AddOrganisationChangeReqContentDto
                        {
                            PropertyEnum = OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Name",

                        },
                        new AddOrganisationChangeReqContentDto
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
                new OrganisationInfoChangeRequest{Id = 1, OrganisationId=2,Organisation=new Organisation{ Id=2, Name="Test"}, },
            };
            var organisations = new List<Organisation>
            {
                new Organisation{ Id = 2, Name = "Test", CrmId = 1 }
            };

            _tokenHelper.Setup(x => x.GetCurrentOrganisationId()).Returns(1);
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(changeRequests.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());

            _mapper.Setup(s => s.Map<OrganisationInfoChangeRequest>(It.IsAny<AddOrganisationInfoChangeRequestDto>()))
                          .Returns(new OrganisationInfoChangeRequest()
                          {
                              Id = 2,
                              OrganisationId = 2,
                              Organisation = new Organisation { Id = 2, Name = "Test" },


                          });
            _organisationInfoChangeRequestRepository.Setup(x => x.Add(It.IsAny<OrganisationInfoChangeRequest>())).Returns(new OrganisationInfoChangeRequest());

            var result = await _createOrganisationChangeRequestCommandHandler.Handle(_createOrganisationChangeRequestCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }

        [Test]
        public async Task CreateOrganisationChangeRequestCommand_ExistName_Error()
        {
            _createOrganisationChangeRequestCommand = new()
            {
                OrganisationInfoChangeRequest = new()
                {

                    OrganisationChangeReqContents = new List<AddOrganisationChangeReqContentDto>
                    {
                        new AddOrganisationChangeReqContentDto
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
                new OrganisationInfoChangeRequest{Id = 1, OrganisationId=2,Organisation=new Organisation{ Id=2, Name="Test"}, },
            };
            var organisations = new List<Organisation>
            {
                new Organisation{ Id = 2, Name = "Test", CrmId = 1 }
            };

            _tokenHelper.Setup(x => x.GetCurrentOrganisationId()).Returns(1);
            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(pages.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());

            _organisationInfoChangeRequestRepository.Setup(x => x.Add(It.IsAny<OrganisationInfoChangeRequest>())).Returns(new OrganisationInfoChangeRequest());

            var result = await _createOrganisationChangeRequestCommandHandler.Handle(_createOrganisationChangeRequestCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }

        [Test]
        public async Task CreateOrganisationChangeRequestCommand_Success()
        {
            _createOrganisationChangeRequestCommand = new()
            {
                OrganisationInfoChangeRequest = new()
                {

                    OrganisationChangeReqContents = new List<AddOrganisationChangeReqContentDto>
                    {
                        new AddOrganisationChangeReqContentDto
                        {
                            PropertyEnum = OrganisationChangePropertyEnum.OrganisationName,
                            PropertyValue="Name",

                        },
                        new AddOrganisationChangeReqContentDto
                        {
                            PropertyEnum = OrganisationChangePropertyEnum.Logo,
                            PropertyValue="adsdasdadsdsd"
                        },
                    }

                },
                ContentType = "image/png"
            };
            var changeRequests = new List<OrganisationInfoChangeRequest>
            {
                new OrganisationInfoChangeRequest{Id = 1, OrganisationId=2,Organisation=new Organisation{ Id=2, Name="Test"}, },
            };
            var organisations = new List<Organisation>
            {
                new Organisation{ Id = 2, Name = "Test", CrmId = 1 }
            };

            _tokenHelper.Setup(x => x.GetCurrentOrganisationId()).Returns(1);

            _fileService.Setup(x => x.CreateFileCommand(It.IsAny<ByteArrayPart>(), It.IsAny<int>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(new CreateFileCommandIntegrationResponse()
            { Data = new Core.Integration.IntegrationServices.FileServices.Model.Response.Dto.File() { Id = 12, FileType = FileType.OrganisationLogo } });

            _organisationInfoChangeRequestRepository.Setup(x => x.Query()).Returns(changeRequests.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());

            _mapper.Setup(s => s.Map<OrganisationInfoChangeRequest>(It.IsAny<AddOrganisationInfoChangeRequestDto>()))
                          .Returns(new OrganisationInfoChangeRequest()
                          {
                              Id = 2,
                              OrganisationId = 2,
                              Organisation = new Organisation { Id = 2, Name = "Test" },
                              OrganisationChangeReqContents = new List<OrganisationChangeReqContent>() {
                                  new OrganisationChangeReqContent() {
                                     Id = 2,
                                     RequestId = 2,
                                     PropertyEnum=OrganisationChangePropertyEnum.Logo,
                                     PropertyValue="Test Logo"
                                  }
                                  },

                          });

            _organisationInfoChangeRequestRepository.Setup(x => x.Add(It.IsAny<OrganisationInfoChangeRequest>())).Returns(new OrganisationInfoChangeRequest());

            var result = await _createOrganisationChangeRequestCommandHandler.Handle(_createOrganisationChangeRequestCommand, new CancellationToken());

            result.Success.Should().BeTrue();
        }
    }
}


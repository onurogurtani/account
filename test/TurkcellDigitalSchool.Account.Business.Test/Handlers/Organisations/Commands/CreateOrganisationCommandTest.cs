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
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Core.Utilities.Results;
using static TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands.CreateOrganisationCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Organisations.Commands
{
    [TestFixture]

    public class CreateOrganisationCommandTest
    {
        private CreateOrganisationCommand _createOrganisationCommand;
        private CreateOrganisationCommandHandler _createOrganisationCommandHandler;

        Mock<IOrganisationRepository> _organisationRepository;
        Mock<IOrganisationTypeRepository> _organisationTypeRepository;
        Mock<IPackageRoleRepository> _packageRoleRepository;
        Mock<IPackageRepository> _packageRepository;

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

            _organisationRepository = new Mock<IOrganisationRepository>();
            _organisationTypeRepository = new Mock<IOrganisationTypeRepository>();
            _packageRoleRepository = new Mock<IPackageRoleRepository>();
            _packageRepository = new Mock<IPackageRepository>();

            _createOrganisationCommand = new CreateOrganisationCommand();
            _createOrganisationCommandHandler = new(_organisationRepository.Object, _organisationTypeRepository.Object, _packageRoleRepository.Object, _mediator.Object, _packageRepository.Object, _mapper.Object);
        }

        [Test]
        public async Task CreateOrganisationCommand_Success()
        {
            _createOrganisationCommand = new()
            {
                Organisation = new()
                {
                    Name = "Test",
                    VirtualMeetingRoomQuota = 1,
                    VirtualTrainingRoomQuota = 1,
                    OrganisationWebSite = "Test",
                }
            };

            var organisationTypes = new List<OrganisationType>
            {
                new OrganisationType{ Id = 1, Name = "Deneme", IsSingularOrganisation = true }
            };

            var packageRole = new List<PackageRole>
            {
                new PackageRole{ Id = 1, PackageId = 123, RoleId = 62 }
            };

            var user = new CreateAdminCommand
            {
                Admin = new CreateUpdateAdminDto
                {
                    UserName = "22222222222",
                    UserType = UserType.OrganisationAdmin,
                    CitizenId = "22222222222",
                    Name = "test",
                    SurName = "test",
                    Email = "test@test.com",
                    MobilePhones = "5552223344",
                    RoleIds = new List<long> { 1 },
                    Status = true
                }
            };

            var organisations = new List<Organisation>
            {
                new Organisation{ Id = 2, Name = "Name", CrmId = 1 }
            };

            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());

            _organisationTypeRepository.Setup(x => x.Query()).Returns(organisationTypes.AsQueryable().BuildMock());
            _organisationTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<OrganisationType, bool>>>())).ReturnsAsync(organisationTypes.First());

            _packageRoleRepository.Setup(x => x.Query()).Returns(packageRole.AsQueryable().BuildMock());
            _packageRoleRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<PackageRole, bool>>>())).ReturnsAsync(packageRole.First());

            _mediator.Setup(x => x.Send(It.IsAny<CreateAdminCommand>(), CancellationToken.None)).ReturnsAsync(new SuccessResult());

            _organisationRepository.Setup(x => x.Add(It.IsAny<Organisation>())).Returns(new Organisation());

            var result = await _createOrganisationCommandHandler.Handle(_createOrganisationCommand, new CancellationToken());
            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task CreateOrganisationCommand_ExistByName_Error()
        {
            _createOrganisationCommand = new()
            {
                Organisation = new()
                {
                    Name = "Name",
                    CrmId = 1,
                },
            };

            var organisations = new List<Organisation>
            {
                new Organisation{ Id = 2, Name = "Name", CrmId = 1 }
            };

            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.Add(It.IsAny<Organisation>())).Returns(organisations.First());

            var result = await _createOrganisationCommandHandler.Handle(_createOrganisationCommand, new CancellationToken());

            result.Success.Should().BeFalse();
        }
    }
}


using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Entities.Dtos.Admin;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Organisations.Commands
{
    [TestFixture]

    public class CreateOrganisationCommandTest
    {
        Mock<IOrganisationRepository> _organisationRepository;
        Mock<IOrganisationTypeRepository> _organisationTypeRepository; 
        Mock<IRoleRepository> _roleRepository;

        private CreateOrganisationCommand _createOrganisationCommand;
        private CreateOrganisationCommand.CreateOrganisationCommandHandler _createOrganisationCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;


        [SetUp]
        public void Setup()
        {
            _organisationRepository = new Mock<IOrganisationRepository>();
            _organisationTypeRepository = new Mock<IOrganisationTypeRepository>();
            _mediator = new Mock<IMediator>();
            _roleRepository = new Mock<IRoleRepository>();

            _createOrganisationCommand = new CreateOrganisationCommand();
            _createOrganisationCommandHandler = new(_organisationRepository.Object, _organisationTypeRepository.Object, _mediator.Object, _roleRepository.Object);

         
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
        public async Task CreateOrganisationCommand_Success()
        {
            _createOrganisationCommand = new()
            {
                Organisation = new()
                {
                    Id = 0,
                    Code = "Test",
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    PackageName = "Test",
                    VirtualMeetingRoomQuota = 1,
                    VirtualTrainingRoomQuota = 1,
                    OrganisationWebSite = "Test",
                }
            };

            var organisationTypes = new List<OrganisationType>
            {
                new OrganisationType{ Id = 1, Name = "Deneme", IsSingularOrganisation = true }
            };

            var roles = new List<Role>
            {
                new Role{ Id = 1, Name = "Deneme" }
            };

            var user = new CreateAdminCommand
            {
                Admin = new CreateUpdateAdminDto
                {
                    UserName = "22222222222",
                    AdminTypeEnum = AdminTypeEnum.OrganisationAdmin ,
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

            _roleRepository.Setup(x => x.Query()).Returns(roles.AsQueryable().BuildMock());
            _roleRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Role, bool>>>())).ReturnsAsync(roles.First());

            _mediator.Setup(x => x.Send(It.IsAny<CreateAdminCommand>(),CancellationToken.None));

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
                    Id = 1,
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
            result.Message.Should().Be(Messages.SameNameAlreadyExist);
        }
    }
}


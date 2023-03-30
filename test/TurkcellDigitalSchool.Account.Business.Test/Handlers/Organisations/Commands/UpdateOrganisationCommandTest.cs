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
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Entities.Dtos.Admin;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Organisations.Commands
{
    [TestFixture]

    public class UpdateOrganisationCommandTest
    {
        Mock<IOrganisationRepository> _organisationRepository;
        Mock<IOrganisationTypeRepository> _organisationTypeRepository; 
        Mock<IRoleRepository> _roleRepository;
        Mock<IUserRepository> _userRepository;

        private UpdateOrganisationCommand _UpdateOrganisationCommand;
        private UpdateOrganisationCommand.UpdateOrganisationCommandHandler _UpdateOrganisationCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;
        Mock<IMapper> _mapper;


        [SetUp]
        public void Setup()
        {
            _mapper = new Mock<IMapper>();

            _organisationRepository = new Mock<IOrganisationRepository>();
            _organisationTypeRepository = new Mock<IOrganisationTypeRepository>();
            _mediator = new Mock<IMediator>();
            _roleRepository = new Mock<IRoleRepository>();
            _userRepository = new Mock<IUserRepository>();

            _UpdateOrganisationCommand = new UpdateOrganisationCommand();
            _UpdateOrganisationCommandHandler = new(_organisationRepository.Object, _organisationTypeRepository.Object, _mapper.Object, _mediator.Object, _roleRepository.Object, _userRepository.Object);

           
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
        public async Task UpdateOrganisationCommand_Success()
        {
            _UpdateOrganisationCommand = new()
            {
                Organisation = new()
                {
                    Id = 1,
                    Code = "Test",
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                }
            };

            var organisations = new List<Organisation>
            {
                new Organisation{ Id = 1, Name = "Deneme" }
            };

            var organisationTypes = new List<OrganisationType>
            {
                new OrganisationType{ Id = 1, Name = "Deneme", IsSingularOrganisation = true }
            };

            var roles = new List<Role>
            {
                new Role{ Id = 1, Name = "Deneme" }
            };

            var users = new List<User>
            {
                new User{ Id = 1, Name = "Deneme" }
            };

            var user = new UpdateAdminCommand 
            {
                Admin = new CreateUpdateAdminDto
                {
                    Id = users.First().Id,
                    UserName = "22222222222",
                    AdminTypeEnum = AdminTypeEnum.OrganisationAdmin,
                    CitizenId = "22222222222",
                    Name = "test",
                    SurName = "test",
                    Email = "test@test.com",
                    MobilePhones = "5552223344",
                    RoleIds = new List<long> { 1 },
                    Status = true
                }
            };

            _mediator.Setup(x => x.Send(It.IsAny<UpdateAdminCommand>(),CancellationToken.None));

            _organisationTypeRepository.Setup(x => x.Query()).Returns(organisationTypes.AsQueryable().BuildMock());
            _organisationTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<OrganisationType, bool>>>())).ReturnsAsync(organisationTypes.First());

            _roleRepository.Setup(x => x.Query()).Returns(roles.AsQueryable().BuildMock());
            _roleRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Role, bool>>>())).ReturnsAsync(roles.First());

            _userRepository.Setup(x => x.Query()).Returns(users.AsQueryable().BuildMock());
            _userRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<User, bool>>>())).ReturnsAsync(users.First());

            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Organisation, bool>>>())).ReturnsAsync(_UpdateOrganisationCommand.Organisation);
            _organisationRepository.Setup(x => x.Update(It.IsAny<Organisation>())).Returns(new Organisation());

            var result = await _UpdateOrganisationCommandHandler.Handle(_UpdateOrganisationCommand, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task UpdateOrganisationCommand_OrganisationNameExist_Error()
        {
            _UpdateOrganisationCommand = new()
            {
                Organisation = new()
                {
                    Id = 1,
                    Code = "Test",
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    CrmId = 1,
                }
            };

            var organisations = new List<Organisation>
            {
                new Organisation{Id = 2, Name = "Test", CrmId=1 }
            };

            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Organisation, bool>>>())).ReturnsAsync(_UpdateOrganisationCommand.Organisation);
            _organisationRepository.Setup(x => x.Update(It.IsAny<Organisation>())).Returns(new Organisation());

            var result = await _UpdateOrganisationCommandHandler.Handle(_UpdateOrganisationCommand, CancellationToken.None);

            result.Success.Should().BeFalse();
            result.Message.Should().Be(Messages.SameNameAlreadyExist);
        }

        [Test]
        public async Task UpdateOrganisationCommand_Organisation_Entity_Null()
        {
            _UpdateOrganisationCommand = new()
            {
                Organisation = new()
                {
                    Id = 1,

                }
            };

            var organisations = new List<Organisation>
            {
                new Organisation{
                    Id = 1
                }
            };

            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Organisation, bool>>>())).ReturnsAsync(() => null);

            var result = await _UpdateOrganisationCommandHandler.Handle(_UpdateOrganisationCommand, CancellationToken.None);

            result.Success.Should().BeFalse();
            result.Message.Should().Be(Messages.RecordDoesNotExist);
        }
    }
}


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
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Utilities.IoC;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.OrganisationTypes.Commands
{
    public class CreateOrganisationTypeCommandTest
    {
        Mock<IOrganisationTypeRepository> _organisationTypeRepository;

        private CreateOrganisationTypeCommand _createOrganisationTypeCommand;
        private CreateOrganisationTypeCommand.CreateOrganisationTypeCommandHandler _createOrganisationTypeCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;
        Mock<IMapper> _mapper;


        [SetUp]
        public void Setup()
        {
            _organisationTypeRepository = new Mock<IOrganisationTypeRepository>();
            _mapper = new Mock<IMapper>();

            _createOrganisationTypeCommand = new CreateOrganisationTypeCommand();
            _createOrganisationTypeCommandHandler = new(_organisationTypeRepository.Object);

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
        }


        [Test]
        public async Task CreateOrganisationTypeCommand_Success()
        {
            _createOrganisationTypeCommand = new()
            {
                OrganisationType = new()
                {
                    Id = 1,
                    Code = "Test",
                    Description = "Test",
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    IsSingularOrganisation = true
                }
            };
            var contractTypes = new List<OrganisationType>
            {
                new OrganisationType{Id = 1, Name = "Deneme " }
            };

            _organisationTypeRepository.Setup(x => x.Query()).Returns(contractTypes.AsQueryable().BuildMock());
            _organisationTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<OrganisationType, bool>>>())).ReturnsAsync(_createOrganisationTypeCommand.OrganisationType);
            _organisationTypeRepository.Setup(x => x.Update(It.IsAny<OrganisationType>())).Returns(new OrganisationType());

            var result = await _createOrganisationTypeCommandHandler.Handle(_createOrganisationTypeCommand, CancellationToken.None);

            result.Success.Should().BeTrue();

        }

        [Test]
        public async Task CreateOrganisationTypeCommand_OrganisationTypeExist_Error()
        {
            _createOrganisationTypeCommand = new()
            {
                OrganisationType = new()
                {
                    Id = 1,
                    Code = "Test",
                    Description = "Test",
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    IsSingularOrganisation = true
                }
            };
            var organisationTypes = new List<OrganisationType>
            {
                new OrganisationType{Id = 2, Name = "Test " }
            };

            _organisationTypeRepository.Setup(x => x.Query()).Returns(organisationTypes.AsQueryable().BuildMock());
            _organisationTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<OrganisationType, bool>>>())).ReturnsAsync(_createOrganisationTypeCommand.OrganisationType);
            _organisationTypeRepository.Setup(x => x.Update(It.IsAny<OrganisationType>())).Returns(new OrganisationType());

            var result = await _createOrganisationTypeCommandHandler.Handle(_createOrganisationTypeCommand, CancellationToken.None);

            result.Success.Should().BeFalse();
            result.Message.Should().Be(Messages.SameNameAlreadyExist);

        }


    }
}

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
using TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Organisations.Commands
{
    [TestFixture]

    public class UpdateOrganisationStatusCommandTest
    {
        Mock<IOrganisationRepository> _organisationRepository;

        private UpdateOrganisationStatusCommand _UpdateOrganisationStatusCommand;
        private UpdateOrganisationStatusCommand.UpdateOrganisationStatusCommandHandler _UpdateOrganisationStatusCommandHandler;

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

            _UpdateOrganisationStatusCommand = new UpdateOrganisationStatusCommand();
            _UpdateOrganisationStatusCommandHandler = new(_organisationRepository.Object);

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
        public async Task UpdateOrganisationStatusCommand_Success()
        {
            _UpdateOrganisationStatusCommand = new()
            {
                Id=1,
                OrganisationStatusInfo=Entities.Enums.OrganisationStatusInfo.Active,
                ReasonForStatus="Test"
                
            };
            var organisations = new List<Organisation>
            {
                new Organisation{Id = 1}
            };

            _organisationRepository.Setup(x => x.Query()).Returns(organisations.AsQueryable().BuildMock());
            _organisationRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Organisation, bool>>>())).ReturnsAsync(organisations.First());
            _organisationRepository.Setup(x => x.Update(It.IsAny<Organisation>())).Returns(new Organisation());
            
            var result = await _UpdateOrganisationStatusCommandHandler.Handle(_UpdateOrganisationStatusCommand, CancellationToken.None);

            result.Success.Should().BeTrue();

        }
    }
}


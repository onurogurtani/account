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
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using static TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands.UpdateOrganisationStatusCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Organisations.Commands
{
    [TestFixture]

    public class UpdateOrganisationStatusCommandTest
    {
        private UpdateOrganisationStatusCommand _UpdateOrganisationStatusCommand;
        private UpdateOrganisationStatusCommandHandler _UpdateOrganisationStatusCommandHandler;

        Mock<IOrganisationRepository> _organisationRepository;

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

            _UpdateOrganisationStatusCommand = new UpdateOrganisationStatusCommand();
            _UpdateOrganisationStatusCommandHandler = new(_organisationRepository.Object);
        }

        [Test]
        public async Task UpdateOrganisationStatusCommand_Success()
        {
            _UpdateOrganisationStatusCommand = new()
            {
                Id=1,
                OrganisationStatusInfo=OrganisationStatusInfo.Active,
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


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
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Utilities.IoC;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.OrganisationTypes.Commands
{
    public class CreateOrganisationTypeCommandTest
    {
        private CreateOrganisationTypeCommand _createOrganisationTypeCommand;
        private CreateOrganisationTypeCommand.CreateOrganisationTypeCommandHandler _createOrganisationTypeCommandHandler;

        Mock<IOrganisationTypeRepository> _organisationTypeRepository;

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

            _organisationTypeRepository = new Mock<IOrganisationTypeRepository>();

            _createOrganisationTypeCommand = new CreateOrganisationTypeCommand();
            _createOrganisationTypeCommandHandler = new(_organisationTypeRepository.Object);
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
        }
    }
}

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
using TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands.DeletePackageTypeCommand;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.PackageTypes.Commands
{
    [TestFixture]

    public class DeleteTargetScreenCommandTest
    {
        Mock<IPackageTypeRepository> _packageTypeRepository;
       
        private DeletePackageTypeCommand _deletePackageTypeCommand;
        private DeletePackageTypeCommandHandler _deletePackageTypeCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;


        [SetUp]
        public void Setup()
        {
            _packageTypeRepository = new Mock<IPackageTypeRepository>();
            
            _deletePackageTypeCommand = new DeletePackageTypeCommand();
            _deletePackageTypeCommandHandler = new(_packageTypeRepository.Object);

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

        public async Task DeletePackageTypeCommand_Success()
        {
            _deletePackageTypeCommand.Id = 1; 

            var packageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 1,
                    UpdateTime= DateTime.Now
                }
            };

            _packageTypeRepository.Setup(x => x.Query()).Returns(packageTypes.AsQueryable().BuildMock());
            _packageTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<PackageType, bool>>>())).ReturnsAsync(new PackageType());
            _packageTypeRepository.Setup(x => x.Delete(It.IsAny<PackageType>()));

            var result = await _deletePackageTypeCommandHandler.Handle(_deletePackageTypeCommand, new CancellationToken());

            result.Success.Should().BeTrue();

        }

      
        [Test]
        public async Task DeletePackageTypeCommand_EntityNull_Error()
        {
            _deletePackageTypeCommand.Id = 1;


            var packageTypes = new List<PackageType>
            {
                new PackageType{Id = 1, Name="Test", IsActive=true },
            };

            _packageTypeRepository.Setup(x => x.Query()).Returns(packageTypes.AsQueryable().BuildMock());
            _packageTypeRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<PackageType, bool>>>())).ReturnsAsync(() => null);

            var result = await _deletePackageTypeCommandHandler.Handle(_deletePackageTypeCommand, new CancellationToken());

            result.Success.Should().BeFalse();

        }

    }
}


using System;
using System.Collections.Generic;
using System.IO;
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
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationLogos.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Utilities.File;
using TurkcellDigitalSchool.Core.Utilities.File.Model;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.File.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.OrganisationLogos.Commands
{
    public class UpdateOrganisationLogoCommandTest
    {
        Mock<IFileRepository> _fileRepository;
        Mock<IFileService> _fileService;
        Mock<IPathHelper> _pathHelper;
        Mock<IFormFile> _formFile;

        private UpdateOrganisationLogoCommand _updateOrganisationLogoCommand;
        private UpdateOrganisationLogoCommand.UpdateOrganisationLogoCommandHandler _updateOrganisationLogoCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;


        [SetUp]
        public void Setup()
        {
            _fileRepository = new Mock<IFileRepository>();
            _fileService = new Mock<IFileService>();
            _pathHelper = new Mock<IPathHelper>();
            _formFile = new Mock<IFormFile>();

            _updateOrganisationLogoCommand = new UpdateOrganisationLogoCommand();
            _updateOrganisationLogoCommandHandler = new(_fileRepository.Object, _fileService.Object, _pathHelper.Object);

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
        public async Task OrganisationLogoTypeNotInAllowedType_Failed()
        {
            var content = "Hello World from a Fake File";
            var fileName = "test.pdf";
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream);
            writer.Write(content);
            writer.Flush();
            stream.Position = 0;

            //create FormFile with desired data
            IFormFile file = new FormFile(stream, 0, stream.Length, "id_from_form", fileName)
            {
                Headers = new HeaderDictionary(),
                ContentType = "application/pdf"
            };

            _updateOrganisationLogoCommand = new()
            {
                FileName = "test",
                Image = file
            };

            var result = await _updateOrganisationLogoCommandHandler.Handle(_updateOrganisationLogoCommand, CancellationToken.None);
            result.Success.Should().BeFalse();
            result.Message.Should().Be(Messages.FileTypeError);
        }

        [Test]
        public async Task OrganisationLogoLength_Failed()
        {
            var content = "Hello World from a Fake File";
            var fileName = "test.png";
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream);
            writer.Write(content);
            writer.Flush();
            stream.Position = 0;

            //create FormFile with desired data
            IFormFile file = new FormFile(stream, 0, 5000001, "id_from_form", fileName)
            {
                Headers = new HeaderDictionary(),
                ContentType = "image/png",
            };

            _updateOrganisationLogoCommand = new()
            {
                FileName = "test",
                Image = file
            };

            var result = await _updateOrganisationLogoCommandHandler.Handle(_updateOrganisationLogoCommand, CancellationToken.None);
            result.Success.Should().BeFalse();
            result.Message.Should().Be(Messages.FileSizeError);
        }

        [Test]
        public async Task OrganisationLogoSave_Success()
        {
            var content = "Hello World from a Fake File";
            var fileName = "test.png";
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream);
            writer.Write(content);
            writer.Flush();
            stream.Position = 0;

            //create FormFile with desired data
            IFormFile file = new FormFile(stream, 0, stream.Length, "id_from_form", fileName)
            {
                Headers = new HeaderDictionary(),
                ContentType = "image/png"
            };

            _updateOrganisationLogoCommand = new()
            {
                Id = 1,
                FileName = "test",
                Image = file
            };

            var logo = new Entities.Concrete.File { Id = _updateOrganisationLogoCommand.Id, FileName = _updateOrganisationLogoCommand.FileName };

            var organisationLogos = new List<Entities.Concrete.File> { new Entities.Concrete.File { Id = 1, FileName = "test" } };

            _fileRepository.Setup(x => x.Query()).Returns(organisationLogos.AsQueryable().BuildMock());
            _fileRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Entities.Concrete.File, bool>>>())).ReturnsAsync(logo);

            _pathHelper.Setup(x => x.GetPath(It.IsAny<string>())).Returns("OrganisationLogo");

            var saveFileReturn = new DataResult<string>("test", true);
            _fileService.Setup(x => x.SaveFile(It.IsAny<SaveFileRequest>())).ReturnsAsync(saveFileReturn);

            _fileRepository.Setup(x => x.Add(It.IsAny<Entities.Concrete.File>())).Returns(new Entities.Concrete.File());

            var result = await _updateOrganisationLogoCommandHandler.Handle(_updateOrganisationLogoCommand, CancellationToken.None);
            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task OrganisationLogoSave_Failed()
        {
            var content = "Hello World from a Fake File";
            var fileName = "test.png";
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream);
            writer.Write(content);
            writer.Flush();
            stream.Position = 0;

            //create FormFile with desired data
            IFormFile file = new FormFile(stream, 0, stream.Length, "id_from_form", fileName)
            {
                Headers = new HeaderDictionary(),
                ContentType = "image/png"
            };

            _updateOrganisationLogoCommand = new()
            {
                Id = 1,
                FileName = "test",
                Image = file
            };

            _pathHelper.Setup(x => x.GetPath(It.IsAny<string>())).Returns("OrganisationLogo");

            var saveFileReturn = new DataResult<string>("test", false);
            _fileService.Setup(x => x.SaveFile(It.IsAny<SaveFileRequest>())).ReturnsAsync(saveFileReturn);

            _fileRepository.Setup(x => x.Add(It.IsAny<Entities.Concrete.File>())).Returns(new Entities.Concrete.File());

            var result = await _updateOrganisationLogoCommandHandler.Handle(_updateOrganisationLogoCommand, CancellationToken.None);
            result.Success.Should().BeFalse();
        }
    }
}


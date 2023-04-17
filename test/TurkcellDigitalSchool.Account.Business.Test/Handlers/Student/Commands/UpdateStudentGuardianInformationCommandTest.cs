using MediatR;
using Microsoft.AspNetCore.Http;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Enums.QuestionOfExamEnums;
using static TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands.UpdateStudentGuardianInformationCommand;
using System.Linq.Expressions;
using TurkcellDigitalSchool.Common.Constants;
using FluentAssertions;
using System.Linq;
using MockQueryable.Moq;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Student.Commands
{
    [TestFixture]
    public class UpdateStudentGuardianInformationCommandTest
    {
        Mock<IStudentGuardianInformationRepository> _studentGuardianInformationRepository;

        UpdateStudentGuardianInformationCommand _updateStudentGuardianInformationCommand;
        UpdateStudentGuardianInformationCommandHandler _updateStudentGuardianInformationCommandHandler;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;


        [SetUp]
        public void Setup()
        {
            _studentGuardianInformationRepository = new Mock<IStudentGuardianInformationRepository>();

            _updateStudentGuardianInformationCommand = new UpdateStudentGuardianInformationCommand();
            _updateStudentGuardianInformationCommandHandler = new UpdateStudentGuardianInformationCommandHandler(_studentGuardianInformationRepository.Object);

            _mediator = new Mock<IMediator>();
            _serviceProvider = new Mock<IServiceProvider>();
            _httpContextAccessor = new Mock<IHttpContextAccessor>();
            _httpContext = new Mock<HttpRequest>();
            _headerDictionary = new Mock<IHeaderDictionary>();

            _serviceProvider.Setup(x => x.GetService(typeof(IMediator))).Returns(_mediator.Object);
            ServiceTool.ServiceProvider = _serviceProvider.Object;
            _headerDictionary.Setup(x => x["Referer"]).Returns("");
            _httpContext.Setup(x => x.Headers).Returns(_headerDictionary.Object);
            _httpContextAccessor.Setup(x => x.HttpContext.Request).Returns(_httpContext.Object);
            _serviceProvider.Setup(x => x.GetService(typeof(IHttpContextAccessor))).Returns(_httpContextAccessor.Object);
        }

        [Test]
        public async Task UpdateStudentGuardianInformationCommand_Create_Success()
        {
            // TODO Unittest generic mesaj yapısından ötürü çalışmıyor. tekrar test edielcek.

            _updateStudentGuardianInformationCommand = new()
            {
                UserId = 1,
                CitizenId = 1,
                Email = "yadaskin@gmail.com",
                Name = "Yusuf",
                SurName = "Daşkın",
                MobilPhones = "05332100700"
            };
            _studentGuardianInformationRepository.Setup(x => x.CreateAndSave(It.IsAny<StudentGuardianInformation>(), It.IsAny<int?>(), It.IsAny<bool>()));

            var result = await _updateStudentGuardianInformationCommandHandler.Handle(_updateStudentGuardianInformationCommand, new CancellationToken());
            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task UpdateStudentGuardianInformationCommand_Update_Success()
        {
            // TODO Unittest generic mesaj yapısından ötürü çalışmıyor. tekrar test edielcek.
            _updateStudentGuardianInformationCommand = new()
            {
                UserId = 1,
                CitizenId = 1,
                Email = "yadaskin@gmail.com",
                Name = "Yusuf",
                SurName = "Daşkın",
                MobilPhones = "05332100700"
            };


            var list = new List<StudentGuardianInformation>()
            {
                new StudentGuardianInformation
                {
                    Id=1,
                    UserId=1
                }
            };

            _studentGuardianInformationRepository.Setup(x => x.Query()).Returns(list.AsQueryable().BuildMock());
            _studentGuardianInformationRepository.Setup(x => x.UpdateAndSave(It.IsAny<StudentGuardianInformation>(), It.IsAny<int?>(), It.IsAny<bool>()));

            var result = await _updateStudentGuardianInformationCommandHandler.Handle(_updateStudentGuardianInformationCommand, new CancellationToken());
            result.Success.Should().BeTrue();
        }

    }

}
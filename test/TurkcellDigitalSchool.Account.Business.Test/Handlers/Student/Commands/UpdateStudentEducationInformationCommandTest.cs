using MediatR;
using Microsoft.AspNetCore.Http;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using static TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands.UpdateStudentEducationInformationCommand;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using FluentAssertions;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Enums;
using AutoMapper;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Student.Commands
{
    [TestFixture]
    public class UpdateStudentEducationInformationCommandTest
    {
        UpdateStudentEducationInformationCommand _updateStudentEducationInformationCommand;
        UpdateStudentEducationInformationCommandHandler _updateStudentEducationInformationCommandHandler;

        Mock<IStudentEducationInformationRepository> _studentEducationInformationRepository;
        Mock<IUserService> _userService;

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

            _studentEducationInformationRepository = new Mock<IStudentEducationInformationRepository>();
            _userService = new Mock<IUserService>();

            _updateStudentEducationInformationCommand = new UpdateStudentEducationInformationCommand();
            _updateStudentEducationInformationCommandHandler = new UpdateStudentEducationInformationCommandHandler(_studentEducationInformationRepository.Object, _userService.Object);
        }

        [Test]
        public async Task UpdateStudentEducationInformationCommand_Create_Success()
        {
            _updateStudentEducationInformationCommand = new()
            {
                StudentEducationRequest = new()
                {
                    UserId = 1,
                    CityId = 1,
                    ClassroomId = 1,
                    CountyId = 1,
                    DiplomaGrade = 1,
                    SchoolId = 1,
                    ExamType = ExamType.LGS,
                }
            };
            _studentEducationInformationRepository.Setup(x => x.CreateAndSave(It.IsAny<StudentEducationInformation>(), It.IsAny<int?>(), It.IsAny<bool>()));

            var result = await _updateStudentEducationInformationCommandHandler.Handle(_updateStudentEducationInformationCommand, new CancellationToken());
            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task UpdateStudentEducationInformationCommand_Update_Success()
        {
            _updateStudentEducationInformationCommand = new()
            {
                StudentEducationRequest = new()
                {
                    UserId = 1,
                    CityId = 1,
                    ClassroomId = 1,
                    CountyId = 1,
                    DiplomaGrade = 1,
                    SchoolId = 1,
                    ExamType = ExamType.LGS,
                }
            };


            var list = new List<StudentEducationInformation>()
            {
                new StudentEducationInformation
                {
                    Id=1,
                    UserId=1
                }
            };

            _studentEducationInformationRepository.Setup(x => x.Query()).Returns(list.AsQueryable().BuildMock());
            _studentEducationInformationRepository.Setup(x => x.UpdateAndSave(It.IsAny<StudentEducationInformation>(), It.IsAny<int?>(), It.IsAny<bool>()));

            var result = await _updateStudentEducationInformationCommandHandler.Handle(_updateStudentEducationInformationCommand, new CancellationToken());
            result.Success.Should().BeTrue();
        }
    }
}

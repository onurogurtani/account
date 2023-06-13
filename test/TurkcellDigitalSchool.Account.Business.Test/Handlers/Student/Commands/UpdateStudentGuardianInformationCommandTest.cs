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
using static TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands.UpdateStudentParentInformationCommand;
using System.Linq.Expressions;
using TurkcellDigitalSchool.Core.Common.Constants;
using FluentAssertions;
using System.Linq;
using MockQueryable.Moq;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using AutoMapper;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Student.Commands
{
    [TestFixture]
    public class UpdateStudentParentInformationCommandTest
    {
        UpdateStudentParentInformationCommand _updateStudentParentInformationCommand;
        UpdateStudentParentInformationCommandHandler _updateStudentParentInformationCommandHandler;

        Mock<IStudentParentInformationRepository> _studentParentInformationRepository;
        Mock<IUserRepository> _userRepository;

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

            _studentParentInformationRepository = new Mock<IStudentParentInformationRepository>();
            _userRepository = new Mock<IUserRepository>();

            _updateStudentParentInformationCommand = new UpdateStudentParentInformationCommand();
            _updateStudentParentInformationCommandHandler = new UpdateStudentParentInformationCommandHandler(_studentParentInformationRepository.Object, _userRepository.Object);
        }

        [Test]
        public async Task UpdateStudentParentInformationCommand_Create_Success()
        {
            // TODO Unittest generic mesaj yapısından ötürü çalışmıyor. tekrar test edielcek.

            _updateStudentParentInformationCommand = new()
            {
                CitizenId = 52265263252,
                Email = "yadaskin@gmail.com",
                Name = "Yusuf",
                SurName = "Daşkın",
                MobilePhones = "05332100700"
            };
            _studentParentInformationRepository.Setup(x => x.CreateAndSave(It.IsAny<StudentParentInformation>(), It.IsAny<int?>(), It.IsAny<bool>()));

            var result = await _updateStudentParentInformationCommandHandler.Handle(_updateStudentParentInformationCommand, new CancellationToken());
            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task UpdateStudentParentInformationCommand_Update_Success()
        {
            // TODO Unittest generic mesaj yapısından ötürü çalışmıyor. tekrar test edielcek.
            _updateStudentParentInformationCommand = new()
            {
                CitizenId = 52265263252,
                Email = "yadaskin@gmail.com",
                Name = "Yusuf",
                SurName = "Daşkın",
                MobilePhones = "05332100700"
            };


            var list = new List<StudentParentInformation>()
            {
                new StudentParentInformation
                {
                    Id=1,
                    UserId=1
                }
            };

            _studentParentInformationRepository.Setup(x => x.Query()).Returns(list.AsQueryable().BuildMock());
            _studentParentInformationRepository.Setup(x => x.UpdateAndSave(It.IsAny<StudentParentInformation>(), It.IsAny<int?>(), It.IsAny<bool>()));

            var result = await _updateStudentParentInformationCommandHandler.Handle(_updateStudentParentInformationCommand, new CancellationToken());
            result.Success.Should().BeTrue();
        }
    }
}
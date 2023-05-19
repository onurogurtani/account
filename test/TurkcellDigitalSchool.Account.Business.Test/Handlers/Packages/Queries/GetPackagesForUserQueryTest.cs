using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.File;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Core.Utilities.Results;
using static TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries.GetPackagesForUserQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Packages.Queries
{
    [TestFixture]
    public class GetPackagesForUserQueryTest
    {
        private GetPackagesForUserQuery _getPackagesForUserQuery;
        private GetPackagesForUserQueryHandler _getPackagesForUserQueryHandler;

        private Mock<IPackageRepository> _packageRepository;
        private Mock<IFileService> _fileService;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;
        Mock<IMapper> _mapper;
        Mock<RedisService> _redisService;

        [SetUp]
        public void Setup()
        {
            _packageRepository = new Mock<IPackageRepository>();
            _fileService = new Mock<IFileService>();

            _mapper = new Mock<IMapper>();

            _getPackagesForUserQuery = new GetPackagesForUserQuery();
            _getPackagesForUserQueryHandler = new GetPackagesForUserQueryHandler(_packageRepository.Object, _mapper.Object, _fileService.Object);

            _mediator = new Mock<IMediator>();
            _serviceProvider = new Mock<IServiceProvider>();
            _httpContextAccessor = new Mock<IHttpContextAccessor>();
            _httpContext = new Mock<HttpRequest>();
            _headerDictionary = new Mock<IHeaderDictionary>();
            _redisService = new Mock<RedisService>();

            _serviceProvider.Setup(x => x.GetService(typeof(IMediator))).Returns(_mediator.Object);
            ServiceTool.ServiceProvider = _serviceProvider.Object;
            _headerDictionary.Setup(x => x["Referer"]).Returns("");
            _httpContext.Setup(x => x.Headers).Returns(_headerDictionary.Object);
            _httpContextAccessor.Setup(x => x.HttpContext.Request).Returns(_httpContext.Object);
            _serviceProvider.Setup(x => x.GetService(typeof(IHttpContextAccessor))).Returns(_httpContextAccessor.Object);
            _serviceProvider.Setup(x => x.GetService(typeof(RedisService))).Returns(_redisService.Object);
        }

        [Test]
        public async Task GetPackagesForUserQuery_Success()
        {
            _getPackagesForUserQuery = new()
            {
                Pagination = new()
                {
                    PageNumber = 1,
                    PageSize = 10
                }
            };
            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 1,
                    IsActive=true,
                    Name = "Test",
                    PackageKind=PackageKind.Personal,
                    PackageLessons = new List<PackageLesson> {
                        new PackageLesson {
                            Id = 1,
                            Lesson=new Lesson {
                                Id=1,
                                Name="Test",
                                IsActive=true,
                                ClassroomId=1,
                                Classroom= new Classroom{
                                    Id=1,
                                    IsActive=true
                                },
                                Order=1 

                            },
                            LessonId=1,
                            Package=new Package {
                                Id = 1,
                                IsActive=true,
                                PackageKind=PackageKind.Personal,
                                PackageLessons = new List<PackageLesson> {
                                                new PackageLesson {
                                                        Id = 1
                                                }
                                }

                            },
                            PackageId=1,
                            InsertTime=DateTime.Now,
                            InsertUserId=1,
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                        }
                    },
                    ImageOfPackages = new List<ImageOfPackage> {
                        new ImageOfPackage {
                            Id = 1,
                            FileId=1,
                            File = new  File {
                                Id = 1,
                                FileType=FileType.PackageImage
                            } } },
                },

            };

            var sevenThousandItems = new byte[7000];
            for (int i = 0; i < sevenThousandItems.Length; i++)
            {
                sevenThousandItems[i] = 0x20;
            }


            var saveFileReturn =  new DataResult<byte[]>(sevenThousandItems, true);
            _fileService.Setup(x => x.GetFile(It.IsAny<string>())).ReturnsAsync(()=> saveFileReturn);

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            _mapper.Setup(s => s.Map<List<GetPackagesForUserResponseDto>>(It.IsAny<List<Package>>()))
              .Returns(new List<GetPackagesForUserResponseDto> {
                  new GetPackagesForUserResponseDto() {

                  Id = 1,
                  Name = "Test",
                  Content = "Test",
                  Currency = "Test",
                  IsCampaign = true,
                  MaxInstallmentsCount = 1,
                  Price = 1,
                  Summary = "Test",
                  MonthlyInstallmentPrice = 1,
                  Image=new ImageFileDto { },
                  Lessons = new List<string> { "ABC" }


                  }
              });

            var result = await _getPackagesForUserQueryHandler.Handle(_getPackagesForUserQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.File;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.FileServices;
using static TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries.GetPackageForUserQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Packages.Queries
{
    [TestFixture]
    public class GetPackageForUserQueryTest
    {
        private GetPackageForUserQuery _getPackageForUserQuery;
        private GetPackageForUserQueryHandler _getPackageForUserQueryHandler;

        private Mock<IPackageRepository> _packageRepository;
        private Mock<IFileService> _fileService;
        private Mock<IFileServices> _fileIntegrationService;
        private Mock<IMapper> _mapper;

        [SetUp]
        public void Setup()
        {
            _mapper = new Mock<IMapper>();
            _packageRepository = new Mock<IPackageRepository>();
            _fileService = new Mock<IFileService>();
            _fileIntegrationService = new Mock<IFileServices>();

            //   IPackageRepository packageRepository, IMapper mapper, IFileService fileService, IFileServices fileServiceIntegration
            _getPackageForUserQuery = new GetPackageForUserQuery();
            _getPackageForUserQueryHandler = new GetPackageForUserQueryHandler(_packageRepository.Object, _mapper.Object, _fileService.Object, _fileIntegrationService.Object);
        }

        [Test]
        public async Task GetPackageForUserQuery_Success()
        {
            _getPackageForUserQuery.Id = 1;


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


            var saveFileReturn = new DataResult<byte[]>(sevenThousandItems, true);
            _fileService.Setup(x => x.GetFile(It.IsAny<string>())).ReturnsAsync(() => saveFileReturn);

            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            _mapper.Setup(s => s.Map<GetPackageForUserResponseDto>(It.IsAny<Package>()))
              .Returns(new GetPackageForUserResponseDto()
              {
                  Id = 2,
                  Name = "Test",
                  Content = "Test",
                  Currency = "Test",
                  IsCampaign = true,
                  MaxInstallmentsCount = 1,
                  Price = 1,
                  Summary = "Test",
                  MonthlyInstallmentPrice = 1,
                  Images = new List<ImageFileDto> {
                        new ImageFileDto()
                        {

                        }

                  },

                  Lessons = new List<string> { "ABC" }

              });

            var result = await _getPackageForUserQueryHandler.Handle(_getPackageForUserQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetPackageForUserQuery_GetById_Null_Error()
        {
            _getPackageForUserQuery.Id = 1;

            var pageTypes = new List<Package>
            {
                new Package
                {
                    Id = 2,
                    IsActive = true,
                },

            };
            _packageRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());
            //_packageRepository.Setup(x => x.GetAsync(It.IsAny<Expression<Func<Package, bool>>>())).ReturnsAsync(() => null);

            var result = await _getPackageForUserQueryHandler.Handle(_getPackageForUserQuery, CancellationToken.None);

            result.Success.Should().BeFalse();
        }
    }
}
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
using TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Utilities.IoC;
using TurkcellDigitalSchool.Entities.Concrete;
using static TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Queries.GetByFilterPagedPackageTypesQuery;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.PackageTypes.Queries
{
    [TestFixture]
    public class GetByFilterPagedPackageTypesQueryTest
    {
        private GetByFilterPagedPackageTypesQuery _getByFilterPagedPackageTypesQuery;
        private GetByFilterPagedPackageTypesQueryHandler _getByFilterPagedPackageTypesQueryHandler;

        private Mock<IPackageTypeRepository> _packageTypeRepository;

        Mock<IMapper> _mapper;

        Mock<IServiceProvider> _serviceProvider;
        Mock<IHttpContextAccessor> _httpContextAccessor;
        Mock<IHeaderDictionary> _headerDictionary;
        Mock<HttpRequest> _httpContext;
        Mock<IMediator> _mediator;

        [SetUp]
        public void Setup()
        {
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

            _packageTypeRepository = new Mock<IPackageTypeRepository>();

            _mapper = new Mock<IMapper>();

            _getByFilterPagedPackageTypesQuery = new GetByFilterPagedPackageTypesQuery();
            _getByFilterPagedPackageTypesQueryHandler = new GetByFilterPagedPackageTypesQueryHandler( _packageTypeRepository.Object);
        }

        [Test]
        public async Task GetByFilterPagedPackageTypesQuery_Success()
        {
            _getByFilterPagedPackageTypesQuery = new()
            {
                PackageTypeDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "UpdateTimeDESC"

                }
            };

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Today,
                    UpdateUserId= 2,
                    UpdateTime= DateTime.Today,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="ABC"}

                        }

                    }
                },
                 new PackageType{
                    Id = 1,
                    InsertUserId= 2,
                    IsActive= false,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 3,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="CDE"}
                        }

                    }
                },


            };
            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackageTypesQueryHandler.Handle(_getByFilterPagedPackageTypesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedPackageTypesQuery_OrderByIsActiveASC_Success()
        {
            _getByFilterPagedPackageTypesQuery = new()
            {
                PackageTypeDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy= "IsActiveASC"
                }
            };

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Today,
                    UpdateUserId= 2,
                    UpdateTime= DateTime.Today,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="ABC"}

                        }

                    }
                },
                 new PackageType{
                    Id = 1,
                    InsertUserId= 2,
                    IsActive= false,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 3,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="CDE"}
                        }

                    }
                },


            };
            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackageTypesQueryHandler.Handle(_getByFilterPagedPackageTypesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedPackageTypesQuery_OrderByIsActiveDESC_Success()
        {
            _getByFilterPagedPackageTypesQuery = new()
            {
                PackageTypeDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "IsActiveDESC"
                }
            };

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Today,
                    UpdateUserId= 2,
                    UpdateTime= DateTime.Today,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="ABC"}

                        }

                    }
                },
                 new PackageType{
                    Id = 1,
                    InsertUserId= 2,
                    IsActive= false,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 3,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="CDE"}
                        }

                    }
                },


            };
            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackageTypesQueryHandler.Handle(_getByFilterPagedPackageTypesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        } 
       
        [Test]
        public async Task GetByFilterPagedPackageTypesQuery_OrderByNameASC_Success()
        {
            _getByFilterPagedPackageTypesQuery = new()
            {
                PackageTypeDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy= "NameASC"
                }
            };

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Today,
                    UpdateUserId= 2,
                    UpdateTime= DateTime.Today,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="ABC"}

                        }

                    }
                },
                 new PackageType{
                    Id = 1,
                    InsertUserId= 2,
                    IsActive= false,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 3,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="CDE"}
                        }

                    }
                },


            };
            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackageTypesQueryHandler.Handle(_getByFilterPagedPackageTypesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedPackageTypesQuery_OrderByNameDESC_Success()
        {
            _getByFilterPagedPackageTypesQuery = new()
            {
                PackageTypeDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "NameDESC"
                }
            };

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Today,
                    UpdateUserId= 2,
                    UpdateTime= DateTime.Today,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="ABC"}

                        }

                    }
                },
                 new PackageType{
                    Id = 1,
                    InsertUserId= 2,
                    IsActive= false,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 3,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="CDE"}
                        }

                    }
                },


            };
            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackageTypesQueryHandler.Handle(_getByFilterPagedPackageTypesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }       
      
        [Test]
        public async Task GetByFilterPagedPackageTypesQuery_OrderByPackageTypeASC_Success()
        {
            _getByFilterPagedPackageTypesQuery = new()
            {
                PackageTypeDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy= "PackageTypeASC"
                }
            };

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Today,
                    UpdateUserId= 2,
                    UpdateTime= DateTime.Today,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="ABC"}

                        }

                    }
                },
                 new PackageType{
                    Id = 1,
                    InsertUserId= 2,
                    IsActive= false,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 3,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="CDE"}
                        }

                    }
                },


            };
            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackageTypesQueryHandler.Handle(_getByFilterPagedPackageTypesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedPackageTypesQuery_OrderByPackageTypeDESC_Success()
        {
            _getByFilterPagedPackageTypesQuery = new()
            {
                PackageTypeDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "PackageTypeDESC",
                    
                }
            };

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Today,
                    UpdateUserId= 2,
                    UpdateTime= DateTime.Today,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="ABC"}

                        }

                    }
                },
                 new PackageType{
                    Id = 1,
                    InsertUserId= 2,
                    IsActive= false,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 3,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="CDE"}
                        }

                    }
                },


            };
            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackageTypesQueryHandler.Handle(_getByFilterPagedPackageTypesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedPackageTypesQuery_OrderByIdASC_Success()
        {
            _getByFilterPagedPackageTypesQuery = new()
            {
                PackageTypeDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "IdASC"
                }
            };

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Today,
                    UpdateUserId= 2,
                    UpdateTime= DateTime.Today,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="ABC"}

                        }

                    }
                },
                 new PackageType{
                    Id = 1,
                    InsertUserId= 2,
                    IsActive= false,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 3,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="CDE"}
                        }

                    }
                },


            };
            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackageTypesQueryHandler.Handle(_getByFilterPagedPackageTypesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedPackageTypesQuery_OrderByIdDESC_Success()
        {
            _getByFilterPagedPackageTypesQuery = new()
            {
                PackageTypeDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "IdDESC"
                }
            };

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Today,
                    UpdateUserId= 2,
                    UpdateTime= DateTime.Today,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="ABC"}

                        }

                    }
                },
                 new PackageType{
                    Id = 1,
                    InsertUserId= 2,
                    IsActive= false,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 3,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="CDE"}
                        }

                    }
                },


            };
            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackageTypesQueryHandler.Handle(_getByFilterPagedPackageTypesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedPackageTypesQuery_OrderByInsertTimeASC_Success()
        {
            _getByFilterPagedPackageTypesQuery = new()
            {
                PackageTypeDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "InsertTimeASC"
                }
            };

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Today,
                    UpdateUserId= 2,
                    UpdateTime= DateTime.Today,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="ABC"}

                        }

                    }
                },
                 new PackageType{
                    Id = 1,
                    InsertUserId= 2,
                    IsActive= false,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 3,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="CDE"}
                        }

                    }
                },


            };
            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackageTypesQueryHandler.Handle(_getByFilterPagedPackageTypesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedPackageTypesQuery_OrderByInsertTimeDESC_Success()
        {
            _getByFilterPagedPackageTypesQuery = new()
            {
                PackageTypeDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "InsertTimeDESC"
                }
            };

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Today,
                    UpdateUserId= 2,
                    UpdateTime= DateTime.Today,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="ABC"}

                        }

                    }
                },
                 new PackageType{
                    Id = 1,
                    InsertUserId= 2,
                    IsActive= false,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 3,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="CDE"}
                        }

                    }
                },


            };
            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackageTypesQueryHandler.Handle(_getByFilterPagedPackageTypesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedPackageTypesQuery_OrderByUpdateTimeASC_Success()
        {
            _getByFilterPagedPackageTypesQuery = new()
            {
                PackageTypeDetailSearch = new()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    OrderBy = "UpdateTimeASC"
                }
            };

            var pageTypes = new List<PackageType>
            {
                new PackageType{
                    Id = 1,
                    InsertUserId= 1,
                    IsActive= true,
                    Name = "Deneme",
                    InsertTime = DateTime.Today,
                    UpdateUserId= 2,
                    UpdateTime= DateTime.Today,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="ABC"}

                        }

                    }
                },
                 new PackageType{
                    Id = 1,
                    InsertUserId= 2,
                    IsActive= false,
                    Name = "Test",
                    InsertTime = DateTime.Now,
                    UpdateUserId= 3,
                    UpdateTime= DateTime.Now,
                    IsCanSeeTargetScreen= true,
                    PackageTypeTargetScreens =  new List<PackageTypeTargetScreen>{
                        new PackageTypeTargetScreen
                        {
                            Id=1,
                            TargetScreenId=1,
                            PackageTypeId=1,
                            PackageType= new PackageType{ Id=1, Name="CDE"}
                        }

                    }
                },


            };
            _packageTypeRepository.Setup(x => x.Query()).Returns(pageTypes.AsQueryable().BuildMock());

            var result = await _getByFilterPagedPackageTypesQueryHandler.Handle(_getByFilterPagedPackageTypesQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }


    }
}
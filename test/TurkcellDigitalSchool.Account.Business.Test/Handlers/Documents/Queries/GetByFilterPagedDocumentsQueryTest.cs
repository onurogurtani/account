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
using TurkcellDigitalSchool.Account.Business.Handlers.Documents.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Utilities.IoC;

namespace TurkcellDigitalSchool.Account.Business.Test.Handlers.Documents.Queries
{
    [TestFixture]
    public class GetByFilterPagedDocumentsQueryTest
    {
        private GetByFilterPagedDocumentsQuery _getByFilterPagedDocumentsQuery;
        private GetByFilterPagedDocumentsQuery.GetByFilterPagedDocumentsQueryHandler _getByFilterPagedDocumentsQueryHandler;

        private Mock<IDocumentRepository> _documentRepository;
        private Mock<IUserRepository> _userRepository;

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

            _documentRepository = new Mock<IDocumentRepository>();
            _userRepository = new Mock<IUserRepository>();

            _mapper = new Mock<IMapper>();

            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery();
            _getByFilterPagedDocumentsQueryHandler = new GetByFilterPagedDocumentsQuery.GetByFilterPagedDocumentsQueryHandler(_documentRepository.Object, _userRepository.Object, _mapper.Object);
        }

        [Test]
        public async Task GetByFilterPagedDocumentsQuery_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1 },
                    ContractTypeIds = new long[] { 1 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,

                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByIdASC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "IdASC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByIdDESC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "IdDESC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
        
        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByRecordStatusASC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "RecordStatusASC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByRecordStatusDESC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "RecordStatusDESC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByContractKindASC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "ContractKindASC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByContractKindDESC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "ContractKindDESC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }


        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByContractTypeASC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "ContractTypeASC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByContractTypeDESC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "ContractTypeDESC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByContentASC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "ContentASC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByContentDESC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "ContentDESC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
              
        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByVersionASC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "VersionASC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByVersionDESC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "VersionDESC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }


        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByValidStartDateASC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "ValidStartDateASC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByValidStartDateDESC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "ValidStartDateDESC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByValidEndDateASC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "ValidEndDateASC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByValidEndDateDESC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "ValidEndDateDESC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }
        
        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByInsertTimeASC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "InsertTimeASC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByInsertTimeDESC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "InsertTimeDESC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

        [Test]
        public async Task GetByFilterPagedDocumentsQuery_OrderByUpdateTimeASC_Success()
        {
            _getByFilterPagedDocumentsQuery = new GetByFilterPagedDocumentsQuery()
            {
                DocumentDetailSearch = new DocumentDetailSearch()
                {
                    PageSize = 10,
                    PageNumber = 1,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKindName = "test",
                    ContractKindIds = new long[] { 1, 2 },
                    ContractTypeIds = new long[] { 1, 2 },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    OrderBy = "UpdateTimeASC"
                }
            };
            var documents = new List<Document>
            {
                new Document{

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 2,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=2,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 2,
                        ContractType=new ContractType{
                            Id=2,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                },
                new Document{

                    Id = 2,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Now,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind(){
                        Id=1,
                        RecordStatus=Core.Enums.RecordStatus.Active,
                        ContractType=new ContractType(){
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                            InsertTime=DateTime.Now,
                            Code ="test",
                            UpdateTime=DateTime.Now,
                            UpdateUserId=1,
                            Description="test",
                            Name="test",

                        },
                         InsertTime=DateTime.Now,
                         Code ="test",
                         UpdateTime=DateTime.Now,
                         UpdateUserId=1,
                         Description="test",
                         Name="test",
                    },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    IsDeleted=false,
                    UpdateUserId = 1,
                    InsertUserId=1,
                    Content= "test",
                    ContractTypes = new List<DocumentContractType> {
                    new DocumentContractType {
                        Id = 1,
                        ContractTypeId = 1,
                        ContractType=new ContractType{
                            Id=1,
                            RecordStatus=Core.Enums.RecordStatus.Active,
                        },
                        DocumentId=1,
                    }

                    }
                }
            };

            _documentRepository.Setup(x => x.Query()).Returns(documents.AsQueryable().BuildMock());
            _documentRepository.Setup(x => x.GetListAsync(It.IsAny<Expression<Func<Document, bool>>>())).ReturnsAsync(documents);

            _mapper.Setup(s => s.Map<List<DocumentDto>>(It.IsAny<List<Document>>())).Returns(new List<DocumentDto> { new DocumentDto() {

                    Id = 1,
                    ClientRequiredApproval = true,
                    ContractKindId = 1,
                    RequiredApproval = true,
                    Version = 1,
                    InsertTime = DateTime.Today,
                    RecordStatus = Core.Enums.RecordStatus.Active,
                    ContractKind = new ContractKind{Id=1,RecordStatus=Core.Enums.RecordStatus.Active,ContractType=new ContractType{ Id=1,RecordStatus=Core.Enums.RecordStatus.Active} },
                    ValidEndDate = DateTime.Now,
                    ValidStartDate = DateTime.Today,
                    UpdateTime = DateTime.Now,
                    UpdateUserId = 1,
                    InsertUserId = 1
            } });

            var result = await _getByFilterPagedDocumentsQueryHandler.Handle(_getByFilterPagedDocumentsQuery, CancellationToken.None);

            result.Success.Should().BeTrue();
        }

    }
}
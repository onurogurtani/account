using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using System.Linq;
using System.Collections.Generic;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using System;
using TurkcellDigitalSchool.Core.DataTransfers.Dto;
using TurkcellDigitalSchool.Core.DataTransfers;
using TurkcellDigitalSchool.Core.DataAccess.Contexts;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.EducationServices;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.EducationServices.Model.Request;

namespace TurkcellDigitalSchool.Account.Business.Handlers.EYDataTransfers.Commands
{
    [SecuredOperationScope]
    public class RunEYDTAccountCommand : IRequest<DataResult<EYDataTransferMap>>
    {
        public int OldEducationYearId { get; set; }
        public int NewEducationYearId { get; set; }
        public DataTransferType DataTransferType { get; set; }

        [MessageClassAttr("Eğitim Yılı Devir")]
        public class RunEYDTAccountCommandHandler : RunEYDataTransferCommandBase, IRequestHandler<RunEYDTAccountCommand, DataResult<EYDataTransferMap>>
        {
            private readonly IEYDataTransferMapRepository _eyDataTransferMapRepository;
            private readonly IEducationYearRepository _educationYearRepository;
            private readonly IMediator _mediator;
            private AccountDbContext _accountDbContext { get; set; }
            private readonly IEducationServices _educationServices;
            private readonly ITokenHelper _tokenHelper;
            private List<DataTransferRefDto> _dataTransferRefs = new();

            public RunEYDTAccountCommandHandler(IEducationServices educationServices, IMediator mediator, AccountDbContext accountDbContext, IEYDataTransferMapRepository eyDataTransferMapRepository, IEducationYearRepository educationYearRepository, ITokenHelper tokenHelper)
            {
                _eyDataTransferMapRepository = eyDataTransferMapRepository;
                _educationYearRepository = educationYearRepository;
                _accountDbContext = accountDbContext;
                _mediator = mediator;
                _educationServices = educationServices;
                _tokenHelper = tokenHelper;
            }

            public override ProjectDbContext GetDbContext()
            {
                return _accountDbContext;
            }

            public override async Task<IEnumerable<DataTransferRefDto>> GetEYDataTransferRefs(IEnumerable<DataTransferRefDto> dataTransferRefDtos)
            {
                //var data = await _mediator.Send(new GetEYDataTransferRefsQuery { NewEducationYearId = _newEducationYearId, DataTransferRefDtos = dataTransferRefDtos });
                var data = await _educationServices
                    .GetEYDataTransferRefs(new
                    Core.Integration.IntegrationServices.EducationServices.Model.Request.GetEYDTRefsQueryIntegrationRequest
                    { DataTransferRefDtos = dataTransferRefDtos, NewEducationYearId = _newEducationYearId }
                    );
                return data.Data;
            }
            public override async Task<IEnumerable<DataTransferMapDto>> CreateEYDataTransferMaps(IEnumerable<DataTransferMapDto> data)
            {
                var mapSaveResult = await _educationServices
                    .CreateEYDataTransferMaps(new Core.Integration.IntegrationServices.EducationServices.Model.Request.CreateEYDTMCommandIntegrationRequest { Data = data });
                return mapSaveResult.Data;
            }

            public async Task<DataResult<EYDataTransferMap>> Handle(RunEYDTAccountCommand request, CancellationToken cancellationToken)
            {
                _oldEducationYearId = request.OldEducationYearId;
                _newEducationYearId = request.NewEducationYearId;

                try
                {
                    switch (request.DataTransferType)
                    {
                        case DataTransferType.Package:
                            await RunPackageTransfer();
                            break;
                        default:
                            break;
                    }
                    return new SuccessDataResult<EYDataTransferMap>(new EYDataTransferMap());
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    throw;
                }

            }

            #region * * * Package * * * 

            private async Task RunPackageTransfer()
            {
                await LoadEYDataTransferRefs(_accountDbContext.Lessons);
                await LoadEYDataTransferRefs(_accountDbContext.TestExams);
                var packageMaps = await RTMaps(new string[] { }, _accountDbContext.Packages.Where(w => w.EducationYearId == _oldEducationYearId));
                await RTMaps(new string[] { "Package" }, _accountDbContext.PackageCoachServicePackages.Where(w => packageMaps.Select(s => s.OldId).Contains(w.PackageId)));
                await RTMaps(new string[] { "Package" }, _accountDbContext.PackageContractTypes.Where(w => packageMaps.Select(s => s.OldId).Contains(w.PackageId)));
                var packagedocumentMap = await RTMaps(new string[] { "Package" }, _accountDbContext.PackageDocument.Where(w => packageMaps.Select(s => s.OldId).Contains(w.PackageId)));
                var packageeventMap = await RTMaps(new string[] { "Package" }, _accountDbContext.PackageEvents.Where(w => packageMaps.Select(s => s.OldId).Contains(w.PackageId)));
                var packagefieldtypeMap = await RTMaps(new string[] { "Package" }, _accountDbContext.PackageFieldType.Where(w => packageMaps.Select(s => s.OldId).Contains(w.PackageId)));
                await RTMaps(new string[] { "Package", "Lesson" }, _accountDbContext.PackageLessons.Where(w => packageMaps.Select(s => s.OldId).Contains(w.PackageId)));
                await RTMaps(new string[] { "Package" }, _accountDbContext.PackageMotivationActivityPackages.Where(w => packageMaps.Select(s => s.OldId).Contains(w.PackageId)));
                await RTMaps(new string[] { "Package" }, _accountDbContext.PackagePackageTypeEnums.Where(w => packageMaps.Select(s => s.OldId).Contains(w.PackageId)));
                await RTMaps(new string[] { "Package" }, _accountDbContext.PackagePublishers.Where(w => packageMaps.Select(s => s.OldId).Contains(w.PackageId)));
                await RTMaps(new string[] { "Package" }, _accountDbContext.PackageRoles.Where(w => packageMaps.Select(s => s.OldId).Contains(w.PackageId)));
                await RTMaps(new string[] { "Package", "TestExam" }, _accountDbContext.PackageTestExams.Where(w => packageMaps.Select(s => s.OldId).Contains(w.PackageId)));
                await RTMaps(new string[] { "Package" }, _accountDbContext.PackageTestExamPackages.Where(w => packageMaps.Select(s => s.OldId).Contains(w.PackageId)));
            }
            private async Task<IEnumerable<DataTransferMapDto>> RTMaps(string[] refArray, IEnumerable<EntityDefault> dbSet)
            {
                List<DataTransferRefDto> refs = new List<DataTransferRefDto>();
                foreach (var item in refArray)
                {
                    refs.Add(new DataTransferRefDto { Table = item, Field = item + "Id" });
                }
                var data = await RunAndSaveAsync(refs, dbSet.ToList());
                return data;
            }

            public async Task<IEnumerable<DataTransferRefDto>> LoadEYDataTransferRefs<T>(DbSet<T> dbSet) where T : class, IReadOnlyEntity
            {
                string table = dbSet.EntityType.ToString().Replace("EntityType: ", "");
                var refResult = await _educationServices
                    .GetEYDataTransferRefs(new GetEYDTRefsQueryIntegrationRequest
                    { DataTransferRefDtos = new List<DataTransferRefDto> { new DataTransferRefDto { Table = table, Field = table + "Id" } }, NewEducationYearId = _newEducationYearId }
                    );
                var maps = refResult.Data.FirstOrDefault().MapData;
                await CheckRefs(dbSet, maps, table);
                _dataTransferRefs.AddRange(refResult.Data);
                return _dataTransferRefs;
            }

            private async Task CheckRefs<T>(DbSet<T> dbSet, IEnumerable<DataTransferMapDto> refs, string table) where T : class, IReadOnlyEntity
            {

                var dbSetCount = await dbSet.Where(w => refs.Select(s => s.NewId).Contains(w.Id)).CountAsync();
                if (dbSetCount != refs.Count())
                {
                    throw new Exception($"{table} aktarım senkronizasyonu henüz tamamlanmamış ({dbSetCount}/{refs.Count()}). Daha sonra tekrar deneyin. ");
                }
            }

            //private async Task<IEnumerable<DataTransferMapDto>> RTWorkPlanQuestionOfAccountsMaps(IEnumerable<DataTransferMapDto> mainMap)
            //{
            //    var dbSet = _accountDbContext.WorkPlanQuestionOfAccounts.Where(w => mainMap.Select(s => s.OldId).Contains(w.QuestionOfAccountId)).ToList();
            //    IEnumerable<DataTransferRefDto> refs = new List<DataTransferRefDto>
            //    {
            //        new DataTransferRefDto {Table = "QuestionOfAccount", Field = "QuestionOfAccountId"},
            //    };
            //    var data = await RunAndSaveAsync(refs, dbSet);
            //    return data;
            //}

            #endregion

        }
    }
}
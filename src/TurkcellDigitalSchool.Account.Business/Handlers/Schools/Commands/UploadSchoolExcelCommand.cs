using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Excel;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Schools.Commands
{
    [LogScope]
    [SecuredOperationScope]
    public class UploadSchoolExcelCommand : IRequest<DataResult<List<School>>>
    {
        public IFormFile FormFile { get; set; }

        [MessageClassAttr("Okul Excel Yükleme")]
        public class UploadSchoolExcelCommandHandler : IRequestHandler<UploadSchoolExcelCommand, DataResult<List<School>>>
        {
            private readonly IExcelService _excelService;
            private readonly ISchoolRepository _schoolRepository;
            private readonly IInstitutionTypeRepository _institutionTypeRepository;
            private readonly IInstitutionRepository _institutionRepository;

            public UploadSchoolExcelCommandHandler(IExcelService excelService, ISchoolRepository schoolRepository, IInstitutionTypeRepository institutionTypeRepository, IInstitutionRepository institutionRepository)
            {
                _excelService = excelService;
                _schoolRepository = schoolRepository;
                _institutionRepository = institutionRepository;
                _institutionTypeRepository = institutionTypeRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string TryAgain = Messages.TryAgain;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string ExcelRecordIsNotFound = Messages.ExcelRecordIsNotFound;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string Added = Messages.Added;

            /// <summary>
            /// Upload School Sample Excel Document
            /// Data in Excel transferred to list object.
            /// If there is no data, an error message is given.
            /// Id information obtain from the relevant tables for the city, county, institution and institution type fields.
            /// Added record to school table.
            /// </summary>
            [CacheRemoveAspect("Get")]
           
            public async Task<DataResult<List<School>>> Handle(UploadSchoolExcelCommand request, CancellationToken cancellationToken)
            {
                List<School> schoolList = new();
                int startRow = 2;
                var schoolExcelDtos = _excelService.ImportExcel<SchoolExcelDto>(request.FormFile, startRow);
                if (!schoolExcelDtos.Success)
                {
                    return new ErrorDataResult<List<School>>(TryAgain.PrepareRedisMessage());
                }

                if (!schoolExcelDtos.Data.Any())
                {
                    return new SuccessDataResult<List<School>>(ExcelRecordIsNotFound.PrepareRedisMessage());
                }

                try
                {
                    schoolList = schoolExcelDtos.Data.Where(w => w.KURUMLAR != "KURUMLAR").Select(x => new School
                    {
                        CityId = _institutionRepository.Get(w => w.Name == x.KURUMLAR).Code == _institutionRepository.Get(w => w.Code == "OpenEducationInstitutions").Code && string.IsNullOrEmpty(x.IL_ADI) ? 0 : long.Parse(x.IL_ADI.Split("-")[0]),
                        CountyId = _institutionRepository.Get(w => w.Name == x.KURUMLAR).Code == _institutionRepository.Get(w => w.Code == "OpenEducationInstitutions").Code && string.IsNullOrEmpty(x.ILCE_ADI) ? 0 : long.Parse(x.ILCE_ADI.Split("-")[0]),
                        InstitutionId = _institutionRepository.GetAsync(w => w.Name == x.KURUMLAR).Result.Id,
                        InstitutionTypeId = _institutionTypeRepository.GetAsync(w => w.Name == x.KURUM_TURU).Result.Id,
                        Name = x.KURUM_ADI != "" ? x.KURUM_ADI : throw new ArgumentException(TryAgain.PrepareRedisMessage())
                    }).ToList();
                }
                catch (Exception)
                {
                    return new ErrorDataResult<List<School>>(TryAgain.PrepareRedisMessage());
                }

                await _schoolRepository.AddRangeAsync(schoolList);
                await _schoolRepository.SaveChangesAsync();
                return new SuccessDataResult<List<School>>(Added.PrepareRedisMessage());
            }
        }
    }
}

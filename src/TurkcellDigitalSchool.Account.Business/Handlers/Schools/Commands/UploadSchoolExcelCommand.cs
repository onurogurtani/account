﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Excel;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Dtos;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Schools.Commands
{
  
    public class UploadSchoolExcelCommand : IRequest<IDataResult<List<School>>>
    {
        public Microsoft.AspNetCore.Http.IFormFile FormFile { get; set; }

        public class UploadSchoolExcelCommandHandler : IRequestHandler<UploadSchoolExcelCommand, IDataResult<List<School>>>
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

            /// <summary>
            /// Upload School Sample Excel Document
            /// Data in Excel transferred to list object.
            /// If there is no data, an error message is given.
            /// Id information obtain from the relevant tables for the city, county, institution and institution type fields.
            /// Added record to school table.
            /// </summary>
            [SecuredOperation(Priority = 1)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            public async Task<IDataResult<List<School>>> Handle(UploadSchoolExcelCommand request, CancellationToken cancellationToken)
            {
                List<School> schoolList = new();
                int startRow = 2;
                var schoolExcelDtos = _excelService.ImportExcel<SchoolExcelDto>(request.FormFile, startRow);
                if (!schoolExcelDtos.Success)
                {
                    return new ErrorDataResult<List<School>>(Messages.TryAgain);
                }

                if (!schoolExcelDtos.Data.Any())
                {
                    return new SuccessDataResult<List<School>>(Messages.ExcelRecordIsNotFound);
                }

                try
                {
                    schoolList = schoolExcelDtos.Data.Where(w => w.KURUMLAR != "KURUMLAR").Select(x => new School
                    {
                        CityId = _institutionRepository.Get(w => w.Name == x.KURUMLAR).Code == _institutionRepository.Get(w => w.Code == "OpenEducationInstitutions").Code && string.IsNullOrEmpty(x.IL_ADI) ? 0 : long.Parse(x.IL_ADI.Split("-")[0]),
                        CountyId = _institutionRepository.Get(w => w.Name == x.KURUMLAR).Code == _institutionRepository.Get(w => w.Code == "OpenEducationInstitutions").Code && string.IsNullOrEmpty(x.ILCE_ADI) ? 0 : long.Parse(x.ILCE_ADI.Split("-")[0]),
                        InstitutionId = _institutionRepository.GetAsync(w => w.Name == x.KURUMLAR).Result.Id,
                        InstitutionTypeId = _institutionTypeRepository.GetAsync(w => w.Name == x.KURUM_TURU).Result.Id,
                        Name = x.KURUM_ADI != "" ? x.KURUM_ADI : throw new ArgumentException(Messages.TryAgain)
                    }).ToList();
                }
                catch (Exception)
                {
                    return new ErrorDataResult<List<School>>(Messages.TryAgain);
                }

                await _schoolRepository.AddRangeAsync(schoolList);
                await _schoolRepository.SaveChangesAsync();
                return new SuccessDataResult<List<School>>(Messages.Added);
            }
        }
    }
}
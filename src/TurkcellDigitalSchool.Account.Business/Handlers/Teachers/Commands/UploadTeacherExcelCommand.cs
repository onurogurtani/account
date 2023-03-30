using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ClosedXML.Excel;
using MediatR;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Excel.Model;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands
{
    public class UploadTeacherExcelCommand : IRequest<IDataResult<ExcelResponse>>
    {
        public Microsoft.AspNetCore.Http.IFormFile FormFile { get; set; }

        public class UploadTeacherExcelCommandHandler : IRequestHandler<UploadTeacherExcelCommand, IDataResult<ExcelResponse>>
        {
            private readonly IMediator _mediator;

            public UploadTeacherExcelCommandHandler(IMediator mediator)
            {
                _mediator = mediator;
            }

            /// <summary>
            /// Upload Teacher Sample Excel Document
            /// Data in Excel transferred to list object.
            /// If there is no data, an error message is given.
            /// Added record to user table.
            /// </summary> 
            [SecuredOperation(Priority = 1)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            public async Task<IDataResult<ExcelResponse>> Handle(UploadTeacherExcelCommand request, CancellationToken cancellationToken)
            {
                int startRow = 1;
                var formFile = request.FormFile;

                if (!request.FormFile.FileName.ToLower().EndsWith(".xlsx")) { return new ErrorDataResult<ExcelResponse>(Account.Business.Constants.Messages.FileIsNotExcel); }

                byte[] workbookBytes;
                using (var ms = new MemoryStream())
                {
                    try
                    {
                        formFile.CopyTo(ms);
                        using IXLWorkbook workbook = new XLWorkbook(ms);
                        {
                            var worksheet = workbook.Worksheets.First();

                            if (!worksheet.RowsUsed().Skip(startRow).Any())
                            {
                                return new SuccessDataResult<ExcelResponse>(Messages.ExcelRecordIsNotFound);
                            }

                            var targetColumnsCount = 5;
                            if (worksheet.Columns().Count() != targetColumnsCount) { return new ErrorDataResult<ExcelResponse>(string.Format(Account.Business.Constants.Messages.ExcelNumberOfColumnsNotValid, targetColumnsCount)); }

                            worksheet.Row(1).Cell(6).Value = "Durum";
                            worksheet.Row(1).Cell(7).Value = "Mesaj";

                            foreach (IXLRow row in worksheet.RowsUsed().Skip(startRow))
                            {
                                var name = row.Cell(1).GetValue<string>();
                                var surname = row.Cell(2).GetValue<string>();
                                var tcNoStr = row.Cell(3).GetValue<string>();
                                var email = row.Cell(4).GetValue<string>();
                                var mobilePhone = row.Cell(5).GetValue<string>();

                                try
                                {
                                    var tcNo = long.Parse(tcNoStr);

                                    var result = await _mediator.Send(new AddTeacherCommand
                                    {
                                        Email = email,
                                        Name = name,
                                        SurName = surname,
                                        CitizenId = tcNo,
                                        MobilePhones = mobilePhone
                                    });

                                    if(result.Success)
                                    {
                                        row.Delete();
                                        continue;
                                    }

                                    row.Cell(6).Value = result.Success ? "Başarılı" : "Başarısız";
                                    row.Cell(7).Value = result.Message;

                                }
                                catch (FluentValidation.ValidationException ex)
                                {
                                    row.Cell(6).Value = "Başarısız";
                                    row.Cell(7).Value = ex.Message;
                                }
                                catch (Exception ex)
                                {
                                    row.Cell(6).Value = "Başarısız";
                                    row.Cell(7).Value = "İşlem yapılırken bir hata oluştu";
                                }

                            }

                            MemoryStream outputMs = new();
                            workbook.SaveAs(outputMs);
                            workbookBytes = outputMs.ToArray();
                        }
                    }
                    catch (Exception)
                    {
                        return new ErrorDataResult<ExcelResponse>(Messages.TryAgain);
                    }
                }

                return new SuccessDataResult<ExcelResponse>(new ExcelResponse { FileContents = workbookBytes, FileDownloadName = "Eklenemeyen_Ogretmenler" }, Messages.SuccessfulOperation);
            }
        }
    }
}

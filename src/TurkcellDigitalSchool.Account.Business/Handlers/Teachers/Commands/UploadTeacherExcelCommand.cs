using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ClosedXML.Excel;
using MediatR;
using Microsoft.AspNetCore.Http;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.AuthorityManagement;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Excel.Model;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands
{
    [LogScope]
    [SecuredOperationScope(ClaimNames = new[] { ClaimConst.TeachersImportFromExcel })]
    public class UploadTeacherExcelCommand : IRequest<DataResult<ExcelResponse>>
    {
        public IFormFile FormFile { get; set; }

        [MessageClassAttr("Öğretmen Excel Yükleme")]
        public class UploadTeacherExcelCommandHandler : IRequestHandler<UploadTeacherExcelCommand, DataResult<ExcelResponse>>
        {
            private readonly IMediator _mediator;

            public UploadTeacherExcelCommandHandler(IMediator mediator)
            {
                _mediator = mediator;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string FileIsNotExcel = Constants.Messages.FileIsNotExcel;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string ExcelRecordIsNotFound = Messages.ExcelRecordIsNotFound;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string ExcelNumberOfColumnsNotValid = Constants.Messages.ExcelNumberOfColumnsNotValid;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string TryAgain = Messages.TryAgain;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            /// <summary>
            /// Upload Teacher Sample Excel Document
            /// Data in Excel transferred to list object.
            /// If there is no data, an error message is given.
            /// Added record to user table.
            /// </summary> 
            [CacheRemoveAspect("Get")]
          
            public async Task<DataResult<ExcelResponse>> Handle(UploadTeacherExcelCommand request, CancellationToken cancellationToken)
            {
                int startRow = 1;
                var formFile = request.FormFile;

                if (!request.FormFile.FileName.ToLower().EndsWith(".xlsx")) { return new ErrorDataResult<ExcelResponse>(FileIsNotExcel.PrepareRedisMessage()); }

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
                                return new ErrorDataResult<ExcelResponse>(ExcelRecordIsNotFound.PrepareRedisMessage());
                            }

                            var currentColumnCount = worksheet.Row(1).Cells(q => !string.IsNullOrEmpty(q.Value?.ToString().Trim())).Count();
                            var targetColumnsCount = 5;
                            if (currentColumnCount != targetColumnsCount) { return new ErrorDataResult<ExcelResponse>(string.Format(ExcelNumberOfColumnsNotValid.PrepareRedisMessage(), targetColumnsCount)); }

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

                                    if (result.Success)
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
                        return new ErrorDataResult<ExcelResponse>(TryAgain.PrepareRedisMessage());
                    }
                }

                return new SuccessDataResult<ExcelResponse>(new ExcelResponse { FileContents = workbookBytes, FileDownloadName = "Eklenemeyen_Ogretmenler" }, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

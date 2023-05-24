using System.Drawing;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using ClosedXML.Excel;
using MediatR;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Excel.Model;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands
{
    /// <summary>
    /// Download User/Teacher
    /// </summary>
    [LogScope]
    public class DownloadTeacherExcelCommand : IRequest<IDataResult<ExcelResponse>>
    {
        [MessageClassAttr("Öðretmen Excel Tablosu Ýndirme")]
        public class DownloadTeacherExcelCommandHandler : IRequestHandler<DownloadTeacherExcelCommand, IDataResult<ExcelResponse>>
        {

            public DownloadTeacherExcelCommandHandler() { }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [SecuredOperation]
            [CacheRemoveAspect("Get")]
           
            public async Task<IDataResult<ExcelResponse>> Handle(DownloadTeacherExcelCommand request, CancellationToken cancellationToken)
            {
                byte[] workbookBytes;

                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.Worksheets.Add("Ogretmenler");

                    worksheet.Cell(1, 1).Value = "ADI";
                    worksheet.Cell(1, 2).Value = "SOYADI";
                    worksheet.Cell(1, 3).Value = "TC_NO";
                    worksheet.Cell(1, 4).Value = "EMAIL";
                    worksheet.Cell(1, 5).Value = "CEP_NO";

                    worksheet.Columns().Width = 30;
                    worksheet.Rows().Height = 20;
                    worksheet.Style.Font.SetFontColor(XLColor.FromColor(Color.Black));
                    worksheet.Style.Font.SetFontName("Arial");
                    worksheet.Style.Font.SetFontSize(10);

                    MemoryStream ms = new();
                    workbook.SaveAs(ms);
                    workbookBytes = ms.ToArray();
                }

                return new SuccessDataResult<ExcelResponse>(new ExcelResponse { FileContents = workbookBytes, FileDownloadName = "Ogretmenler" }, SuccessfulOperation.PrepareRedisMessage());
            }

        }
    }
}


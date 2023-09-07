using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ClosedXML.Excel;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers; 
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Excel.Model;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Account.Business.Handlers.Institutions.Queries;
using TurkcellDigitalSchool.Account.Business.Handlers.InstitutionTypes.Queries;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Schools.Commands
{
    [LogScope]
     
    public class DownloadSchoolExcelCommand : IRequest<DataResult<ExcelResponse>>
    {
        [MessageClassAttr("Okul Excel İndirme")]
        public class DownloadSchoolExcelCommandHandler : IRequestHandler<DownloadSchoolExcelCommand, DataResult<ExcelResponse>>
        {
            private readonly IMediator _mediator;
            private readonly ICityRepository _cityRepository;
            private readonly ICountyRepository _countyRepository;
            public DownloadSchoolExcelCommandHandler(IMediator mediator, ICityRepository cityRepository, ICountyRepository countyRepository)
            {
                _mediator = mediator;
                _cityRepository = cityRepository;
                _countyRepository = countyRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            /// <summary>
            /// Download School Sample Excel Document
            /// City, county, institutions and type of institution were pull from the table.
            /// Nested dependent dropdownlist was created for city and county.
            /// The data was transferred into dropdownlist.
            /// </summary>
              
            public async Task<DataResult<ExcelResponse>> Handle(DownloadSchoolExcelCommand request, CancellationToken cancellationToken)
            {
                var institutions = _mediator.Send(new GetInstitutionsQuery(), cancellationToken).Result.Data.Items;
                var institutionTypes = _mediator.Send(new GetInstitutionTypesQuery(), cancellationToken).Result.Data.Items;

                byte[] workbookBytes;

                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.Worksheets.Add("Kurumlar_Listesi");
                    var wsData = workbook.Worksheets.Add("Data");

                    var cityList = _cityRepository.Query().OrderBy(s => s.Name).ToList();
                    var countyList = _countyRepository.Query().OrderBy(s => s.Name).ToList();
                    var institutionList = institutions.OrderBy(s => s.Name).ToList();
                    var institutionTypeList = institutionTypes.OrderBy(s => s.Name).ToList();

                    if (!cityList.Any() || !countyList.Any() || !institutionList.Any() || !institutionTypeList.Any())
                    {
                        return new ErrorDataResult<ExcelResponse>(RecordIsNotFound.PrepareRedisMessage());
                    }

                    wsData.Cell(1, 1).Value = "KURUMLAR";
                    int i = 1;
                    foreach (var a in institutionList)
                    {
                        wsData.Cell(++i, 1).Value = a.Name;
                    }
                    wsData.Range("A2:A" + i).AddToNamed("KURUMLAR");

                    wsData.Cell(1, 2).Value = "KURUM_TURU";
                    i = 1;
                    foreach (var a in institutionTypeList)
                    {
                        wsData.Cell(++i, 2).Value = a.Name;
                    }
                    wsData.Range("B2:B" + i).AddToNamed("KURUM_TURU");

                    i = 1;
                    wsData.Cell(1, 3).Value = "IL";
                    foreach (var a in cityList)
                    {
                        wsData.Cell(++i, 3).Value = a.Id + " - " + a.Name;
                    }
                    wsData.Range("C2:C" + i).AddToNamed("IL");
                    int j = 3;
                    foreach (var a in cityList)
                    {
                        wsData.Cell(1, ++j).Value = a.Name;
                        int k = 1;
                        foreach (var b in countyList.Where(m => m.CityId == a.Id).ToList())
                        {
                            wsData.Cell(++k, j).Value = b.Id + " - " + b.Name;
                        }
                        wsData.Range(wsData.Cell(2, j), wsData.Cell(k, j)).AddToNamed(a.Name);
                    }

                    worksheet.Columns().Width = 35;
                    worksheet.Rows().Height = 20;
                    worksheet.Style.Font.SetFontColor(XLColor.FromColor(Color.Black));
                    worksheet.Style.Font.SetFontName("Arial");
                    worksheet.Style.Font.SetFontSize(10);

                    worksheet.Cell(1, 1).SetValue("KURUMLAR LİSTESİ");
                    worksheet.Cell(1, 1).Style.Font.SetBold();
                    worksheet.Cell(1, 1).Style.Font.SetFontSize(16);

                    worksheet.Cell(2, 1).SetValue("KURUMLAR");
                    worksheet.Cell(2, 2).SetValue("IL_ADI");
                    worksheet.Cell(2, 3).SetValue("ILCE_ADI");
                    worksheet.Cell(2, 4).SetValue("KURUM_TURU");
                    worksheet.Cell(2, 5).SetValue("KURUM_ADI");
                    worksheet.Row(2).Style.Font.SetBold();
                    worksheet.Row(2).Style.Font.SetFontSize(15);

                    worksheet.Range(worksheet.Cell(3, 1), worksheet.Cell(100000, 1)).SetDataValidation().List(wsData.Range("KURUMLAR"), true);
                    worksheet.Range(worksheet.Cell(3, 2), worksheet.Cell(100000, 2)).SetDataValidation().List(wsData.Range("IL"), true);
                    worksheet.Range(worksheet.Cell(3, 3), worksheet.Cell(100000, 3)).SetDataValidation().InCellDropdown = true;
                    worksheet.Range(worksheet.Cell(3, 3), worksheet.Cell(100000, 3)).SetDataValidation().Operator = XLOperator.Between;
                    worksheet.Range(worksheet.Cell(3, 3), worksheet.Cell(100000, 3)).SetDataValidation().AllowedValues = XLAllowedValues.List;
                    worksheet.Range(worksheet.Cell(3, 3), worksheet.Cell(100000, 3)).SetDataValidation().List("=INDIRECT(RIGHT(B3,LEN(B3)-1-FIND(\"-\",B3)))");
                    worksheet.Range(worksheet.Cell(3, 4), worksheet.Cell(100000, 4)).SetDataValidation().List(wsData.Range("KURUM_TURU"), true);

                    wsData.Hide();

                    MemoryStream ms = new();
                    workbook.SaveAs(ms);
                    workbookBytes = ms.ToArray();
                }

                return new SuccessDataResult<ExcelResponse>(new ExcelResponse { FileContents = workbookBytes, FileDownloadName = "Kurumlar_Listesi" }, SuccessfulOperation.PrepareRedisMessage());
            }

        }
    }
}
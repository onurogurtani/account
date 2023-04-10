using ClosedXML.Excel;
using MediatR;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete.MessageMap;
using TurkcellDigitalSchool.Entities.Dtos;
using TurkcellDigitalSchool.Entities.Dtos.MessageDtos;
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.MessageMaps.Commands
{
    public class DownloadMessageMapCommand : IRequest<IDataResult<FileDto>>
    {
        public MessageMapDetailSearchDto MessageMapDetailSearchDto { get; set; } = new MessageMapDetailSearchDto();

        public class DownloadMessageMapCommandHandler : IRequestHandler<DownloadMessageMapCommand, IDataResult<FileDto>>
        {
            private readonly IMessageMapRepository _messageMapRepository;

            public DownloadMessageMapCommandHandler(IMessageMapRepository messageMapRepository)
            {
                _messageMapRepository = messageMapRepository;
            }

            public async Task<IDataResult<FileDto>> Handle(DownloadMessageMapCommand request, CancellationToken cancellationToken)
            {
                FileDto result = new();

                var query = _messageMapRepository.Query().Select(s => new MessageMapDto
                {
                    Id = s.Id.ToString(),
                    Code = s.Code,
                    Message = s.UserFriendlyNameOfMessage ?? s.Message,
                    MessageParameters = s.MessageParameters,
                    UsedClass = s.UserFriendlyNameOfUsedClass ?? s.DefaultNameOfUsedClass,
                    OldVersionOfUserFriendlyMessage = s.OldVersionOfUserFriendlyMessage
                }).AsQueryable();

                request.MessageMapDetailSearchDto.QueryDto.ToList().ForEach(item => {
                    var parameter = Expression.Parameter(typeof(MessageMapDto));
                    var messageMapPropertyValue = Expression.Property(parameter, item.Field);
                    var constainsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });
                    var contains = Expression.Call(messageMapPropertyValue, constainsMethod, Expression.Constant(item.Text));
                    var whereCondition = (Expression<Func<MessageMapDto, bool>>)Expression.Lambda(contains, parameter);

                    query = query.Where(whereCondition);
                });

                query = request.MessageMapDetailSearchDto.OrderBy switch
                {
                    "CodeASC" => query.OrderBy(x => x.Code),
                    "CodeDESC" => query.OrderByDescending(x => x.Code),
                    "MessageASC" => query.OrderBy(x => x.Message),
                    "MessageDESC" => query.OrderByDescending(x => x.Message),
                    "UsedClassASC" => query.OrderBy(x => x.UsedClass),
                    "UsedClassDESC" => query.OrderByDescending(x => x.UsedClass),
                    "IdASC" => query.OrderBy(x => x.Id),
                    "IdDESC" => query.OrderByDescending(x => x.Id),
                    _ => query.OrderByDescending(x => x.Id),
                };

                if (query.Any())
                {
                    result = await ExcelFileToCreate(query);
                    result.FileName = "Mesajlar." + DownloadType.Xlsx;
                    return new SuccessDataResult<FileDto>(result);
                }
                return new ErrorDataResult<FileDto>(new FileDto());
            }

            private async Task<FileDto> ExcelFileToCreate(IQueryable<MessageMapDto> list)
            {
                byte[] workbookBytes;
                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.Worksheets.Add("Mesajlar");

                    worksheet.Columns().Width = 50;
                    worksheet.Rows().Height = 20;

                    IXLRange xxx = worksheet.Range("A1:C1").Merge();
                    xxx.Value = "Mesajlar";
                    worksheet.Range("A1:C1").Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                    worksheet.Cell(2, 1).SetValue("Mesaj Kodu");
                    worksheet.Cell(2, 2).SetValue("Mesaj");
                    worksheet.Cell(2, 3).SetValue("Kullanıldığı Yer");

                    worksheet.Row(1).CellsUsed().Style.Font.SetFontSize(16);
                    worksheet.Row(1).CellsUsed().Style.Font.SetBold();

                    worksheet.Row(2).CellsUsed().Style.Font.SetFontSize(16);
                    worksheet.Row(2).CellsUsed().Style.Font.SetBold();

                    var detailRecordIndex = 3;
                    foreach (var item in list)
                    {
                        worksheet.Cell(detailRecordIndex, 1).SetValue(item.Code);
                        worksheet.Cell(detailRecordIndex, 2).SetValue(item.Message);
                        worksheet.Cell(detailRecordIndex, 3).SetValue(item.UsedClass);
                        detailRecordIndex++;
                    }

                    MemoryStream ms = new();
                    workbook.SaveAs(ms);
                    workbookBytes = ms.ToArray();
                }
                return new FileDto { File = workbookBytes, ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8" };
            }
        }
    }
}

using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using System;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands
{
    /// <summary>
    /// Delete Draft WorkPlan      
    /// </summary>
    [LogScope]

    public class SetPassiveExpiredDocumentCommand : IRequest<IResult>
    {
        [MessageClassAttr("Tarihi Geçen Sözleşmeleri Pasif Yapma")]
        public class SetPassiveExpiredDocumentCommandHandler : IRequestHandler<SetPassiveExpiredDocumentCommand, IResult>
        {
            private readonly IDocumentRepository _documentRepository;

            public SetPassiveExpiredDocumentCommandHandler(IDocumentRepository documentRepository)
            {
                _documentRepository = documentRepository;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            public static string SuccessfulOperation = Messages.SuccessfulOperation;
            public async Task<IResult> Handle(SetPassiveExpiredDocumentCommand request, CancellationToken cancellationToken)
            {
                var entitys = await _documentRepository.Query()
                    .Where(x => x.ValidEndDate < DateTime.Now)
                    .Where(x => x.RecordStatus == RecordStatus.Active)
                    .ToListAsync();

                entitys.ForEach(x => x.RecordStatus = RecordStatus.Passive);


                _documentRepository.UpdateRange(entitys);
                await _documentRepository.SaveChangesAsync();
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

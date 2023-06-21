using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using System.Threading;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using System.Linq;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands
{
    /// <summary>
    /// Create Document
    /// </summary>
    [ExcludeFromCodeCoverage]
    [SecuredOperationScope]
    [LogScope]
    public class CreateDocumentCommand : CreateRequestBase<Document>
    {
        [MessageClassAttr("Sözleşme Oluştur")]
        public class CreateRequestDocumentCommandHandler : CreateRequestHandlerBase<Document, CreateDocumentCommand>
        {
            private readonly AccountDbContext _dbContext;
            public CreateRequestDocumentCommandHandler(IDocumentRepository documentRepository, AccountDbContext dbContext) : base(documentRepository)
            {
                _dbContext = dbContext;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string DocumentAlreadyExist = Messages.DocumentAlreadyExist;
            public override async Task<DataResult<Document>> Handle(CreateDocumentCommand request, CancellationToken cancellationToken)
            {
                var documentAlreadyExist =  (from d in _dbContext.Documents.Where(w => w.Version == request.Entity.Version && w.ContractKindId == request.Entity.ContractKindId)
                                                join dc in _dbContext.DocumentContractTypes.Where(w => request.Entity.ContractTypes.Select(s => s.ContractTypeId).Contains(w.ContractTypeId))
                                                on d.Id equals dc.DocumentId
                                                select d.Id
                                             ).Any();
                if(documentAlreadyExist)
                    return new ErrorDataResult<Document>(DocumentAlreadyExist.PrepareRedisMessage());

                return await base.Handle(request, cancellationToken);
            }

        }
    }
}


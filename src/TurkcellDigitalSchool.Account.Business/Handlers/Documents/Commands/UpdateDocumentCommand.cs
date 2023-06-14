using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Utilities.Results;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using System.Linq;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands
{
    /// <summary>
    /// Update WorkPlan
    /// </summary>
    [SecuredOperationScope]
    [LogScope]
    [TransactionScope]
    public class UpdateDocumentCommand : IRequest<IResult>
    {
        public Document Entity { get; set; }

        public class UpdateDocumentCommandHandler : IRequestHandler<UpdateDocumentCommand, IResult>
        {
            private readonly IDocumentRepository _documentRepository;
            private readonly IDocumentContractTypeRepository _documentContractTypeRepository;
            private readonly AccountDbContext _dbContext;

            public UpdateDocumentCommandHandler(IDocumentRepository documentRepository, IDocumentContractTypeRepository documentContractTypeRepository, AccountDbContext dbContext)
            {
                _documentRepository = documentRepository;
                _documentContractTypeRepository = documentContractTypeRepository;
                _dbContext = dbContext;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string DocumentAlreadyExist = Business.Constants.Messages.DocumentAlreadyExist;
            public async Task<IResult> Handle(UpdateDocumentCommand request, CancellationToken cancellationToken)
            {
                var entity = await _documentRepository.GetAsync(x => x.Id == request.Entity.Id);
                if (entity == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                var documentAlreadyExist = (from d in _dbContext.Documents.Where(w => w.Id != request.Entity.Id && w.Version == request.Entity.Version && w.ContractKindId == request.Entity.ContractKindId)
                                            join dc in _dbContext.DocumentContractTypes.Where(w => request.Entity.ContractTypes.Select(s => s.ContractTypeId).Contains(w.ContractTypeId))
                                            on d.Id equals dc.DocumentId
                                            select d.Id
                                             ).Any();
                if (documentAlreadyExist)
                    return new ErrorDataResult<Document>(DocumentAlreadyExist.PrepareRedisMessage());

                var contractTypes = await _documentContractTypeRepository.GetListAsync(x => x.DocumentId == request.Entity.Id);
                _documentContractTypeRepository.DeleteRange(contractTypes);

                entity.RecordStatus = request.Entity.RecordStatus;
                entity.Content = request.Entity.Content;
                entity.Version = request.Entity.Version;
                entity.RequiredApproval = request.Entity.RequiredApproval;
                entity.ClientRequiredApproval = request.Entity.ClientRequiredApproval;
                entity.ContractKindId = request.Entity.ContractKindId;
                entity.ContractTypes = request.Entity.ContractTypes;
                entity.ValidStartDate = request.Entity.ValidStartDate;
                entity.ValidEndDate = request.Entity.ValidEndDate;

                var record = _documentRepository.Update(entity);
                await _documentRepository.SaveChangesAsync();
                return new SuccessDataResult<Document>(record, Messages.SuccessfulOperation);
            }
        }
    }
}

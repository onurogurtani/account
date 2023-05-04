using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands
{
    /// <summary>
    /// Update WorkPlan
    /// </summary>
    public class UpdateDocumentCommand : IRequest<IResult>
    {
        public Document Entity { get; set; }

        public class UpdateDocumentCommandHandler : IRequestHandler<UpdateDocumentCommand, IResult>
        {
            private readonly IDocumentRepository  _documentRepository;
            private readonly IDocumentContractTypeRepository _documentContractTypeRepository;

            public UpdateDocumentCommandHandler(IDocumentRepository  documentRepository, IDocumentContractTypeRepository documentContractTypeRepository)
            {
                _documentRepository =  documentRepository;
                _documentContractTypeRepository = documentContractTypeRepository;
            }

            [SecuredOperation]
 
            public async Task<IResult> Handle(UpdateDocumentCommand request, CancellationToken cancellationToken)
            {
                var entity = await _documentRepository.GetAsync(x => x.Id == request.Entity.Id);
                if (entity == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                var  contractTypes = await _documentContractTypeRepository.GetListAsync(x => x.DocumentId == request.Entity.Id);
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

using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands
{
    /// <summary>
    /// Copy Document
    /// </summary>
    public class CopyDocumentCommand : IRequest<IResult>
    {
        public long Id { get; set; }

        public class CopyDocumentCommandHandler : IRequestHandler<CopyDocumentCommand, IResult>
        {
            private readonly IDocumentRepository _documentRepository;
            private readonly IDocumentContractTypeRepository _documentContractTypeRepository;
            private readonly IMapper _mapper;

            public CopyDocumentCommandHandler(IDocumentRepository documentRepository, IDocumentContractTypeRepository documentContractTypeRepository, IMapper mapper)
            {
                _mapper = mapper;
                _documentRepository = documentRepository;
                _documentContractTypeRepository = documentContractTypeRepository;
            }

            [SecuredOperation]

            public async Task<IResult> Handle(CopyDocumentCommand request, CancellationToken cancellationToken)
            {
                var entity = await _documentRepository.GetAsync(x => x.Id == request.Id);
                if (entity == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                var version = _documentRepository.Query()
                    .OrderBy(x => x.Version)
                    .LastOrDefault(x => x.ContractKindId == entity.ContractKindId)
                    .Version;
                version++;

                var contractTypes = await _documentContractTypeRepository.GetListAsync(x => x.DocumentId == request.Id);

                var copyDocument = _mapper.Map<Document, Document>(entity);

                copyDocument.Id = 0;
                copyDocument.Version = version;
                copyDocument.ValidStartDate = entity.ValidStartDate.ToUniversalTime();
                copyDocument.ValidEndDate = entity.ValidEndDate.ToUniversalTime();
                copyDocument.UpdateTime = null;
                copyDocument.UpdateUserId = null;
                copyDocument.ContractTypes = contractTypes.Select(x => new DocumentContractType { ContractTypeId = x.ContractTypeId }).ToList();


                var record = _documentRepository.Create(copyDocument);
                await _documentRepository.SaveChangesAsync();
                return new SuccessDataResult<Document>(record, Messages.SuccessfulOperation);
            }
        }
    }
}

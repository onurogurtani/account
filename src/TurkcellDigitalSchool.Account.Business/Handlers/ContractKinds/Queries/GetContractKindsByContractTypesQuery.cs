using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Queries
{
    /// <summary>
    /// Contract Kind By Contract Types
    /// </summary>

    [LogScope]
    public class GetContractKindsByContractTypesQuery : IRequest<IDataResult<List<SelectionItem>>>
    {
        public long[] Ids { get; set; }
        public class GetContractKindsByContractTypesQueryHandler : IRequestHandler<GetContractKindsByContractTypesQuery, IDataResult<List<SelectionItem>>>
        {
            private readonly IDocumentRepository _documentRepository;
            private readonly IContractTypeRepository _contractTypeRepository;

            public GetContractKindsByContractTypesQueryHandler(IDocumentRepository documentRepository, IContractTypeRepository contractTypeRepository)

            {
                _documentRepository = documentRepository;
                _contractTypeRepository = contractTypeRepository;
            }

          
            [SecuredOperation]
            public async Task<IDataResult<List<SelectionItem>>> Handle(GetContractKindsByContractTypesQuery request, CancellationToken cancellationToken)
            {
                var isThereRecord = _contractTypeRepository.Query().Any(u => request.Ids.Contains(u.Id));
                if (!isThereRecord)
                {
                    return new ErrorDataResult<List<SelectionItem>>(Messages.RecordIsNotFound);
                }

                var query = await _documentRepository.Query()
                   .Include(x => x.ContractTypes).ThenInclude(x => x.ContractType)
                   .Include(x => x.ContractKind)
                   .Where(x => x.ContractTypes.Any(s => request.Ids.Contains(s.ContractTypeId)) && x.RecordStatus == RecordStatus.Active && x.ContractKind.RecordStatus == RecordStatus.Active)
                   .Select(s => new SelectionItem
                   {
                       Id = s.ContractKind.Id,
                       Label = s.ContractKind.Name
                   }).Distinct().ToListAsync();

                return new SuccessDataResult<List<SelectionItem>>(query);
            }
        }
    }
}
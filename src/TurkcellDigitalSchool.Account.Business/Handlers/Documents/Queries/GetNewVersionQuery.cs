using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.Queries
{
    /// <summary>
    /// Get New Versiyon No
    /// </summary>
    [ExcludeFromCodeCoverage] 
    [LogScope]
    public class GetNewVersionQuery : IRequest<DataResult<DocumentVersionDto>>
    {
        public long ContractKindId { get; set; }

        public class GetNewVersionQueryHandler : IRequestHandler<GetNewVersionQuery, DataResult<DocumentVersionDto>>
        {
            private readonly IDocumentRepository _documentRepository;

            public GetNewVersionQueryHandler(IDocumentRepository documentRepository)
            {
                _documentRepository = documentRepository;
            }
             
  
            public async Task<DataResult<DocumentVersionDto>> Handle(GetNewVersionQuery request, CancellationToken cancellationToken)
            {
                var lastVersion = _documentRepository.Query()
                  .OrderBy(x => x.Version)
                  .LastOrDefault(x => x.ContractKindId == request.ContractKindId)?
                  .Version;


                if (lastVersion == null)
                    lastVersion = 0;

                int newVersion = (int)lastVersion + 1;
                var versionDto = new DocumentVersionDto() { Version = newVersion };

                return new SuccessDataResult<DocumentVersionDto>(versionDto, Messages.Deleted);

            }
        }

    }
}
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.Queries
{
    /// <summary>
    /// Get New Versiyon No
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class GetNewVersionQuery : IRequest<IDataResult<DocumentVersionDto>>
    {
        public long ContractKindId { get; set; }

        public class GetNewVersionQueryHandler : IRequestHandler<GetNewVersionQuery, IDataResult<DocumentVersionDto>>
        {
            private readonly IDocumentRepository _documentRepository;

            public GetNewVersionQueryHandler(IDocumentRepository documentRepository)
            {
                _documentRepository = documentRepository;
            }


            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public virtual async Task<IDataResult<DocumentVersionDto>> Handle(GetNewVersionQuery request, CancellationToken cancellationToken)
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
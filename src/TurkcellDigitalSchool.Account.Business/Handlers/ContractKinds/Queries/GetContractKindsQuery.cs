using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetContractKindsQuery : QueryByFilterRequestBase<ContractKind>
    {
        public class GetContractKindsQueryHandler : QueryByFilterRequestHandlerBase<ContractKind, GetContractKindsQuery>
        {
            public GetContractKindsQueryHandler(IContractKindRepository repository) : base(repository)
            {
            }
        }
    }
}
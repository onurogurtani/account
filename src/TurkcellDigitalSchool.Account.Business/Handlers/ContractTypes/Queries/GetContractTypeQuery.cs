using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetContractTypeQuery : QueryByIdRequestBase<ContractType>
    {
        public class GetContractTypeQueryHandler : QueryByIdRequestHandlerBase<ContractType, GetContractTypeQuery>
        {
            public GetContractTypeQueryHandler(IContractTypeRepository contractTypeRepository) : base(contractTypeRepository)
            {
            }
        }
    }
}

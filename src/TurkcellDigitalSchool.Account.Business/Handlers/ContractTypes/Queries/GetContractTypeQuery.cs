using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetContractTypeQuery : QueryByIdRequestBase<ContractType>
    {
        public class GetContractTypeQueryHandler : QueryByIdRequestHandlerBase<ContractType>
        {
            public GetContractTypeQueryHandler(IContractTypeRepository contractTypeRepository) : base(contractTypeRepository)
            {
            }
        }
    }
}

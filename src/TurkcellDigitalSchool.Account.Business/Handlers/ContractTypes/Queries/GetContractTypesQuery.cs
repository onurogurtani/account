using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetContractTypesQuery : QueryByFilterRequestBase<ContractType>
    {
        public class GetContractTypesQueryHandler : QueryByFilterRequestHandlerBase<ContractType>
        {
            public GetContractTypesQueryHandler(IContractTypeRepository repository) : base(repository)
            {
            }
        }
    }
}
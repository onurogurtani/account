using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

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
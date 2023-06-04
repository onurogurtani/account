using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteContractTypeCommand : DeleteRequestBase<ContractType>
    {
        public class DeleteRequestContractTypeCommandHandler : DeleteRequestHandlerBase<ContractType, DeleteContractTypeCommand>
        {
            public DeleteRequestContractTypeCommandHandler(IContractTypeRepository repository) : base(repository)
            {
            }
        }
    }
}


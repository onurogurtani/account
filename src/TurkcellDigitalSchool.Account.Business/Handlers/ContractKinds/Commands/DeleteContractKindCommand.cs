using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteContractKindCommand : DeleteRequestBase<ContractKind>
    {
        public class DeleteRequestContractKindCommandHandler : DeleteRequestHandlerBase<ContractKind, DeleteContractKindCommand>
        {
            public DeleteRequestContractKindCommandHandler(IContractKindRepository repository) : base(repository)
            {
            }
        }
    }
}


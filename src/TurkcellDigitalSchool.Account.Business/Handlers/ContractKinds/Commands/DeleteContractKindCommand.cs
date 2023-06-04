using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteContractKindCommand : DeleteRequestBase<ContractKind>
    {
        public class DeleteContractKindCommandHandler : DeleteHandlerBase<ContractKind, DeleteContractKindCommand>
        {
            public DeleteContractKindCommandHandler(IContractKindRepository repository) : base(repository)
            {
            }
        }
    }
}


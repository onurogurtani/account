using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteContractKindCommand : DeleteRequestBase<ContractKind>
    {
        public class DeleteContractKindCommandHandler : DeleteRequestHandlerBase<ContractKind>
        {
            public DeleteContractKindCommandHandler(IContractKindRepository repository) : base(repository)
            {
            }
        }
    }
}


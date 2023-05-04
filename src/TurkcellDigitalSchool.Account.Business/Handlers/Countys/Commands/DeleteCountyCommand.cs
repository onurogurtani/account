using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countys.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteCountyCommand : DeleteRequestBase<County>
    {
        public class DeleteCountyCommandHandler : DeleteRequestHandlerBase<County>
        {
            /// <summary>
            /// Delete County
            /// </summary>
            public DeleteCountyCommandHandler(ICountyRepository repository) : base(repository)
            {
            }
        }
    }
}


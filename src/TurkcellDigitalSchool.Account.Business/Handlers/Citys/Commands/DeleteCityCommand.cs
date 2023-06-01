using System;
using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.Citys.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Citys.Commands
{
    [ExcludeFromCodeCoverage]
    [RemoveCacheScope(RequestTypes = new[] { typeof(GetCitysQuery) })]
    public class DeleteCityCommand : DeleteRequestBase<City>
    {
        public class DeleteCityCommandHandler : DeleteHandlerBase<City>, IRequestHandler<DeleteCityCommand, IDataResult<City>>
        {
            /// <summary>
            /// Delete City
            /// </summary>
            public DeleteCityCommandHandler(ICityRepository repository) : base(repository)
            {
            }

            public async Task<IDataResult<City>> Handle(DeleteCityCommand request, CancellationToken cancellationToken)
            {
                return await base.Handle(request, cancellationToken);
            }
        }
    }
}


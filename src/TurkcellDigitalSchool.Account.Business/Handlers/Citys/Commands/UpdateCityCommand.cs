using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using System.Threading;
using TurkcellDigitalSchool.Account.Business.Handlers.Citys.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;
using MediatR;
using System;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Citys.Commands
{
    [ExcludeFromCodeCoverage]
    [RemoveCacheScope(RequestTypes = new[] { typeof(GetCitysQuery) })]
    public class UpdateCityCommand : UpdateRequestBase<City>
    {
        public class UpdateCityCommandHandler : UpdateHandlerBase<City>, IRequestHandler<UpdateCityCommand, IDataResult<City>>
        {
            public UpdateCityCommandHandler(ICityRepository cityRepository) : base(cityRepository)
            {
            }
            public Task<IDataResult<City>> Handle(UpdateCityCommand request, CancellationToken cancellationToken)
            {
                return base.Handle(request, cancellationToken);
            }
        }
    }
}


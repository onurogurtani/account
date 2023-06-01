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
    [LogScope]
    [RemoveCacheScope(RequestTypes = new[] { typeof(GetCitysQuery) })]
    public class CreateCityCommand : CreateRequestBase<City>
    {
        public class CreateCityCommandHandler : CreateHandlerBase<City>, IRequestHandler<CreateCityCommand, IDataResult<City>>
        {
            public CreateCityCommandHandler(ICityRepository cityRepository) : base(cityRepository)
            {
            }

            public async Task<IDataResult<City>> Handle(CreateCityCommand request, CancellationToken cancellationToken)
            {
                return await base.Handle(request, cancellationToken);
            }
        }
    }
}


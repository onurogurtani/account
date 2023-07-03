using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.Queries
{
    [ExcludeFromCodeCoverage]
    [LogScope]
     
    public class GetUserTypesQuery : IRequest<DataResult<List<SelectionItem>>>
    {
        public class GetUserTypesQueryHandler : IRequestHandler<GetUserTypesQuery, DataResult<List<SelectionItem>>>
        {
            public async Task<DataResult<List<SelectionItem>>> Handle(GetUserTypesQuery request, CancellationToken cancellationToken)
            {
                var adminTypes = AdminTypeConst.ADMIN_TYPES;
                var items = ((UserType[])Enum.GetValues(typeof(UserType)))
                .Select(x => new SelectionItem
                {
                    Id = (int)x,
                    Label = x.DescriptionAttr().ToString()
                }).Where(w=> !adminTypes.Contains(w.Id)).ToList();
                return new SuccessDataResult<List<SelectionItem>>(items);
            }
        }
    }
}
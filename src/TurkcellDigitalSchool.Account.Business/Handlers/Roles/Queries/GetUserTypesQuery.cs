using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetUserTypesQuery : IRequest<IDataResult<List<SelectionItem>>>
    {
        public class GetUserTypesQueryHandler : IRequestHandler<GetUserTypesQuery, IDataResult<List<SelectionItem>>>
        {
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<List<SelectionItem>>> Handle(GetUserTypesQuery request, CancellationToken cancellationToken)
            {
                var items = ((UserType[])Enum.GetValues(typeof(UserType)))
                .Select(x => new SelectionItem
                {
                    Id = (int)x,
                    Label = x.DescriptionAttr().ToString()
                }).ToList();
                return new SuccessDataResult<List<SelectionItem>>(items);
            }
        }
    }
}
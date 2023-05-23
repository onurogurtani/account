﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.Queries
{
    [ExcludeFromCodeCoverage]
    [LogScope]
    public class GetRoleTypesQuery : IRequest<IDataResult<List<SelectionItem>>>
    {
        public class GetRoleTypesQueryHandler : IRequestHandler<GetRoleTypesQuery, IDataResult<List<SelectionItem>>>
        {
         
            [SecuredOperation]
            public async Task<IDataResult<List<SelectionItem>>> Handle(GetRoleTypesQuery request, CancellationToken cancellationToken)
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

using MediatR;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.InstitutionTypes.Queries
{
    [ExcludeFromCodeCoverage]

    [LogScope]
    public class GetInstitutionTypesQuery : IRequest<DataResult<PagedList<InstitutionTypeDto>>>
    {
        public PaginationQuery Pagination { get; set; } = new();
        public class GetInstitutionTypesQueryHandler : IRequestHandler<GetInstitutionTypesQuery, DataResult<PagedList<InstitutionTypeDto>>>
        {
            public async Task<DataResult<PagedList<InstitutionTypeDto>>> Handle(GetInstitutionTypesQuery request, CancellationToken cancellationToken)
            {
                var institutionTypes = EnumFunctions.GetEnumMemberNamesAndValues<InstitutionTypeEnum>()
                  .Select(s => new InstitutionTypeDto
                  {
                      Id = s.Value,
                      Name = s.Member.GetMemberCustomAttribute<DescriptionAttribute>().Description,
                  }).ToList();

                var pagedList = new PagedList<InstitutionTypeDto>(institutionTypes, institutionTypes.Count, request.Pagination.PageNumber, request.Pagination.PageSize);

                return new SuccessDataResult<PagedList<InstitutionTypeDto>>(pagedList);
            }
        }
    }
}
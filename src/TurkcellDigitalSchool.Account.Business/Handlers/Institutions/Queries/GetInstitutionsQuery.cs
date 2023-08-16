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

namespace TurkcellDigitalSchool.Account.Business.Handlers.Institutions.Queries
{
    [ExcludeFromCodeCoverage] 
     
    [LogScope]
    public class GetInstitutionsQuery : IRequest<DataResult<PagedList<InstitutionDto>>>
    {
        public PaginationQuery Pagination { get; set; } = new();
        public class GetInstitutionsQueryHandler : IRequestHandler<GetInstitutionsQuery, DataResult<PagedList<InstitutionDto>>>
        {
            public async Task<DataResult<PagedList<InstitutionDto>>> Handle(GetInstitutionsQuery request, CancellationToken cancellationToken)
            {
                var institutions = EnumFunctions.GetEnumMemberNamesAndValues<InstitutionEnum>()
                  .Select(s => new InstitutionDto
                  {
                      Id = s.Value,
                      Name = s.Member.GetMemberCustomAttribute<DescriptionAttribute>().Description,
                  }).ToList();

                var pagedList = new PagedList<InstitutionDto>(institutions, institutions.Count, request.Pagination.PageNumber, request.Pagination.PageSize);

                return new SuccessDataResult<PagedList<InstitutionDto>>(pagedList);
            }
        }
    }
}
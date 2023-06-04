using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries
{
    ///<summary>
    ///Get Filtered Paged Organisation with relation data 
    ///</summary>
    ///<remarks>OrderBy default "UpdateTimeDESC" also can be ""CrmIdASC","CrmIdDESC","OrganisationTypeNameASC","OrganisationTypeNameDESC",NameASC","NameDESC","OrganisationManagerASC","OrganisationManagerDESC","PackageNameASC","PackageNameDESC","LicenceNumberASC","LicenceNumberDESC","DomainNameASC","DomainNameDESC","CustomerNumberASC","CustomerNumberDESC","OrganisationStatusInfoASC","OrganisationStatusInfoDESC","InsertTimeASC","InsertTimeDESC","UpdateTimeASC","UpdateTimeDESC","IdASC","IdDESC" </remarks>
    [LogScope]
    public class GetByFilterPagedOrganisationsQuery : IRequest<DataResult<PagedList<Organisation>>>
    {
        public OrganisationDetailSearch OrganisationDetailSearch { get; set; } = new OrganisationDetailSearch();

        public class GetByFilterPagedOrganisationsQueryHandler : IRequestHandler<GetByFilterPagedOrganisationsQuery, DataResult<PagedList<Organisation>>>
        {
            private readonly IOrganisationRepository _organisationRepository;

            public GetByFilterPagedOrganisationsQueryHandler(IOrganisationRepository organisationRepository)
            {
                _organisationRepository = organisationRepository;
            }

            [CacheRemoveAspect("Get")] 
            [SecuredOperation]
            public virtual async Task<DataResult<PagedList<Organisation>>> Handle(GetByFilterPagedOrganisationsQuery request, CancellationToken cancellationToken)
            {
                var query = _organisationRepository.Query()
                    .Include(x => x.OrganisationType)
                    .AsQueryable();

                if (!string.IsNullOrWhiteSpace(request.OrganisationDetailSearch.Name))
                    query = query.Where(x => x.Name.ToLower().Contains(request.OrganisationDetailSearch.Name.ToLower()));

                if (request.OrganisationDetailSearch.OrganisationTypeId > 0)
                    query = query.Where(x => x.OrganisationTypeId == request.OrganisationDetailSearch.OrganisationTypeId);

                if (!string.IsNullOrWhiteSpace(request.OrganisationDetailSearch.PackageName))
                    query = query.Where(x => x.PackageName.ToLower().Contains(request.OrganisationDetailSearch.PackageName.ToLower()));

                if (!string.IsNullOrWhiteSpace(request.OrganisationDetailSearch.OrganisationManager))
                    query = query.Where(x => x.OrganisationManager.ToLower().Contains(request.OrganisationDetailSearch.OrganisationManager.ToLower()));

                if (request.OrganisationDetailSearch.MembershipStartDate.HasValue)
                    query = query.Where(x => x.MembershipStartDate >= request.OrganisationDetailSearch.MembershipStartDate);

                if (request.OrganisationDetailSearch.MembershipFinishDate.HasValue)
                    query = query.Where(x => x.MembershipFinishDate.Date < request.OrganisationDetailSearch.MembershipFinishDate.Value.AddDays(1));

                if (!string.IsNullOrWhiteSpace(request.OrganisationDetailSearch.CustomerNumber))
                    query = query.Where(x => x.CustomerNumber.ToLower().Contains(request.OrganisationDetailSearch.CustomerNumber.ToLower()));

                if (!string.IsNullOrWhiteSpace(request.OrganisationDetailSearch.DomainName))
                    query = query.Where(x => x.DomainName.Contains(request.OrganisationDetailSearch.DomainName));

                if (request.OrganisationDetailSearch.SegmentType > 0)
                    query = query.Where(x => x.SegmentType == request.OrganisationDetailSearch.SegmentType);

                if (request.OrganisationDetailSearch.OrganisationStatusInfo != null)
                    query = query.Where(x => x.OrganisationStatusInfo == request.OrganisationDetailSearch.OrganisationStatusInfo);


                query = request.OrganisationDetailSearch.OrderBy switch
                {
                    "CrmIdASC" => query.OrderBy(x => x.CrmId),
                    "CrmIdDESC" => query.OrderByDescending(x => x.CrmId),
                    "OrganisationTypeNameASC" => query.OrderBy(x => x.OrganisationType.Name),
                    "OrganisationTypeNameDESC" => query.OrderByDescending(x => x.OrganisationType.Name),
                    "NameASC" => query.OrderBy(x => x.Name),
                    "NameDESC" => query.OrderByDescending(x => x.Name),
                    "OrganisationManagerASC" => query.OrderBy(x => x.OrganisationManager),
                    "OrganisationManagerDESC" => query.OrderByDescending(x => x.OrganisationManager),
                    "PackageNameASC" => query.OrderBy(x => x.PackageName),
                    "PackageNameDESC" => query.OrderByDescending(x => x.PackageName),
                    "LicenceNumberASC" => query.OrderBy(x => x.LicenceNumber),
                    "LicenceNumberDESC" => query.OrderByDescending(x => x.LicenceNumber),
                    "DomainNameASC" => query.OrderBy(x => x.DomainName),
                    "DomainNameDESC" => query.OrderByDescending(x => x.DomainName),
                    "CustomerNumberASC" => query.OrderBy(x => x.CustomerNumber),
                    "CustomerNumberDESC" => query.OrderByDescending(x => x.CustomerNumber),
                    "OrganisationStatusInfoASC" => query.OrderBy(x => x.OrganisationStatusInfo),
                    "OrganisationStatusInfoDESC" => query.OrderByDescending(x => x.OrganisationStatusInfo),
                    "InsertTimeASC" => query.OrderBy(x => x.InsertTime),
                    "InsertTimeDESC" => query.OrderByDescending(x => x.InsertTime),
                    "UpdateTimeASC" => query.OrderBy(x => x.UpdateTime),
                    "UpdateTimeDESC" => query.OrderByDescending(x => x.UpdateTime),
                    "IdASC" => query.OrderBy(x => x.Id),
                    "IdDESC" => query.OrderByDescending(x => x.Id),
                    _ => query.OrderByDescending(x => x.UpdateTime),
                };
                var items = await query.Skip((request.OrganisationDetailSearch.PageNumber - 1) * request.OrganisationDetailSearch.PageSize)
                    .Take(request.OrganisationDetailSearch.PageSize)
                    .ToListAsync();

                var pagedList = new PagedList<Organisation>(items, query.Count(), request.OrganisationDetailSearch.PageNumber, request.OrganisationDetailSearch.PageSize);

                return new SuccessDataResult<PagedList<Organisation>>(pagedList);
            }
        }
    }
}

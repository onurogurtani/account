using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Queries
{
    ///<summary>
    ///Get Filtered Paged PackageTypes with relation data 
    ///</summary>
    ///<remarks>OrderBy default "UpdateTimeDESC" also can be "IsActiveASC","IsActiveDESC","NameASC","NameDESC","PackageTypeASC","PackageTypeDESC","IdASC","IdDESC","InsertTimeASC","InsertTimeDESC","UpdateTimeASC" 
    ///<br />   PageNumber can be  entered manually </remarks>
    [LogScope]
    public class GetByFilterPagedPackageTypesQuery : IRequest<IDataResult<PagedList<PackageType>>>
    {
        public PackageTypeDetailSearch PackageTypeDetailSearch { get; set; } = new PackageTypeDetailSearch();

        public class GetByFilterPagedPackageTypesQueryHandler : IRequestHandler<GetByFilterPagedPackageTypesQuery, IDataResult<PagedList<PackageType>>>
        {
            private readonly IPackageTypeRepository _packageRepository;

            public GetByFilterPagedPackageTypesQueryHandler(IPackageTypeRepository packageRepository)

            {
                _packageRepository = packageRepository;
            }

             
            
            [SecuredOperation]
            public virtual async Task<IDataResult<PagedList<PackageType>>> Handle(GetByFilterPagedPackageTypesQuery request, CancellationToken cancellationToken)
            {
                var query = _packageRepository.Query()
                    .Include(x => x.PackageTypeTargetScreens).ThenInclude(x => x.TargetScreen)
                    .AsQueryable();


                query = request.PackageTypeDetailSearch.OrderBy switch
                {
                    "IsActiveASC" => query.OrderBy(x => x.IsActive),
                    "IsActiveDESC" => query.OrderByDescending(x => x.IsActive),
                    "NameASC" => query.OrderBy(x => x.Name),
                    "NameDESC" => query.OrderByDescending(x => x.Name),
                    "PackageTypeASC" => query.OrderBy(x => x.PackageTypeTargetScreens.First().PackageType.Name),
                    "PackageTypeDESC" => query.OrderByDescending(x => x.PackageTypeTargetScreens.First().PackageType.Name),
                    "IdASC" => query.OrderBy(x => x.Id),
                    "IdDESC" => query.OrderByDescending(x => x.Id),
                    "InsertTimeASC" => query.OrderBy(x => x.InsertTime),
                    "InsertTimeDESC" => query.OrderByDescending(x => x.InsertTime),
                    "UpdateTimeASC" => query.OrderBy(x => x.UpdateTime),
                    _ => query.OrderByDescending(x => x.UpdateTime),
                };


                var items = await query.Skip((request.PackageTypeDetailSearch.PageNumber - 1) * request.PackageTypeDetailSearch.PageSize)
                    .Take(request.PackageTypeDetailSearch.PageSize)
                    .ToListAsync();


                var pagedList = new PagedList<PackageType>(items, query.Count(), request.PackageTypeDetailSearch.PageNumber, request.PackageTypeDetailSearch.PageSize);

                return new SuccessDataResult<PagedList<PackageType>>(pagedList);
            }
        }

    }
}
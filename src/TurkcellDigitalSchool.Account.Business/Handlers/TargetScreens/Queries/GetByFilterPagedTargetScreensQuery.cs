using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Queries
{
    ///<summary>
    ///Get Filtered Paged TargetScreens with relation data 
    ///</summary>
    ///<remarks>OrderBy default "UpdateTimeDESC" also can be "IsActiveASC","IsActiveDESC","NameASC","NameDESC","PageNameASC","PageNameDESC","IdASC","IdDESC","InsertTimeASC","InsertTimeDESC","UpdateTimeASC" 
    ///<br />   PageNumber can be  entered manually </remarks>
    [LogScope]
     
    public class GetByFilterPagedTargetScreensQuery : IRequest<DataResult<PagedList<TargetScreen>>>
    {
        public TargetScreenDetailSearch TargetScreenDetailSearch { get; set; } = new TargetScreenDetailSearch();

        public class GetByFilterPagedTargetScreensQueryHandler : IRequestHandler<GetByFilterPagedTargetScreensQuery, DataResult<PagedList<TargetScreen>>>
        {
            private readonly ITargetScreenRepository _packageRepository;

            public GetByFilterPagedTargetScreensQueryHandler(ITargetScreenRepository packageRepository)

            {
                _packageRepository = packageRepository;
            }
            
            public virtual async Task<DataResult<PagedList<TargetScreen>>> Handle(GetByFilterPagedTargetScreensQuery request, CancellationToken cancellationToken)
            {
                var query = _packageRepository.Query()
                    .AsQueryable();


                query = request.TargetScreenDetailSearch.OrderBy switch
                {
                    "IsActiveASC" => query.OrderBy(x => x.IsActive),
                    "IsActiveDESC" => query.OrderByDescending(x => x.IsActive),
                    "NameASC" => query.OrderBy(x => x.Name),
                    "NameDESC" => query.OrderByDescending(x => x.Name),
                    "PageNameASC" => query.OrderBy(x => x.PageName),
                    "PageNameDESC" => query.OrderByDescending(x => x.PageName),
                    "IdASC" => query.OrderBy(x => x.Id),
                    "IdDESC" => query.OrderByDescending(x => x.Id),
                    "InsertTimeASC" => query.OrderBy(x => x.InsertTime),
                    "InsertTimeDESC" => query.OrderByDescending(x => x.InsertTime),
                    "UpdateTimeASC" => query.OrderBy(x => x.UpdateTime),
                    _ => query.OrderByDescending(x => x.UpdateTime),
                };



                var items = await query.Skip((request.TargetScreenDetailSearch.PageNumber - 1) * request.TargetScreenDetailSearch.PageSize)
                    .Take(request.TargetScreenDetailSearch.PageSize)
                    .ToListAsync();


                var pagedList = new PagedList<TargetScreen>(items, query.Count(), request.TargetScreenDetailSearch.PageNumber, request.TargetScreenDetailSearch.PageSize);

                return new SuccessDataResult<PagedList<TargetScreen>>(pagedList);
            }
        }

    }
}
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries
{

    [LogScope]
    public class GetByFilterPagedPublicPackagesQuery : IRequest<DataResult<PagedList<PublicPackageDetailResponse>>>
    {
        public PublicPackageDetailSearch PublicPackageDetailSearch { get; set; } = new PublicPackageDetailSearch();

        public class GetByFilterPagedPublicPackagesQueryHandler : IRequestHandler<GetByFilterPagedPublicPackagesQuery, DataResult<PagedList<PublicPackageDetailResponse>>>
        {
            private readonly IPackageRepository _packageRepository;

            public GetByFilterPagedPublicPackagesQueryHandler(IPackageRepository packageRepository)
            {
                _packageRepository = packageRepository;
            }

            public virtual async Task<DataResult<PagedList<PublicPackageDetailResponse>>> Handle(GetByFilterPagedPublicPackagesQuery request, CancellationToken cancellationToken)
            {
                var query = _packageRepository.Query().Where(w => w.IsActive)
                    .Include(x => x.ImageOfPackages).ThenInclude(x => x.File)
                    .AsQueryable();

                query = request.PublicPackageDetailSearch.OrderBy switch
                {
                    "NameASC" => query.OrderBy(x => x.Name),
                    "NameDESC" => query.OrderByDescending(x => x.Name),
                    "IdASC" => query.OrderBy(x => x.Id),
                    "IdDESC" => query.OrderByDescending(x => x.Id),
                    "InsertTimeASC" => query.OrderBy(x => x.InsertTime),
                    "InsertTimeDESC" => query.OrderByDescending(x => x.InsertTime),
                    "UpdateTimeASC" => query.OrderBy(x => x.UpdateTime),
                    "UpdateTimeDESC" => query.OrderByDescending(x => x.UpdateTime),
                    _ => query.OrderByDescending(x => x.UpdateTime),
                };

                var items = await query.Skip((request.PublicPackageDetailSearch.PageNumber - 1) * request.PublicPackageDetailSearch.PageSize)
                        .Take(request.PublicPackageDetailSearch.PageSize)
                        .Select(w => new PublicPackageDetailResponse
                        {
                            Id = w.Id,
                            Content = w.Content,
                            Summary = w.Summary,
                            Name = w.Name,
                            Files = w.ImageOfPackages.Select(a => new PublicPackageFileDto { Id = a.File.Id, Name = a.File.FileName, FilePath = a.File.FilePath }).ToList()
                        }).ToListAsync();

                var pagedList = new PagedList<PublicPackageDetailResponse>(items, query.Count(), request.PublicPackageDetailSearch.PageNumber, request.PublicPackageDetailSearch.PageSize);

                return new SuccessDataResult<PagedList<PublicPackageDetailResponse>>(pagedList);
            }
        }

    }
}
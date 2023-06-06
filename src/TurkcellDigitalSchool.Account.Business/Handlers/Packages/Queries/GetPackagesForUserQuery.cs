using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.File;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries
{
    ///<summary>
    ///Get Packages For User list Page
    ///<br />  PageNumber can be  entered manually </remarks>
    [LogScope]
    [SecuredOperation]
    public class GetPackagesForUserQuery : IRequest<DataResult<PagedList<GetPackagesForUserResponseDto>>>
    {
        public PaginationQuery Pagination { get; set; }
        public class GetPackagesForUserQueryHandler : IRequestHandler<GetPackagesForUserQuery, DataResult<PagedList<GetPackagesForUserResponseDto>>>
        {

            private readonly IPackageRepository _packageRepository;
            private readonly IMapper _mapper;
            private readonly IFileService _fileService;

            public GetPackagesForUserQueryHandler(IPackageRepository packageRepository, IMapper mapper, IFileService fileService)
            {
                _packageRepository = packageRepository;
                _mapper = mapper;
                _fileService = fileService;
            }

            public async Task<DataResult<PagedList<GetPackagesForUserResponseDto>>> Handle(GetPackagesForUserQuery request, CancellationToken cancellationToken)
            {
                var query = _packageRepository.Query().Where(q => q.IsActive)
                    .Include(x => x.PackageLessons).ThenInclude(x => x.Lesson)
                    .Include(x => x.ImageOfPackages).ThenInclude(q => q.File)
                    .AsQueryable();

                var pagedList = query.ToPagedList(request.Pagination);

                var mappedItems = _mapper.Map<List<GetPackagesForUserResponseDto>>(pagedList.Items);

                // Todo: Kampanya Süreci, Paket Fiyatý ve Aylýk Taksit Fiyatý gibi bilgiler Turkcell CRM'den gelecektir. Bu yüzden; dönüþ yapýlana kadar dummy data olarak eklendi.
                mappedItems.ForEach(item =>
                {
                    item.Price = 5000;
                    item.MaxInstallmentsCount = 10;
                    item.MonthlyInstallmentPrice = item.Price / item.MaxInstallmentsCount;
                    item.IsCampaign = true;
                    item.Currency = "TL";

                    var packageImage = pagedList.Items.Where(q => q.Id == item.Id).FirstOrDefault()?.ImageOfPackages.FirstOrDefault();
                    var fileResult = _fileService.GetFile(packageImage.File.FilePath).GetAwaiter().GetResult();
                    var filePath = Path.GetFileName(packageImage.File.FilePath);

                    item.Image = new ImageFileDto
                    {
                        ContentType = packageImage.File.ContentType,
                        FileName = packageImage.File.FileName,
                        FilePath = filePath,
                        Image = fileResult.Data
                    };
                });

                var pagedResult = new PagedList<GetPackagesForUserResponseDto>(mappedItems, pagedList.PagedProperty.TotalCount, request.Pagination.PageNumber, request.Pagination.PageSize);

                return new SuccessDataResult<PagedList<GetPackagesForUserResponseDto>>(pagedResult);
            }
        }

    }
}
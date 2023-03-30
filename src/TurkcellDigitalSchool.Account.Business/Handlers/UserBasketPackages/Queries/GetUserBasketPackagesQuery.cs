using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Entities.Dtos;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserBasketPackages.Queries
{
    public class GetUserBasketPackagesQuery : IRequest<IDataResult<GetUserBasketPackagesResponseDto>>
    {
        public PaginationQuery Pagination { get; set; }
        public class GetUserBasketPackagesQueryHandler : IRequestHandler<GetUserBasketPackagesQuery, IDataResult<GetUserBasketPackagesResponseDto>>
        {
            private readonly IUserBasketPackageRepository _userBasketPackageRepository;
            private readonly ITokenHelper _tokenHelper;

            public GetUserBasketPackagesQueryHandler(IUserBasketPackageRepository userBasketPackageRepository, ITokenHelper tokenHelper)
            {
                _userBasketPackageRepository = userBasketPackageRepository;
                _tokenHelper = tokenHelper;
            }
             
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<GetUserBasketPackagesResponseDto>> Handle(GetUserBasketPackagesQuery request, CancellationToken cancellationToken)
            {
                var currentUserId = _tokenHelper.GetUserIdByCurrentToken();

                var userBasketPackagesQueryable = _userBasketPackageRepository.Query().Where(q => q.UserId == currentUserId);

                var userBasketPackages = userBasketPackagesQueryable
                    .Select(q => new UserBasketPackageDto
                    {
                        Id = q.Id,
                        CreateDate = q.InsertTime,
                        UserId = q.UserId,
                        PackageId = q.PackageId,
                        Quantity = q.Quantity,
                        PackageName = q.Package.Name
                    })
                    .Skip((request.Pagination.PageNumber - 1) * request.Pagination.PageSize)
                    .Take(request.Pagination.PageSize)
                    .ToList();

                var pagedList = new PagedList<UserBasketPackageDto>(userBasketPackages, userBasketPackagesQueryable.Count(), request.Pagination.PageNumber, request.Pagination.PageSize);

                var allBasketPackages = userBasketPackagesQueryable.Select(q => new
                {
                    q.Id,
                    q.PackageId,
                    q.Quantity
                }).ToList();

                // Todo: Paket Fiyat�, Taksit Say�s� ve Ayl�k Taksit Fiyat� gibi bilgiler Turkcell CRM'den gelecektir. Bu y�zden; d�n�� yap�lana kadar dummy data olarak eklendi.

                long totalPrice = 0;
                foreach (var packageItem in allBasketPackages)
                {
                    var packagePrice = 2400;
                    var maxInstallmentsCount = 12;
                    var monthlyInstallmentPrice = 250;

                    totalPrice += packagePrice * packageItem.Quantity;


                    if (pagedList.Items.Any(q => q.Id == packageItem.Id))
                    {
                        pagedList.Items.FirstOrDefault(q => q.Id == packageItem.Id).PackagePrice = 2400;
                        pagedList.Items.FirstOrDefault(q => q.Id == packageItem.Id).MaxInstallmentsCount = 12;
                        pagedList.Items.FirstOrDefault(q => q.Id == packageItem.Id).MonthlyInstallmentPrice = 250;
                    }
                }

                var result = new GetUserBasketPackagesResponseDto
                {
                    TotalPrice = totalPrice,
                    PagedItems = pagedList
                };

                return new SuccessDataResult<GetUserBasketPackagesResponseDto>(result, Messages.SuccessfulOperation);
            }
        }
    }
}
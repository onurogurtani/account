using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers; 
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserBasketPackages.Queries
{
    [LogScope]
     
    public class GetUserBasketPackagesQuery : IRequest<DataResult<GetUserBasketPackagesResponseDto>>
    {
        public PaginationQuery Pagination { get; set; }

        [MessageClassAttr("Kullanýcý Paket Sepeti Görüntüleme")]
        public class GetUserBasketPackagesQueryHandler : IRequestHandler<GetUserBasketPackagesQuery, DataResult<GetUserBasketPackagesResponseDto>>
        {
            private readonly IUserBasketPackageRepository _userBasketPackageRepository;
            private readonly ITokenHelper _tokenHelper;

            public GetUserBasketPackagesQueryHandler(IUserBasketPackageRepository userBasketPackageRepository, ITokenHelper tokenHelper)
            {
                _userBasketPackageRepository = userBasketPackageRepository;
                _tokenHelper = tokenHelper;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            public async Task<DataResult<GetUserBasketPackagesResponseDto>> Handle(GetUserBasketPackagesQuery request, CancellationToken cancellationToken)
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

                // Todo: Paket Fiyatý, Taksit Sayýsý ve Aylýk Taksit Fiyatý gibi bilgiler Turkcell CRM'den gelecektir. Bu yüzden; dönüþ yapýlana kadar dummy data olarak eklendi.

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

                return new SuccessDataResult<GetUserBasketPackagesResponseDto>(result, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}
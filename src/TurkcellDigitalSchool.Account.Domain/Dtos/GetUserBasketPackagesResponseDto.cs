using TurkcellDigitalSchool.Core.Utilities.Paging;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class GetUserBasketPackagesResponseDto
    {
        public decimal TotalPrice { get; set; }
        public PagedList<UserBasketPackageDto> PagedItems { get; set; }
    }
}
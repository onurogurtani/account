using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.File;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.FileServices;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries
{
    ///<summary>
    ///Get Packages For User Detail Page
    ///</summary>
    ///<br />   PageNumber can be  entered manually </remarks>

    [LogScope]
     
    public class GetPackageForUserQuery : IRequest<DataResult<GetPackageForUserResponseDto>>
    {
        public long Id { get; set; }

        [MessageClassAttr("Kullanýcý Detay Sayfasý Paket Görüntüleme")]
        public class GetPackageForUserQueryHandler : IRequestHandler<GetPackageForUserQuery, DataResult<GetPackageForUserResponseDto>>
        {

            private readonly IPackageRepository _packageRepository;
            private readonly IMapper _mapper;
            private readonly IFileService _fileService;
            private readonly IFileServices _fileServiceIntegration;

            public GetPackageForUserQueryHandler(IPackageRepository packageRepository, IMapper mapper, IFileService fileService, IFileServices fileServiceIntegration)
            {
                _packageRepository = packageRepository;
                _mapper = mapper;
                _fileService = fileService;
                _fileServiceIntegration = fileServiceIntegration;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            public async Task<DataResult<GetPackageForUserResponseDto>> Handle(GetPackageForUserQuery request, CancellationToken cancellationToken)
            {
                var package = await _packageRepository.Query().Where(q => q.Id == request.Id && q.IsActive)
                    .Include(x => x.PackageLessons).ThenInclude(x => x.Lesson)
                    .Include(x => x.ImageOfPackages).ThenInclude(q => q.File)  
                    .FirstOrDefaultAsync(cancellationToken);

                if (package == null)
                    return new ErrorDataResult<GetPackageForUserResponseDto>(RecordDoesNotExist.PrepareRedisMessage());

                var packageResponseDto = _mapper.Map<GetPackageForUserResponseDto>(package);

                // Todo: Kampanya Süreci, Paket Fiyatý ve Aylýk Taksit Fiyatý gibi bilgiler Turkcell CRM'den gelecektir. Bu yüzden; dönüþ yapýlana kadar dummy data olarak eklendi.
                packageResponseDto.Price = 5000;
                packageResponseDto.MaxInstallmentsCount = 10;
                packageResponseDto.MonthlyInstallmentPrice = packageResponseDto.Price / packageResponseDto.MaxInstallmentsCount;
                packageResponseDto.IsCampaign = true;
                packageResponseDto.Currency = "TL";

                packageResponseDto.Images = new();
                foreach (var image in package.ImageOfPackages)
                { 
                    var fileResult = _fileService.GetFile(image.File.FilePath).GetAwaiter().GetResult();
                    var filePath = Path.GetFileName(image.File.FilePath);

                    packageResponseDto.Images.Add(new ImageFileDto
                    {
                        ContentType = image.File.ContentType,
                        FileName = image.File.FileName,
                        FilePath = filePath,
                        Image = fileResult.Data
                    });
                }

                return new SuccessDataResult<GetPackageForUserResponseDto>(packageResponseDto);
            }
        }

    }
}
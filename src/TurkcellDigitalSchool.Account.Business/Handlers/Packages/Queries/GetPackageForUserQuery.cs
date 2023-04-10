using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.File;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos;
using TurkcellDigitalSchool.Entities.Dtos.PackageDtos;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries
{
    ///<summary>
    ///Get Packages For User Detail Page
    ///</summary>
    ///<br />   PageNumber can be  entered manually </remarks>
    public class GetPackageForUserQuery : IRequest<IDataResult<GetPackageForUserResponseDto>>
    {
        public long Id { get; set; }

        [MessageClassAttr("Kullan�c� Detay Sayfas� Paket G�r�nt�leme")]
        public class GetPackageForUserQueryHandler : IRequestHandler<GetPackageForUserQuery, IDataResult<GetPackageForUserResponseDto>>
        {

            private readonly IPackageRepository _packageRepository;
            private readonly IMapper _mapper;
            private readonly IFileService _fileService;

            public GetPackageForUserQueryHandler(IPackageRepository packageRepository, IMapper mapper, IFileService fileService)
            {
                _packageRepository = packageRepository;
                _mapper = mapper;
                _fileService = fileService;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;

            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<GetPackageForUserResponseDto>> Handle(GetPackageForUserQuery request, CancellationToken cancellationToken)
            {
                var package = await _packageRepository.Query().Where(q => q.Id == request.Id && q.IsActive)
                    .Include(x => x.PackageLessons).ThenInclude(x => x.Lesson)
                    .Include(x => x.ImageOfPackages).ThenInclude(q => q.File)
                    .FirstOrDefaultAsync();

                if (package == null)
                    return new ErrorDataResult<GetPackageForUserResponseDto>(RecordDoesNotExist.PrepareRedisMessage());

                var packageResponseDto = _mapper.Map<GetPackageForUserResponseDto>(package);

                // Todo: Kampanya S�reci, Paket Fiyat� ve Ayl�k Taksit Fiyat� gibi bilgiler Turkcell CRM'den gelecektir. Bu y�zden; d�n�� yap�lana kadar dummy data olarak eklendi.
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
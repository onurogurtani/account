using System.IO;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Utilities.File;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationLogos.Queries
{
    public class GetOrganisationLogoQuery : IRequest<IDataResult<OrganisationLogoDto>>
    {
        public long Id { get; set; }

        public class GetOrganisationLogoQueryHandler : IRequestHandler<GetOrganisationLogoQuery, IDataResult<OrganisationLogoDto>>
        {
            private readonly IFileService _fileService;
            private readonly IFileRepository _fileRepository;
            public GetOrganisationLogoQueryHandler(IFileRepository fileRepository, IFileService fileService)
            {
                _fileService = fileService;
                _fileRepository = fileRepository;
            }

            [SecuredOperation]
            public async Task<IDataResult<OrganisationLogoDto>> Handle(GetOrganisationLogoQuery request, CancellationToken cancellationToken)
            {
                var record = await _fileRepository.GetAsync(x => x.Id == request.Id);

                if (record == null)
                {
                    return new ErrorDataResult<OrganisationLogoDto>(Messages.RecordIsNotFound);
                }

                var fileResult = await _fileService.GetFile(record.FilePath);

                if (!fileResult.Success)
                {
                    return new ErrorDataResult<OrganisationLogoDto>(fileResult.Message);
                }

                var filePath = Path.GetFileName(record.FilePath);
                return new SuccessDataResult<OrganisationLogoDto>(new OrganisationLogoDto
                {
                    ContentType = record.ContentType,
                    FileName = record.FileName,
                    FilePath = filePath,
                    Image = fileResult.Data
                });
            }
        }
    }
}

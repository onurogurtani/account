using System.IO;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.File;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.Queries
{
    [LogScope] 
    public class GetAvatarFileQuery : IRequest<DataResult<AvatarFileDto>>
    {
        public long Id { get; set; }

        public class GetAvatarFileQueryHandler : IRequestHandler<GetAvatarFileQuery, DataResult<AvatarFileDto>>
        {
            private readonly IFileService _fileService;
            private readonly IFileRepository _fileRepository;
            public GetAvatarFileQueryHandler(IFileRepository fileRepository, IFileService fileService)
            {
                _fileService = fileService;
                _fileRepository = fileRepository;
            }

            public async Task<DataResult<AvatarFileDto>> Handle(GetAvatarFileQuery request, CancellationToken cancellationToken)
            {
                var record = await _fileRepository.GetAsync(x => x.Id == request.Id);

                if (record == null)
                {
                    return new ErrorDataResult<AvatarFileDto>(Messages.RecordIsNotFound);
                }

                var fileResult = await _fileService.GetFile(record.FilePath);

                if (!fileResult.Success)
                {
                    return new ErrorDataResult<AvatarFileDto>(fileResult.Message);
                }

                var filePath = Path.GetFileName(record.FilePath);
                return new SuccessDataResult<AvatarFileDto>(new AvatarFileDto
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

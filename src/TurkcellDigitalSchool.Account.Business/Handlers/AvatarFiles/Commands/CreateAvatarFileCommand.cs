using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Utilities.File;
using TurkcellDigitalSchool.Core.Utilities.File.Model;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Enums;
using TurkcellDigitalSchool.File.DataAccess.Abstract;
using System.Linq;
using IResult = TurkcellDigitalSchool.Core.Utilities.Results.IResult;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.Commands
{
    public class CreateAvatarFileCommand : IRequest<IResult>
    {
        public IFormFile Image { get; set; }
        public string FileName { get; set; }

        public class CreateFrameFileCommandHandler : IRequestHandler<CreateAvatarFileCommand,IResult>
        {
            private readonly IFileRepository _fileRepository;
            private readonly IFileService _fileService;
            private readonly IPathHelper _pathHelper;

            private readonly string _filePath = "avatar";

            public CreateFrameFileCommandHandler(IFileRepository fileRepository, IFileService fileService, IPathHelper pathHelper)
            {
                _fileRepository = fileRepository;
                _fileService = fileService;
                _pathHelper = pathHelper;
            }

            public async Task<IResult> Handle(CreateAvatarFileCommand request, CancellationToken cancellationToken)
            {
                string[] avatarType = new string[] { "image/jpeg", "image/png" };

                if (!avatarType.Contains(request.Image.ContentType))
                {
                    return new ErrorResult(Messages.FileTypeError);
                }
                if (request.Image.Length > 5000000)
                {
                    return new ErrorResult(Messages.FileSizeError);
                }
                var fullPath = _pathHelper.GetPath(_filePath);
                var saveFileResult = await _fileService.SaveFile(new SaveFileRequest { File = request.Image, Path = fullPath });
                if (!saveFileResult.Success)
                {
                    return new ErrorResult(saveFileResult.Message);
                }

                _fileRepository.Add(new Entities.Concrete.File()
                {
                    FileType = FileType.Avatar,
                    FilePath = saveFileResult.Data,
                    FileName = request.FileName,
                    ContentType = request.Image.ContentType
                });
                await _fileRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Added);

            }
        }
    }
}


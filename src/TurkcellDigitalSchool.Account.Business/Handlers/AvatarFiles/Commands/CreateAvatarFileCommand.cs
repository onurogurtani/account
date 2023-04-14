using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Utilities.File;
using IResult = TurkcellDigitalSchool.Core.Utilities.Results.IResult;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.Commands
{
    public class CreateAvatarFileCommand : IRequest<IResult>
    {
        public IFormFile Image { get; set; }
        public string FileName { get; set; }

        [MessageClassAttr("Avatar Dosya Oluþtur")]
        public class CreateFrameFileCommandHandler : IRequestHandler<CreateAvatarFileCommand,IResult>
        {
            //private readonly IFileRepository _fileRepository;
            private readonly IFileService _fileService;
            private readonly IPathHelper _pathHelper;

            private readonly string _filePath = "avatar";

            public CreateFrameFileCommandHandler( IFileService fileService, IPathHelper pathHelper)
            {
                //_fileRepository = fileRepository;
                _fileService = fileService;
                _pathHelper = pathHelper;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string FileTypeError = Messages.FileTypeError;

            [MessageConstAttr(MessageCodeType.Success)]
            private static string Added = Messages.Added;
            public async Task<IResult> Handle(CreateAvatarFileCommand request, CancellationToken cancellationToken)
            {
                //todo:#MS_DUZENLEMESI   
                // Bu entity için düzenleme burada yapýlamaz 
                throw new Exception("Yazýlýmsal düzenleme yapýlmasý");

                //string[] avatarType = new string[] { "image/jpeg", "image/png" };

                //if (!avatarType.Contains(request.Image.ContentType))
                //{
                //    return new ErrorResult(Messages.FileTypeError.PrepareRedisMessage());
                //}
                //if (request.Image.Length > 5000000)
                //{
                //    return new ErrorResult(Messages.FileSizeError);
                //}
                //var fullPath = _pathHelper.GetPath(_filePath);
                //var saveFileResult = await _fileService.SaveFile(new SaveFileRequest { File = request.Image, Path = fullPath });
                //if (!saveFileResult.Success)
                //{
                //    return new ErrorResult(saveFileResult.Message);
                //}

                //_fileRepository.Add(new Entities.Concrete.File()
                //{
                //    FileType = FileType.Avatar,
                //    FilePath = saveFileResult.Data,
                //    FileName = request.FileName,
                //    ContentType = request.Image.ContentType
                //});
                //await _fileRepository.SaveChangesAsync();
                //return new SuccessResult(Messages.Added.PrepareRedisMessage());

            }
        }
    }
}


using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Utilities.File;
using System;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.Commands
{
    public class UpdateAvatarFileCommand : IRequest<Core.Utilities.Results.IResult>
    {
        public long Id { get; set; }
        public IFormFile Image { get; set; }
        public string FileName { get; set; }
        public class UpdateAvatarFileCommandHandler : IRequestHandler<UpdateAvatarFileCommand, Core.Utilities.Results.IResult>
        {
          // private readonly IFileRepository _fileRepository;
            private readonly IFileService _fileService;
            private readonly IPathHelper _pathHelper;
            private readonly string _framesFilePath = "avatar";
            public UpdateAvatarFileCommandHandler( IFileService fileService, IPathHelper pathHelper)
            {
              //  _fileRepository = fileRepository;
                _fileService = fileService;
                _pathHelper = pathHelper;
            }

            public async Task<Core.Utilities.Results.IResult> Handle(UpdateAvatarFileCommand request, CancellationToken cancellationToken)
            {

                //todo:#MS_DUZENLEMESI   
                // Bu entity için düzenleme burada yapýlamaz 
                throw new Exception("Yazýlýmsal düzenleme yapýlmasý");


                //string[] avatarType = new string[] { "image/jpeg", "image/png" };

                //if (!avatarType.Contains(request.Image.ContentType))
                //{
                //    return new ErrorResult(Messages.FileTypeError);
                //}
                //if (request.Image.Length > 5000000)
                //{
                //    return new ErrorResult(Messages.FileSizeError);
                //}
                //var fileRecord = await _fileRepository.GetAsync(w => w.Id == request.Id);

                //if (fileRecord == null)
                //{
                //    return new ErrorResult(Messages.RecordIsNotFound);
                //}

                //var path = _pathHelper.GetPath(_framesFilePath);
                //var fileSaveResult = await _fileService.SaveFile(new SaveFileRequest
                //{
                //    File = request.Image,
                //    Path = path,
                //    FileName = fileRecord.FileName
                //});

                //fileRecord.FilePath = fileSaveResult.Data;
                //fileRecord.FileName = request.FileName;
                //fileRecord.FileType = FileType.Avatar;
                //fileRecord.ContentType = request.Image.ContentType;

                //await _fileRepository.SaveChangesAsync();
                //return new SuccessResult(Messages.Updated);
            }
        }
    }
}


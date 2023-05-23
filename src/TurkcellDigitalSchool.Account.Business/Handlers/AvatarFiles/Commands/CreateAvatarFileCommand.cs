using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using IResult = TurkcellDigitalSchool.Core.Utilities.Results.IResult;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Integration.IntegrationServices.FileServices;
using System.IO;
using System.Text;
using Refit;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.Commands
{
    public class CreateAvatarFileCommand : IRequest<IResult>
    {
        public IFormFile Image { get; set; }
        public string FileName { get; set; }

        [MessageClassAttr("Avatar Dosya Olu�tur")]
        public class CreateFrameFileCommandHandler : IRequestHandler<CreateAvatarFileCommand, IResult>
        {
            private readonly IFileServices _fileServices;

            public CreateFrameFileCommandHandler(IFileServices fileServices)
            {
                _fileServices = fileServices;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string Added = Messages.Added;
            public async Task<IResult> Handle(CreateAvatarFileCommand request, CancellationToken cancellationToken)
            {

                using (var ms = new MemoryStream())
                {
                    ms.Position = 0;
                    request.Image.CopyTo(ms);
                    var bytePartFile = new ByteArrayPart(ms.ToArray(), request.Image.FileName, request.Image.ContentType);
                    var resulImageSolution = await _fileServices.CreateFileCommand(
                        bytePartFile,
                        FileType.Avatar.GetHashCode(),
                        request.FileName, "");
                }

                return new SuccessResult(Added.PrepareRedisMessage());

            }
        }
    }
}


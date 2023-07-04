using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using IResult = TurkcellDigitalSchool.Core.Utilities.Results.IResult;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.FileServices;
using System.IO;
using Refit;
using TurkcellDigitalSchool.Core.AuthorityManagement;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.Commands
{
    [LogScope]
    [SecuredOperationScope(ClaimNames = new []{ ClaimConst.AvatarManagamentAdd })]
    public class CreateAvatarFileCommand : IRequest<IResult>
    {
        public IFormFile Image { get; set; }
        public string FileName { get; set; }

        [MessageClassAttr("Avatar Dosya Oluþtur")]
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


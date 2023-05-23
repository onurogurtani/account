using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using TurkcellDigitalSchool.Common.Helpers;
using System;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Integration.IntegrationServices.FileServices.Model.Request;
using TurkcellDigitalSchool.Integration.IntegrationServices.FileServices;
using Refit;
using System.IO;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Core.CustomAttribute;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.Commands
{
    public class UpdateAvatarFileCommand : IRequest<Core.Utilities.Results.IResult>
    {
        public long Id { get; set; }
        public IFormFile Image { get; set; }
        public string FileName { get; set; }
        public class UpdateAvatarFileCommandHandler : IRequestHandler<UpdateAvatarFileCommand, Core.Utilities.Results.IResult>
        {
            private readonly IFileServices _fileService;
            private readonly IPathHelper _pathHelper;
            private readonly string _framesFilePath = "avatar";
            public UpdateAvatarFileCommandHandler( IFileServices fileService, IPathHelper pathHelper)
            {
                _fileService = fileService;
                _pathHelper = pathHelper;
            }
            [MessageConstAttr(MessageCodeType.Information)]
            private static string Updated = Messages.Updated;
            public async Task<Core.Utilities.Results.IResult> Handle(UpdateAvatarFileCommand request, CancellationToken cancellationToken)
            {

                using (var ms = new MemoryStream())
                {
                    ms.Position = 0;
                    request.Image.CopyTo(ms);
                    var bytePartFile = new ByteArrayPart(ms.ToArray(), request.Image.FileName, request.Image.ContentType);
                    var resulImageSolution = await _fileService.UpdateFileCommand(
                        bytePartFile, request.Id,
                        FileType.Avatar.GetHashCode(),
                        request.FileName, "");
                }
                return new SuccessResult(Updated.PrepareRedisMessage());
 
            }
        }
    }
}


using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Refit;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.FileServices;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.FileServices.Model.Request;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.Commands
{
    [LogScope]
    [SecuredOperationScope]
    public class DeleteAvatarFileCommand : IRequest<IResult>
    {
        public long Id { get; set; }
        public class DeleteAvatarFileCommandHandler : IRequestHandler<DeleteAvatarFileCommand, IResult>
        {

            private readonly IFileServices _fileService;

            public DeleteAvatarFileCommandHandler(IFileServices fileService)
            {
                _fileService = fileService;
            }
            [MessageConstAttr(MessageCodeType.Information)]
            private static readonly string Deleted = Messages.Deleted;

            public async Task<IResult> Handle(DeleteAvatarFileCommand request, CancellationToken cancellationToken)
            {

                var resulImageSolution = _fileService.DeleteFileCommand(new GetFileIntegrationRequest { Id = request.Id }).Result;
                return new SuccessResult(Deleted.PrepareRedisMessage());

            }
        }
    }
}


using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Refit;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Integration.IntegrationServices.FileServices;
using TurkcellDigitalSchool.Integration.IntegrationServices.FileServices.Model.Request;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.Commands
{
    public class DeleteAvatarFileCommand : IRequest<IResult>
    {
        public long Id { get; set; }
        public class DeleteAvatarFileCommandHandler : IRequestHandler<DeleteAvatarFileCommand, IResult>
        {

            private readonly IFileServices _fileService;
            //  private readonly IFileRepository _repository;

            public DeleteAvatarFileCommandHandler(IFileServices fileService)
            {
                //  _repository = repository;
                _fileService = fileService;
            }
            [MessageConstAttr(MessageCodeType.Information)]
            private static readonly string Deleted = Messages.Deleted;

            public async Task<IResult> Handle(DeleteAvatarFileCommand request, CancellationToken cancellationToken)
            {

                var resulImageSolution = _fileService.DeleteFileCommand(new GetFileIntegrationRequest { Id = request.Id }).Result;
                return new SuccessResult(resulImageSolution.PrepareRedisMessage());


                //todo:#MS_DUZENLEMESI   
                // Bu entity için düzenleme burada yapýlamaz 
                throw new Exception("Yazýlýmsal düzenleme yapýlmasý");

                //var fileRecord = await _repository.GetAsync(w => w.Id == request.Id);
                //if (fileRecord == null)
                //    return new ErrorResult(Messages.RecordIsNotFound);
                //var deleteFileResult = _fileService.DeleteFile(fileRecord.FilePath);
                //if (!deleteFileResult.Success)
                //{
                //    return deleteFileResult;
                //}
                //var entityToDelete = _repository.Get(p => p.Id == request.Id);
                //_repository.Delete(entityToDelete);
                //await _repository.SaveChangesAsync();
                //return new SuccessResult(Messages.Deleted);
            }
        }
    }
}


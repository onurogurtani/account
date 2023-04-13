using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Core.Utilities.File;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.Commands
{
    public class DeleteAvatarFileCommand : IRequest<IResult>
    {
        public long Id { get; set; }
        public class DeleteAvatarFileCommandHandler : IRequestHandler<DeleteAvatarFileCommand, IResult>
        {

            private readonly IFileService _fileService;
          //  private readonly IFileRepository _repository;

            public DeleteAvatarFileCommandHandler(  IFileService fileService)
            {
              //  _repository = repository;
                _fileService = fileService;
            }

            public async Task<IResult> Handle(DeleteAvatarFileCommand request, CancellationToken cancellationToken)
            {
                //todo:#MS_DUZENLEMESI   
                // Bu entity i�in d�zenleme burada yap�lamaz 
                throw new Exception("Yaz�l�msal d�zenleme yap�lmas�");

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


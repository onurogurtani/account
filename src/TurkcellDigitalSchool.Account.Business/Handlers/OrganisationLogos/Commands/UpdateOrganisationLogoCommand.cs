using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Utilities.File;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationLogos.Commands
{
    public class UpdateOrganisationLogoCommand : IRequest<Core.Utilities.Results.IResult>
    {
        public long Id { get; set; }
        public IFormFile Image { get; set; }
        public string FileName { get; set; }


        public class UpdateOrganisationLogoCommandHandler : IRequestHandler<UpdateOrganisationLogoCommand, Core.Utilities.Results.IResult>
        {
         //   private readonly IFileRepository _fileRepository;
            private readonly IFileService _fileService;
            private readonly IPathHelper _pathHelper;

            private readonly string _filePath = "OrganisationLogo";
            public UpdateOrganisationLogoCommandHandler( IFileService fileService, IPathHelper pathHelper)
            {
              // _fileRepository = fileRepository;
                _fileService = fileService;
                _pathHelper = pathHelper;
            }

            [SecuredOperation] 
            public async Task<Core.Utilities.Results.IResult> Handle(UpdateOrganisationLogoCommand request, CancellationToken cancellationToken)
            {
                string[] logoType = new string[] { "image/jpeg", "image/png" };

                if (!logoType.Contains(request.Image.ContentType))
                {
                    return new ErrorResult(Messages.FileTypeError);
                }
                if (request.Image.Length > 5000000)
                {
                    return new ErrorResult(Messages.FileSizeError);
                }



                //todo:#MS_DUZENLEMESI   
                // Bu entity için düzenleme burada yapýlamaz Servis entegrasyonu kullanýlmalý      IFileServices    yada bu iþlem Direk File MS de yapýlmalý
                throw new Exception("Yazýlýmsal düzenleme yapýlmasý");

                //var fileRecord = await _fileRepository.GetAsync(w => w.Id == request.Id);

                //if (fileRecord == null)
                //{
                //    return new ErrorResult(Messages.RecordIsNotFound);
                //}

                //var path = _pathHelper.GetPath(_filePath);


                //var fileSaveResult = await _fileService.SaveFile(new SaveFileRequest
                //{
                //    File = request.Image,
                //    Path = path,
                //    FileName = fileRecord.FileName
                //});

                //fileRecord.FilePath = fileSaveResult.Data;
                //fileRecord.FileName = request.FileName;
                //fileRecord.FileType = FileType.OrganisationLogo;
                //fileRecord.ContentType = request.Image.ContentType;

                //await _fileRepository.SaveChangesAsync();

                //return new SuccessResult(Messages.Updated);
            }
        }
    }
}


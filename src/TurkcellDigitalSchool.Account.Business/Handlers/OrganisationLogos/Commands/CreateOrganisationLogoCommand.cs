using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationLogos.ValidationRules;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.File;
using TurkcellDigitalSchool.Core.Utilities.File.Model;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Enums;
using TurkcellDigitalSchool.File.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationLogos.Commands
{
    public class CreateOrganisationLogoCommand : IRequest<Core.Utilities.Results.IResult>
    {
        public IFormFile Image { get; set; }
        public string FileName { get; set; }

        public class CreateOrganisationLogoCommandHandler : IRequestHandler<CreateOrganisationLogoCommand, Core.Utilities.Results.IResult>
        {
            private readonly IFileRepository _fileRepository;
            private readonly IFileService _fileService;
            private readonly IPathHelper _pathHelper;

            private readonly string _filePath = "OrganisationLogo";

            public CreateOrganisationLogoCommandHandler(IFileRepository fileRepository, IFileService fileService, IPathHelper pathHelper)
            {
                _fileRepository = fileRepository;
                _fileService = fileService;
                _pathHelper = pathHelper;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(CreateOrganisationLogoValidator), Priority = 2)]
            public async Task<Core.Utilities.Results.IResult> Handle(CreateOrganisationLogoCommand request, CancellationToken cancellationToken)
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

                var fullPath = _pathHelper.GetPath(_filePath);
                var saveFileResult = await _fileService.SaveFile(new SaveFileRequest { File = request.Image, Path = fullPath });
                if (!saveFileResult.Success)
                {
                    return new ErrorResult(saveFileResult.Message);
                }

                var record = _fileRepository.Add(new Entities.Concrete.File()
                {
                    FileType = FileType.OrganisationLogo,
                    FilePath = saveFileResult.Data,
                    FileName = request.FileName,
                    ContentType = request.Image.ContentType
                });

                await _fileRepository.SaveChangesAsync();

                return new SuccessDataResult<long>(record.Id, Messages.SuccessfulOperation);
            }
        }
    }
}


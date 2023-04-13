using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.File;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos;
using TurkcellDigitalSchool.Entities.Enums;
using TurkcellDigitalSchool.File.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.Queries
{
    public class GetAvatarFilesQuery : IRequest<IDataResult<PagedList<AvatarFilesDto>>>
    {
        public PaginationQuery PaginationQuery { get; set; }
        public class GetAvatarFilesQueryHandler : IRequestHandler<GetAvatarFilesQuery, IDataResult<PagedList<AvatarFilesDto>>>
        {
            private readonly IFileRepository _fileRepository;
            private readonly IFileService _fileService;
            private readonly IMapper _mapper;
            public GetAvatarFilesQueryHandler(IMapper mapper, IFileService fileService, IFileRepository fileRepository)
            {
                _fileRepository = fileRepository;
                _fileService = fileService;
                _mapper = mapper;
            }

            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<PagedList<AvatarFilesDto>>> Handle(GetAvatarFilesQuery request, CancellationToken cancellationToken)
            {
                var query = _fileRepository.Query().Where(x => x.FileType == FileType.Avatar);

                var files = await _fileRepository.GetPagedListAsync(query, request.PaginationQuery);
                var dtoList = _mapper.Map<List<TurkcellDigitalSchool.Entities.Concrete.File>, List<AvatarFilesDto>>(files.Items);

                foreach (var item in dtoList)
                {
                    var fileResult = await _fileService.GetFile(item.FilePath);
                    item.Image = fileResult.Data;
                }
                //dtoList.ForEach(async x => {
                //    var image = await _fileService.GetFile(x.FilePath);
                //    x.Image = image.Data;
                //});

                var pagedList = new PagedList<AvatarFilesDto>(dtoList.ToList(), files.Items.Count(), request.PaginationQuery.PageNumber, request.PaginationQuery.PageSize);

                return new SuccessDataResult<PagedList<AvatarFilesDto>>(pagedList);


            }
        }
    }
}
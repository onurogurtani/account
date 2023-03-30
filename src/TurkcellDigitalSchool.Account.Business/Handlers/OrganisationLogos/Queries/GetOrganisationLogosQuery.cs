using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Utilities.File;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos;
using TurkcellDigitalSchool.Entities.Enums;
using TurkcellDigitalSchool.File.DataAccess.Abstract;
using File = TurkcellDigitalSchool.Entities.Concrete.File;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationLogos.Queries
{
    public class GetOrganisationLogosQuery : IRequest<IDataResult<PagedList<OrganisationLogosDto>>>
    {
        public PaginationQuery PaginationQuery { get; set; }
        public class GetOrganisationLogosQueryHandler : IRequestHandler<GetOrganisationLogosQuery, IDataResult<PagedList<OrganisationLogosDto>>>
        {
            private readonly IFileRepository _fileRepository;
            private readonly IFileService _fileService;
            private readonly IMapper _mapper;
            public GetOrganisationLogosQueryHandler(IMapper mapper, IFileService fileService, IFileRepository fileRepository)
            {
                _fileRepository = fileRepository;
                _fileService = fileService;
                _mapper = mapper;
            }

            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<PagedList<OrganisationLogosDto>>> Handle(GetOrganisationLogosQuery request, CancellationToken cancellationToken)
            {
                var query = _fileRepository.Query().Where(x => x.FileType == FileType.OrganisationLogo);

                var files = await _fileRepository.GetPagedListAsync(query, request.PaginationQuery);
                var dtoList = _mapper.Map<List<Entities.Concrete.File>, List<OrganisationLogosDto>>(files.Items);

                foreach (var item in dtoList)
                {
                    var fileResult = await _fileService.GetFile(item.FilePath);
                    item.Image = fileResult.Data;
                }
                
                var pagedList = new PagedList<OrganisationLogosDto>(dtoList.ToList(), files.Items.Count(), request.PaginationQuery.PageNumber, request.PaginationQuery.PageSize);

                return new SuccessDataResult<PagedList<OrganisationLogosDto>>(pagedList);


            }
        }
    }
}
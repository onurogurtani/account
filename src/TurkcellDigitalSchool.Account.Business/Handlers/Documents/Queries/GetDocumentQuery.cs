using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.Queries
{
    /// <summary>
    /// Get DocumentDto
    /// </summary>
    [LogScope]
    [SecuredOperation]
    public class GetDocumentQuery : IRequest<DataResult<DocumentDto>>
    {
        public long Id { get; set; }

        public class GetDocumentQueryHandler : IRequestHandler<GetDocumentQuery, DataResult<DocumentDto>>
        {
            private readonly IDocumentRepository _documentRepository;
            private readonly IMapper _mapper;
            private readonly IUserRepository _userRepository;

            public GetDocumentQueryHandler(IUserRepository userRepository, IDocumentRepository documentRepository, IMapper mapper)

            {
                _documentRepository = documentRepository;
                _userRepository = userRepository;
                _mapper = mapper;
            }
 
            public virtual async Task<DataResult<DocumentDto>> Handle(GetDocumentQuery request, CancellationToken cancellationToken)
            {
                var query = _documentRepository.Query()
                   .Include(x => x.ContractTypes).ThenInclude(x => x.ContractType)
                   .Include(x => x.ContractKind)
                    .AsQueryable();


                var record = await query.FirstOrDefaultAsync(x => x.Id == request.Id);

                if (record == null)
                    return new ErrorDataResult<DocumentDto>(null, Messages.RecordIsNotFound);


                var dto = _mapper.Map<DocumentDto>(record);

                if (dto.UpdateUserId != null)
                    dto.UpdateUserFullName = _userRepository.Get(x => x.Id == (long)dto.UpdateUserId)?.NameSurname;
                if (dto.InsertUserId != null)
                    dto.InsertUserFullName = _userRepository.Get(x => x.Id == (long)dto.InsertUserId)?.NameSurname;


                return new SuccessDataResult<DocumentDto>(dto, Messages.Deleted); 
            }
        } 
    }
}
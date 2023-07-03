using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using AutoMapper;
using System.Linq;
using TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GreetingMessages.Commands
{
    [LogScope]
    [SecuredOperationScope]
    public class CreateGreetingMessageCommand : IRequest<DataResult<GreetingMessageDto>>
    {
        public GreetingMessage Entity { get; set; }

        [MessageClassAttr("Karşılama Mesajı Oluþtur")]
        public class CreateGreetingMessageCommandHandler : IRequestHandler<CreateGreetingMessageCommand, DataResult<GreetingMessageDto>>
        {
            private readonly IGreetingMessageRepository _greetingMessageRepository;
            private readonly IFileRepository _fileRepository;
            private readonly IMapper _mapper;
            public CreateGreetingMessageCommandHandler(IGreetingMessageRepository greetingMessageRepository, IMapper mapper, IFileRepository fileRepository)
            {
                _greetingMessageRepository = greetingMessageRepository;
                _mapper = mapper;
                _fileRepository = fileRepository;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            public static string Added = Messages.Added;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string GreetingMessageDateConflict = Constants.Messages.GreetingMessageDateConflict;
            public async Task<DataResult<GreetingMessageDto>> Handle(CreateGreetingMessageCommand request, CancellationToken cancellationToken)
            {
                if (request.Entity.HasDateRange)
                {
                    var isDateConflict = _greetingMessageRepository.Query()
                                          .Where(w => w.HasDateRange && w.RecordStatus == RecordStatus.Active & !w.IsDeleted)
                                          .Where(w =>
                                                    (w.StartDate >= request.Entity.StartDate && w.StartDate < request.Entity.EndDate) ||
                                                    (w.EndDate > request.Entity.StartDate && w.EndDate <= request.Entity.EndDate) ||
                                                    (request.Entity.StartDate >= w.StartDate && request.Entity.StartDate < w.EndDate) ||
                                                    (request.Entity.EndDate > w.StartDate && request.Entity.EndDate <= w.EndDate)
                                                 )
                                          .Any();

                    if (isDateConflict)
                        return new ErrorDataResult<GreetingMessageDto>(GreetingMessageDateConflict.PrepareRedisMessage());
                }
                _greetingMessageRepository.Add(request.Entity);
                await _greetingMessageRepository.SaveChangesAsync();
                
                if (!request.Entity.HasDateRange && request.Entity.RecordStatus == RecordStatus.Active)
                {
                    var list = await _greetingMessageRepository.Query().Where(w => w.Id != request.Entity.Id && !w.HasDateRange && w.Order >= request.Entity.Order && w.RecordStatus == RecordStatus.Active && !w.IsDeleted).OrderBy(o => o.Order).ToListAsync(cancellationToken);
                    uint newOrder = request.Entity.Order.Value + 1;
                    foreach(var item in list) {
                        item.Order = newOrder++;
                        _greetingMessageRepository.Update(item);
                        await _greetingMessageRepository.SaveChangesAsync();
                    }
                }

                GreetingMessageDto dto = new();
                _mapper.Map(request.Entity, dto);
                if(dto.FileId != null && dto.FileId > 0)
                {
                    var entity = _fileRepository.Get(w => w.Id.Equals(dto.FileId));
                    if(entity != null)
                    {
                        dto.FilePath = entity.FilePath;
                    }
                }
                return new SuccessDataResult<GreetingMessageDto>(dto, Added.PrepareRedisMessage());
            }
        }
    }
}
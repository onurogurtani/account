using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using AutoMapper;
using TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Abstract;
using System;

namespace TurkcellDigitalSchool.Exam.Business.Handlers.ParticipantGroups.Queries
{
    /// <summary>
    /// Get Names that using in participantGroups
    /// </summary>
    [LogScope]
    [SecuredOperationScope]
    public class GetGreetingMessagesOnDisplayQuery : IRequest<DataResult<IEnumerable<GreetingMessageDto>>>
    {
        public class GetParticipantGroupNamesQueryHandler : IRequestHandler<GetGreetingMessagesOnDisplayQuery, DataResult<IEnumerable<GreetingMessageDto>>>
        {
            private readonly IGreetingMessageRepository _greetingMessageRepository;
            private readonly IAppSettingRepository _appSettingRepository;
            private readonly IMapper _mapper;
            private readonly IFileRepository _fileRepository;

            public GetParticipantGroupNamesQueryHandler(IGreetingMessageRepository greetingMessageRepository, IMapper mapper, IFileRepository fileRepository, IAppSettingRepository appSettingRepository)
            {
                _greetingMessageRepository = greetingMessageRepository;
                _appSettingRepository = appSettingRepository;
                _mapper = mapper;
                _fileRepository = fileRepository;
                _appSettingRepository = appSettingRepository;
            }

            public async Task<DataResult<IEnumerable<GreetingMessageDto>>> Handle(GetGreetingMessagesOnDisplayQuery request, CancellationToken cancellationToken)
            {
                List<GreetingMessageDto> list = new();
                var today = System.DateTime.Today;
                
                var entity = await _greetingMessageRepository.GetAsync(w => w.HasDateRange && w.StartDate <= today && w.EndDate > today && w.RecordStatus == Core.Enums.RecordStatus.Active && !w.IsDeleted);

                if (entity == null)
                {
                    entity = await _greetingMessageRepository.GetAsync(w => !w.HasDateRange && w.StartDate <= today && w.EndDate > today && w.RecordStatus == Core.Enums.RecordStatus.Active && !w.IsDeleted);
                    if (entity == null)
                    {
                        if (_appSettingRepository.Query().Any(x => x.Code == "GMS" && x.Value == "1"))
                        {
                            var query = _greetingMessageRepository.Query()
                                .Where(w => !w.HasDateRange && w.StartDate == null && w.RecordStatus == Core.Enums.RecordStatus.Active && !w.IsDeleted);
                            int randomMessageNumber = new Random().Next(query.Count());
                            entity = query.Skip(randomMessageNumber).Take(1).FirstOrDefault();
                        }
                        else
                        {
                            entity = await _greetingMessageRepository.Query().Where(w => !w.HasDateRange && w.StartDate == null && w.RecordStatus == Core.Enums.RecordStatus.Active && !w.IsDeleted).OrderBy(o => o.Order).FirstOrDefaultAsync();
                        }

                        if (entity != null)
                        {
                            entity.StartDate = today;
                            entity.EndDate = today.AddDays(entity.DayCount.Value);
                            await _greetingMessageRepository.UpdateAndSaveAsync(entity);
                        }
                    }
                }

                if (entity != null)
                {
                    GreetingMessageDto dto = new();
                    _mapper.Map(entity, dto);
                    if (dto.FileId != null && dto.FileId > 0)
                    {
                        var fileEntity = _fileRepository.Get(w => w.Id.Equals(dto.FileId));
                        if (fileEntity != null)
                        {
                            dto.FilePath = fileEntity.FilePath;
                        }
                    }
                    list.Add(dto);
                }

                return new SuccessDataResult<IEnumerable<GreetingMessageDto>>(list);
            }
        }

    }
}
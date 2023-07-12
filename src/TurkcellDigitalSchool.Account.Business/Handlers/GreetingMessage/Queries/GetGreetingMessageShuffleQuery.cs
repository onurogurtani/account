using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
 
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GreetingMessages.Queries
{
    public class GreetingMessageShuffleDto
    {
        public bool Shuffle { get; set; }
    }

    /// <summary>
    /// Get GreetingMessageShuffleDto
    /// </summary>
    [LogScope]
    [SecuredOperationScope]
    public class GetGreetingMessageShuffleQuery : IRequest<DataResult<GreetingMessageShuffleDto>>
    {
        public class GetGreetingMessageShuffleQueryHandler : IRequestHandler<GetGreetingMessageShuffleQuery, DataResult<GreetingMessageShuffleDto>>
        {
            private readonly IAppSettingRepository _appSettingRepository;

            public GetGreetingMessageShuffleQueryHandler(IAppSettingRepository appSettingRepository)
            {
                _appSettingRepository = appSettingRepository;
            }
 
            public virtual async Task<DataResult<GreetingMessageShuffleDto>> Handle(GetGreetingMessageShuffleQuery request, CancellationToken cancellationToken)
            {
                return new SuccessDataResult<GreetingMessageShuffleDto>(new GreetingMessageShuffleDto { Shuffle = (await _appSettingRepository.Query().AnyAsync(x => x.Code == "GMS" && x.Value == "1", cancellationToken)) });
            }
        } 
    }
}
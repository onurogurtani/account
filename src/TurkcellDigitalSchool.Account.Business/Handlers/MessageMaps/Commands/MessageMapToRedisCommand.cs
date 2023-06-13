using MediatR;
using StackExchange.Redis;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.MessageMaps.Commands
{
    [ExcludeFromCodeCoverage]
    public class MessageMapToRedisCommand : IRequest<IResult>
    {
        [MessageClassAttr("Mesajlarý Redise Aktarma")]
        public class MessageMapToRedisCommandHandler : IRequestHandler<MessageMapToRedisCommand, IResult>
        {
            private readonly IMessageMapRepository _messageMapRepository;
            private readonly RedisService _redisService;

            public MessageMapToRedisCommandHandler(IMessageMapRepository messageMapRepository, RedisService redisService)
            {
                _messageMapRepository = messageMapRepository;
                _redisService = redisService;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public async Task<IResult> Handle(MessageMapToRedisCommand request, CancellationToken cancellationToken)
            {
                if (!_redisService.IsConnect())
                {
                    return new ErrorResult(Messages.UnableToConnectToRedis);
                }
                var hashArray = _messageMapRepository.GetListAsync().Result
                        .Select(s => new HashEntry(
                            s.MessageKey + s.UsedClass,
                            s.UserFriendlyNameOfMessage ?? s.Message))
                        .ToArray();
                await _redisService.GetDb(CachingConstants.MessagesDb).HashSetAsync("message", hashArray);
               
                return new SuccessResult(Messages.SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}
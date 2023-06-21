using MediatR;
using StackExchange.Redis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.MessageMaps.Commands
{
    public class UpdateMessageMapCommand : IRequest<IResult>
    {
        public long Id { get; set; }
        public string Message { get; set; }
        public class UpdateMessageMapCommandHandler : IRequestHandler<UpdateMessageMapCommand, IResult>
        {
            private readonly IMessageMapRepository _messageMapRepository;
            private readonly RedisService _redisService;

            public UpdateMessageMapCommandHandler(IMessageMapRepository messageMapRepository, RedisService redisService)
            {
                _messageMapRepository = messageMapRepository;
                _redisService = redisService;
            }
            public async Task<IResult> Handle(UpdateMessageMapCommand request, CancellationToken cancellationToken)
            {/*
                if (!_redisService.IsConnect())
                {
                    return new ErrorResult(Messages.UnableToConnectToRedis);
                }*/

                var entity = _messageMapRepository.Get(x => x.Id == request.Id);
                if (entity != null)
                {
                    entity.UserFriendlyNameOfMessage = request.Message;
                    _messageMapRepository.Update(entity);
                    await _messageMapRepository.SaveChangesAsync();

                    var hashArray = _messageMapRepository.GetListAsync().Result
                        .Select(s => new HashEntry(
                            s.MessageKey + s.UsedClass,
                            s.UserFriendlyNameOfMessage ?? s.Message))
                        .ToArray();
                    await _redisService.GetDb(CachingConstants.MessagesDb).HashSetAsync("message", hashArray);

                    return new SuccessResult(Messages.Updated);
                }
                return new ErrorResult(Messages.RecordIsNotFound);
            }
        }
    }
}
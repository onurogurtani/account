using MediatR;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.MessageTypes.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Services.CustomMessgeHelperService.Model;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.MessageHandler.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateMessageCommand : IRequest<IResult>
    {
        public List<ConstantMessageDtos> ConstantMessageDtos { get; set; }

        [MessageClassAttr("Message Oluþturma")]
        public class CreateMessageCommandHandler : IRequestHandler<CreateMessageCommand, IResult>
        {
            private readonly IMessageRepository _messageRepository;
            private readonly IMessageTypeRepository _messageTypeRepository;
            private readonly IMediator _mediator;

            public CreateMessageCommandHandler(IMessageRepository messageRepository, IMessageTypeRepository messageTypeRepository, IMediator mediator)
            {
                _messageRepository = messageRepository;
                _messageTypeRepository = messageTypeRepository;
                _mediator = mediator;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            public async Task<IResult> Handle(CreateMessageCommand request, CancellationToken cancellationToken)
            {
                var createMessageType = await _mediator.Send(new CreateMessageTypeCommand(), cancellationToken);
                if (!createMessageType.Success)
                {
                    return new ErrorResult(Messages.UnableToProccess);
                }

                if (request.ConstantMessageDtos.Count == 0)
                {
                    return new ErrorResult(Messages.RecordIsNotFound.PrepareRedisMessage());
                }

                foreach (var item in request.ConstantMessageDtos)
                {
                    foreach (var itemMessageDetail in item.Messages)
                    {
                        var entity = _messageRepository.Get(x => x.MessageKey == itemMessageDetail.MessageKey && x.UsedClass == item.UsedClass);
                        if (entity == null)
                        {
                            var messageType = _messageTypeRepository.GetAsync(w=>w.Code == ((MessageCodeType)itemMessageDetail.MessageCodeType).DescriptionAttr().ToString()).Result;

                            var messageEntity = new  Message
                            {
                                UsedClass = item.UsedClass,
                                MessageKey = itemMessageDetail.MessageKey,
                                MessageTypeId = messageType.Id,
                                MessageNumber = messageType.Count + 1
                            };
                            _messageRepository.Add(messageEntity);
                            await _messageRepository.SaveChangesAsync();

                            messageType.Count++;
                            _messageTypeRepository.Update(messageType);
                            await _messageTypeRepository.SaveChangesAsync();
                        }
                    }
                }

                return new SuccessResult(Messages.SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}
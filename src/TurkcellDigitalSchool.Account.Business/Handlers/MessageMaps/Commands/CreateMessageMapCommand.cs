using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.MessageHandler.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Services.CustomMessgeHelperService.Model;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.MessageMaps.Commands
{
    [ExcludeFromCodeCoverage]
    [TransactionScope]
    public class CreateMessageMapCommand : IRequest<IResult>
    {
        public List<ConstantMessageDtos> ConstantMessageDtos { get; set; }

        [MessageClassAttr("Message Map Oluþturma")]
        public class CreateMessageMapCommandHandler : IRequestHandler<CreateMessageMapCommand, IResult>
        {
            private readonly IMessageMapRepository _messageMapRepository;
            private readonly IMessageRepository _messageRepository;
            private readonly IMapper _mapper;
            private readonly IMediator _mediator;

            public CreateMessageMapCommandHandler(IMessageMapRepository messageMapRepository, IMessageRepository messageRepository, IMapper mapper, IMediator mediator)
            {
                _messageMapRepository = messageMapRepository;
                _messageRepository = messageRepository;
                _mapper = mapper;
                _mediator = mediator;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static readonly string SuccessfulOperation = Messages.SuccessfulOperation;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            public async Task<IResult> Handle(CreateMessageMapCommand request, CancellationToken cancellationToken)
            {
                var createMessage = await _mediator.Send(new CreateMessageCommand { ConstantMessageDtos = request.ConstantMessageDtos }, cancellationToken);
                if (createMessage.Success == false)
                    return new ErrorResult(Messages.UnableToProccess);

                if (request.ConstantMessageDtos.Count == 0)
                {
                    return new ErrorResult(Messages.RecordIsNotFound);
                }

                foreach (var item in request.ConstantMessageDtos)
                {
                    foreach (var itemMessageDetail in item.Messages)
                    {
                        var entity = _messageMapRepository.Get(x => x.MessageKey == itemMessageDetail.MessageKey && x.UsedClass == item.UsedClass);
                        if (entity != null)
                        {
                            var requestParamCount = NumberOfParametersOfTheMessage(itemMessageDetail.Message);
                            var entityParamCount = NumberOfParametersOfTheMessage(entity.Message);

                            if (requestParamCount == 0 || requestParamCount == entityParamCount)
                            {
                                entity.Message = itemMessageDetail.Message;
                                entity.MessageParameters = string.Join(" ", itemMessageDetail.MessageParameters);
                            }
                            else
                            {
                                entity.OldVersionOfUserFriendlyMessage = entity.UserFriendlyNameOfMessage;
                                entity.Message = itemMessageDetail.Message;
                                entity.UserFriendlyNameOfMessage = null;
                                entity.MessageParameters = string.Join(" ", itemMessageDetail.MessageParameters);
                            }

                            _messageMapRepository.Update(entity);
                            await _messageMapRepository.SaveChangesAsync();
                        }
                        else
                        {
                            var messageMapItem = _mapper.Map<ConstantMessageDtos, MessageMap>(item);
                            messageMapItem.Code = GenerateCodeAsync(itemMessageDetail.MessageKey, item.UsedClass).Result;
                            messageMapItem.Message = itemMessageDetail.Message;
                            messageMapItem.MessageKey = itemMessageDetail.MessageKey;
                            messageMapItem.MessageParameters = string.Join(" ", itemMessageDetail.MessageParameters);
                            messageMapItem.DefaultNameOfUsedClass = item.DefaultNameOfUsedClass;
                            _messageMapRepository.Add(messageMapItem);
                            await _messageMapRepository.SaveChangesAsync();
                        }
                    }
                }
                return new SuccessResult(Messages.SuccessfulOperation);
            }

            private async Task<string> GenerateCodeAsync(string messageKey, string usedClass)
            {
                var entity = await _messageRepository.Query()
                    .Where(w => w.MessageKey == messageKey && w.UsedClass == usedClass)
                    .Include(x => x.MessageType)
                    .FirstOrDefaultAsync();
                return entity.MessageType.Code + entity.MessageNumber.ToString().PadLeft(4, '0');
            }
        }

        private static int NumberOfParametersOfTheMessage(string message)
        {
            var paramList = Array.FindAll(message.Split(" "), s => s.Length >= 3 & s.StartsWith("{") & s.EndsWith("}"));
            return Array.FindAll(paramList, s => int.TryParse(s.AsSpan(1, s.Length - 2), out int output) == true).Length;
        }
    }
}
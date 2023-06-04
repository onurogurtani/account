using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.MessageTypes.Commands
{
    /// <summary>
    /// Create MessageType
    /// </summary>
    [TransactionScope]
    public class CreateMessageTypeCommand : IRequest<IResult>
    {
        public class CreateMessageTypeCommandHandler : IRequestHandler<CreateMessageTypeCommand, IResult>
        {
            private readonly IMessageTypeRepository _messageTypeRepository;

            public CreateMessageTypeCommandHandler(IMessageTypeRepository MessageTypeRepository)
            {
                _messageTypeRepository = MessageTypeRepository;
            }

            public async Task<IResult> Handle(CreateMessageTypeCommand request, CancellationToken cancellationToken)
            {
                var items = ((MessageCodeType[])Enum.GetValues(typeof(MessageCodeType)))
                                .Select(x => new MessageType
                                {
                                    Name = Convert.ToString(x),
                                    Code = x.DescriptionAttr().ToString()
                                }).ToList();

                foreach (var item in items)
                {
                    if (_messageTypeRepository.Query().Any(q => q.Code == item.Code)) { continue; }
                    _messageTypeRepository.Add(new MessageType()
                    {
                        Name = item.Name,
                        Code = item.Code
                    });
                    await _messageTypeRepository.SaveChangesAsync();
                }
                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }
    }
}


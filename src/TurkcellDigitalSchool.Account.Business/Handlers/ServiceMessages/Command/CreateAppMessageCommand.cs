using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.MessageMaps.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Services.CustomMessgeHelperService;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ServiceMessages.Command
{
    public class CreateAppMessageCommand : IRequest<IResult>
    {
        [MessageClassAttr("App Mesaj Oluşturma")]
        public class CreateAppMessageCommandHandler : IRequestHandler<CreateAppMessageCommand, IResult>
        {
            private readonly ICustomMessgeHelperService _customMessgeHelperService;
            private readonly IMediator _mediator;

            public CreateAppMessageCommandHandler(ICustomMessgeHelperService customMessgeHelperService, IMediator mediator)
            {
                _customMessgeHelperService = customMessgeHelperService;
                _mediator = mediator;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string UnableToProccess = Messages.UnableToProccess;

            public async Task<IResult> Handle(CreateAppMessageCommand request, CancellationToken cancellationToken)
            {
                var getAllMessage = _customMessgeHelperService.GetAllMessageDeclarations();
                if (getAllMessage.Count <= 0)
                    return new ErrorResult(UnableToProccess.PrepareRedisMessage());

                var result = await _mediator.Send(new CreateMessageMapCommand
                {
                    ConstantMessageDtos = getAllMessage

                }, cancellationToken);

                if (result.Success == true)
                    return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());

                return new ErrorResult(UnableToProccess.PrepareRedisMessage());
            }
        }
    }
}
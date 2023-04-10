using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Services.CustomMessgeHelperService;
using TurkcellDigitalSchool.Core.Services.CustomMessgeHelperService.Model;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ServiceMessages.Queries
{
    public class GetAppMessagesQuery : IRequest<IDataResult<List<ConstantMessageDtos>>>
    {
        [MessageClassAttr("App Mesaj Oluşturma")]
        public class GetAppMessagesQueryHandler : IRequestHandler<GetAppMessagesQuery, IDataResult<List<ConstantMessageDtos>>>
        {
            private readonly ICustomMessgeHelperService _customMessgeHelperService;

            public GetAppMessagesQueryHandler(ICustomMessgeHelperService customMessgeHelperService)
            {
                _customMessgeHelperService = customMessgeHelperService;
            }

            [MessageConstAttr(MessageCodeType.Success)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [MessageConstAttr(MessageCodeType.Error)]
            private static string UnableToProccess = Messages.UnableToProccess;
            public async Task<IDataResult<List<ConstantMessageDtos>>> Handle(GetAppMessagesQuery request, CancellationToken cancellationToken)
            {
                var getAllMessage = _customMessgeHelperService.GetAllMessageDeclarations();
                if (getAllMessage.Count <= 0)
                    return new ErrorDataResult<List<ConstantMessageDtos>>(Messages.UnableToProccess);

                return new SuccessDataResult<List<ConstantMessageDtos>>(getAllMessage, Messages.SuccessfulOperation);
            }
        }
    }
}
﻿using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
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

            [MessageConstAttr(MessageCodeType.Error)]
            private static string UnableToProccess = Messages.UnableToProccess;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            public async Task<IDataResult<List<ConstantMessageDtos>>> Handle(GetAppMessagesQuery request, CancellationToken cancellationToken)
            {
                var getAllMessage = _customMessgeHelperService.GetAllMessageDeclarations();
                if (getAllMessage.Count <= 0)
                    return new ErrorDataResult<List<ConstantMessageDtos>>(UnableToProccess.PrepareRedisMessage());

                return new SuccessDataResult<List<ConstantMessageDtos>>(getAllMessage, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}
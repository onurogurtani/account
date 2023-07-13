using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using System.Collections.Generic;
using DocumentFormat.OpenXml.Office2010.ExcelAc;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    [LogScope]

    public class AcceptContractCommand : IRequest<IResult>
    {
        public List<long> Ids { get; set; }

        [MessageClassAttr("Kullanıcı Profil Sözleşme Kabul/Ret Güncelleme")]
        public class AcceptContractCommandHandler : IRequestHandler<AcceptContractCommand, IResult>
        {
            private readonly IUserContratRepository _userContratRepository;
            private readonly ITokenHelper _tokenHelper;
            public AcceptContractCommandHandler(IUserContratRepository userContratRepository, ITokenHelper tokenHelper)
            {
                _userContratRepository = userContratRepository;
                _tokenHelper = tokenHelper;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;

            public async Task<IResult> Handle(AcceptContractCommand request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();
                var existUserContractList = _userContratRepository.Query().Where(w => request.Ids.Contains(w.Id) && w.UserId == userId).ToList();
                if (existUserContractList.Count == 0)
                {
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());
                }

                existUserContractList.ForEach(w => { w.IsAccepted = true; w.AcceptedDate = DateTime.Now; });
                _userContratRepository.UpdateAndSave(existUserContractList);

                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

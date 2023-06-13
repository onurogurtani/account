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

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands
{
    [LogScope]
    [SecuredOperationScope]
    public class AcceptStudentContractCommand : IRequest<IResult>
    {
        public long Id { get; set; }

        [MessageClassAttr("Öğrenci Profil Sözleşme Kabul/Ret Güncelleme")]
        public class AcceptStudentContractCommandHandler : IRequestHandler<AcceptStudentContractCommand, IResult>
        {
            private readonly IUserContratRepository _userContratRepository;
            private readonly ITokenHelper _tokenHelper;
            public AcceptStudentContractCommandHandler(IUserContratRepository userContratRepository, ITokenHelper tokenHelper)
            {
                _userContratRepository = userContratRepository;
                _tokenHelper = tokenHelper;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;

            public async Task<IResult> Handle(AcceptStudentContractCommand request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();
                var existUserContract = _userContratRepository.Query().Where(w => w.Id == request.Id && w.UserId == userId).FirstOrDefault();
                if (existUserContract == null)
                {
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());
                }

                existUserContract.IsAccepted = true;
                existUserContract.AcceptedDate = DateTime.Now;

                _userContratRepository.UpdateAndSave(existUserContract);

                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

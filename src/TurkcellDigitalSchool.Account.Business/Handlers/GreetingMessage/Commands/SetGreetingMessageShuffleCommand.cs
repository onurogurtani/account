using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GreetingMessages.Commands
{
    [LogScope]
    [SecuredOperationScope]
    public class SetGreetingMessageShuffleCommand : IRequest<IResult>
    {
        public bool Shuffle { get; set; }
        public class SetGreetingMessageShuffleCommandHandler : IRequestHandler<SetGreetingMessageShuffleCommand, IResult>
        {
            private readonly IAppSettingRepository _appSettingRepository;

            public SetGreetingMessageShuffleCommandHandler(IAppSettingRepository appSettingRepository)
            {
                _appSettingRepository = appSettingRepository;
            }
             
            public async Task<IResult> Handle(SetGreetingMessageShuffleCommand request, CancellationToken cancellationToken)
            {

                var entity = await _appSettingRepository.Query()
                    .Where(x => x.Code == "GMS").FirstOrDefaultAsync(cancellationToken);

                if (entity == null)
                {
                    var newRecord = new AppSetting
                    {
                        Value = request.Shuffle ? "1" : "0",
                        RecordStatus = RecordStatus.Active,
                        Code = "GMS"
                    };
                    await _appSettingRepository.CreateAndSaveAsync(newRecord);
                }
                else
                {
                    entity.Value = request.Shuffle ? "1" : "0";
                    await _appSettingRepository.UpdateAndSaveAsync(entity);
                }

                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }


    }
}

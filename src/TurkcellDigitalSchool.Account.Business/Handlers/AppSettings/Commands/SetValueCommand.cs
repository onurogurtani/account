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
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Commands
{
    [LogScope]
    [SecuredOperationScope]
    public class SetValueCommand : IRequest<IResult>
    {
        public string Code { get; set; }
        public string Value { get; set; }
        public class SetValueCommandHandler : IRequestHandler<SetValueCommand, IResult>
        {
            private readonly IAppSettingRepository _appSettingRepository;

            public SetValueCommandHandler(IAppSettingRepository appSettingRepository)
            {
                _appSettingRepository = appSettingRepository;
            }
             
            public async Task<IResult> Handle(SetValueCommand request, CancellationToken cancellationToken)
            {

                var entity = await _appSettingRepository.Query()
                    .Where(x => x.Code == request.Code).FirstOrDefaultAsync(cancellationToken);

                if (entity == null)
                {
                    var newRecord = new AppSetting
                    {
                        Value = request.Value,
                        RecordStatus = RecordStatus.Active,
                        Code = request.Code
                    };
                    await _appSettingRepository.CreateAndSaveAsync(newRecord);
                }
                else
                {
                    entity.Value = request.Value;
                    await _appSettingRepository.UpdateAndSaveAsync(entity);
                }

                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }


    }
}

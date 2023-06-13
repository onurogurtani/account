using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Queries
{
    /// <summary>
    /// Get TargetScreen
    /// </summary>
    [LogScope]
    [SecuredOperationScope]
    public class GetTargetScreenQuery : IRequest<DataResult<TargetScreen>>
    {
        public long Id { get; set; }

        [MessageClassAttr("Hedef Ekraný Görüntüleme")]
        public class GetTargetScreenQueryHandler : IRequestHandler<GetTargetScreenQuery, DataResult<TargetScreen>>
        {
            private readonly ITargetScreenRepository _targetScreenRepository;

            public GetTargetScreenQueryHandler(ITargetScreenRepository targetScreenRepository)
            {
                _targetScreenRepository = targetScreenRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string Deleted = Messages.Deleted;
            public virtual async Task<DataResult<TargetScreen>> Handle(GetTargetScreenQuery request, CancellationToken cancellationToken)
            {
                var query = _targetScreenRepository.Query()
                    .AsQueryable();

                var record = await query.FirstOrDefaultAsync(x => x.Id == request.Id);

                if (record == null)
                    return new ErrorDataResult<TargetScreen>(null, RecordIsNotFound.PrepareRedisMessage());

                return new SuccessDataResult<TargetScreen>(record, Deleted.PrepareRedisMessage());
            }
        }
    }
}
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Queries
{
    /// <summary>
    /// Get TargetScreen
    /// </summary>
    public class GetTargetScreenQuery : IRequest<IDataResult<TargetScreen>>
    {
        public long Id { get; set; }

        public class GetTargetScreenQueryHandler : IRequestHandler<GetTargetScreenQuery, IDataResult<TargetScreen>>
        {
            private readonly ITargetScreenRepository _targetScreenRepository;

            public GetTargetScreenQueryHandler(ITargetScreenRepository targetScreenRepository)
            {
                _targetScreenRepository = targetScreenRepository;
            }
             
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public virtual async Task<IDataResult<TargetScreen>> Handle(GetTargetScreenQuery request, CancellationToken cancellationToken)
            {
                var query = _targetScreenRepository.Query()
                    .AsQueryable();


                var record = await query.FirstOrDefaultAsync(x => x.Id == request.Id);

                if (record == null)
                    return new ErrorDataResult<TargetScreen>(null, Messages.RecordIsNotFound);


                return new SuccessDataResult<TargetScreen>(record, Messages.Deleted);

            }
        }

    }
}
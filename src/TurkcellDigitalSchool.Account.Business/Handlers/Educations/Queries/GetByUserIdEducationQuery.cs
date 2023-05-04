using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Transaction;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Educations.Queries
{
    /// <summary>
    /// Get By UserId  Education
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class GetByUserIdEducationQuery : IRequest<IDataResult<Education>>
    {
        public long UserId { get; set; }
        public class GetByUserIdEducationQueryHandler : IRequestHandler<GetByUserIdEducationQuery, IDataResult<Education>>
        {
            private readonly IEducationRepository _educationRepository;

            public GetByUserIdEducationQueryHandler(IEducationRepository educationRepository)
            {
                _educationRepository = educationRepository;
            }

            [LogAspect(typeof(FileLogger))]
            [TransactionScopeAspectAsync]
            public async Task<IDataResult<Education>> Handle(GetByUserIdEducationQuery request, CancellationToken cancellationToken)
            {
                var education = await _educationRepository.GetAsync(x => x.UserId == request.UserId);
                return new SuccessDataResult<Education>(education, Messages.SuccessfulOperation);
            }

        }
    }
}

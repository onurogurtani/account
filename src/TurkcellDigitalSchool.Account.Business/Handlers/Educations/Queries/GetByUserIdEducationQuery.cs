using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Educations.Queries
{
    /// <summary>
    /// Get By UserId  Education
    /// </summary>
    [ExcludeFromCodeCoverage]
    [SecuredOperationScope] 
    [LogScope]
    public class GetByUserIdEducationQuery : IRequest<DataResult<Education>>
    {
        public long UserId { get; set; }
        public class GetByUserIdEducationQueryHandler : IRequestHandler<GetByUserIdEducationQuery, DataResult<Education>>
        {
            private readonly IEducationRepository _educationRepository;

            public GetByUserIdEducationQueryHandler(IEducationRepository educationRepository)
            {
                _educationRepository = educationRepository;
            } 
            public async Task<DataResult<Education>> Handle(GetByUserIdEducationQuery request, CancellationToken cancellationToken)
            {
                var education = await _educationRepository.GetAsync(x => x.UserId == request.UserId);
                return new SuccessDataResult<Education>(education, Messages.SuccessfulOperation);
            }

        }
    }
}

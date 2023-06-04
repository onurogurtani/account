using AutoMapper;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    ///<summary>
    ///Get Filtered Paged Users
    /// </summary>

    [LogScope]
    public class GetUserProfilingStateQuery : IRequest<DataResult<int>>
    {
        public long UserId { get; set; }

        public class GetUserProfilingStateQueryHandler : IRequestHandler<GetUserProfilingStateQuery, DataResult<int>>
        {
            private readonly IUserRepository _userRepository;

            public GetUserProfilingStateQueryHandler(IUserRepository userRepository, IMapper mapper, AccountDbContext accountDbContext)
            {
                _userRepository = userRepository;
            }


            [SecuredOperation]
            public virtual async Task<DataResult<int>> Handle(GetUserProfilingStateQuery request, CancellationToken cancellationToken)
            {
                var user = _userRepository.GetAsync(w => w.Id == request.UserId).Result;
                if (user == null)
                {
                    return new ErrorDataResult<int>(Messages.RecordIsNotFound);
                }
                int profilingState = user.ProfilingState ?? 0;
                return new SuccessDataResult<int>(profilingState);
            }
        }
    }
}
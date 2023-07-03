using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    [ExcludeFromCodeCoverage]
    [LogScope]
    public class GetUserMailsQuery : IRequest<DataResult<IEnumerable<UserMailDto>>>
    {
        public int UserId { get; set; }

        public class GetUserMailsQueryHandler : IRequestHandler<GetUserMailsQuery, DataResult<IEnumerable<UserMailDto>>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IMediator _mediator;

            public GetUserMailsQueryHandler(IUserRepository userRepository,IMediator mediator)
            {
                _userRepository = userRepository;
                _mediator = mediator;
            }

              
            public async Task<DataResult<IEnumerable<UserMailDto>>> Handle(GetUserMailsQuery request, CancellationToken cancellationToken)
            {
                List<UserMailDto> emailList = _userRepository.Query()
                        .Where(x => x.Id == request.UserId)
                        .Select(x => new UserMailDto { Id = x.Id, Email = x.Email })
                        .ToList();
                return new SuccessDataResult<IEnumerable<UserMailDto>>(emailList);
            }
        }
    }
}

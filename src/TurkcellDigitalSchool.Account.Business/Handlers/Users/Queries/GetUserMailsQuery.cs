using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetUserMailsQuery : IRequest<IDataResult<IEnumerable<UserMailDto>>>
    {
        public int UserId { get; set; }

        public class GetUserMailsQueryHandler : IRequestHandler<GetUserMailsQuery, IDataResult<IEnumerable<UserMailDto>>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IMediator _mediator;

            public GetUserMailsQueryHandler(IUserRepository userRepository,IMediator mediator)
            {
                _userRepository = userRepository;
                _mediator = mediator;
            }

            [SecuredOperation(Priority = 1)]
            [LogAspect(typeof(FileLogger))]
            public async Task<IDataResult<IEnumerable<UserMailDto>>> Handle(GetUserMailsQuery request, CancellationToken cancellationToken)
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

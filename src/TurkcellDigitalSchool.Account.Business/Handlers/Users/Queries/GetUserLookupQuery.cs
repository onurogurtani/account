using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    [ExcludeFromCodeCoverage]
    [LogScope]
    public class GetUserLookupQuery : IRequest<DataResult<IEnumerable<SelectionItem>>>
    {
        public class GetUserLookupQueryHandler : IRequestHandler<GetUserLookupQuery, DataResult<IEnumerable<SelectionItem>>>
        {
            private readonly IUserRepository _userRepository;
            public GetUserLookupQueryHandler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }
             
            [CacheAspect(10)] 
            public async Task<DataResult<IEnumerable<SelectionItem>>> Handle(GetUserLookupQuery request, CancellationToken cancellationToken)
            {
                var list = await _userRepository.GetListAsync(x => x.Status);
                var userLookup = list.Select(x => new SelectionItem() { Id = x.Id.ToString(), Label = x.GetFullName() });
                return new SuccessDataResult<IEnumerable<SelectionItem>>(userLookup);
            }
        }
    }
}

using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects; 
using TurkcellDigitalSchool.Core.Behaviors.Atrribute; 
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries
{
    /// <summary>
    /// Get Names that using in Packages
    /// </summary>
    [LogScope]
    public class GetPackageNamesQuery : IRequest<DataResult<List<string>>>
    {
        public class GetPackageNamesQueryHandler : IRequestHandler<GetPackageNamesQuery, DataResult<List<string>>>
        {
            private readonly IPackageRepository _packageRepository;

            public GetPackageNamesQueryHandler(IPackageRepository packageRepository)

            {
                _packageRepository = packageRepository;
            } 

            [SecuredOperation]
            public async Task<DataResult<List<string>>> Handle(GetPackageNamesQuery request, CancellationToken cancellationToken)
            {
                var packageNames = await _packageRepository.Query().Select(x => x.Name).ToListAsync();
                return new SuccessDataResult<List<string>>(packageNames);
            }
        }

    }
}
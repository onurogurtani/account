using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Queries
{
    /// <summary>
    /// Get By UserId  UserPackage
    /// </summary>
    [ExcludeFromCodeCoverage]

    public class UserPackageDto 
    {
        public long UserPackageId { get; set; }
        public string PackageName { get; set; }
        public DateTime PurchaseDate { get; set; } 
        public bool IsActive { get; set; }

    }
    [LogScope]
    public class GetUserPackagesByUserIdQuery : IRequest<DataResult<List<UserPackageDto>>>
    {
        public long UserId { get; set; }
        public class GetUserPackagesByUserIdQueryHandler : IRequestHandler<GetUserPackagesByUserIdQuery, DataResult<List<UserPackageDto>>>
        {
            private readonly IUserPackageRepository _UserPackageRepository;

            public GetUserPackagesByUserIdQueryHandler(IUserPackageRepository UserPackageRepository)
            {
                _UserPackageRepository = UserPackageRepository;
            } 
            public async Task<DataResult<List<UserPackageDto>>> Handle(GetUserPackagesByUserIdQuery request, CancellationToken cancellationToken)
            {
                var userPackageList = _UserPackageRepository
                    .Query().Include(i => i.Package).AsQueryable()
                    .Where(x => x.UserId == request.UserId)
                    .Select(x => new UserPackageDto
                    {
                        UserPackageId = x.Id,
                        PurchaseDate = x.PurchaseDate,
                        IsActive = x.Package.IsActive,
                        PackageName = x.Package.Name
                    }).ToList();

                return new SuccessDataResult<List<UserPackageDto>>(userPackageList, Messages.SuccessfulOperation);
            }

        }
    }
}

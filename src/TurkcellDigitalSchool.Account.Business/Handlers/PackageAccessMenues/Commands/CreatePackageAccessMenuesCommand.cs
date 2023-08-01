using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.AuthorityManagement.Services.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageAccessMenues.Commands
{
    /// <summary>
    /// Create Package
    /// </summary> 
    [LogScope]
    public class CreatePackageAccessMenuesCommand : IRequest<Result>
    {
        public long PackageId { get; set; }
        public List<string> ClaimNames { get; set; }

        [MessageClassAttr("Paket Menü Yetki Düzenleme")]
        public class CreatePackageAccessMenuesCommandHandler : IRequestHandler<CreatePackageAccessMenuesCommand,Result>
        {
            private readonly IPackageMenuAccessRepository _packageMenuAccessRepository;
            private readonly IClaimDefinitionService _claimDefinitionService; 

            public CreatePackageAccessMenuesCommandHandler(  IClaimDefinitionService claimDefinitionService, IPackageMenuAccessRepository packageMenuAccessRepository)
            { 
                _claimDefinitionService = claimDefinitionService;
                _packageMenuAccessRepository = packageMenuAccessRepository;
            }

 
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public async Task<Result> Handle(CreatePackageAccessMenuesCommand request, CancellationToken cancellationToken)
            {

                var platformClaims = _claimDefinitionService.GetClaimDefinitions().Where(w => w.ModuleType == ModuleType.Platform);

                var deletingClaims = platformClaims.Where(w => request.ClaimNames.All(a => a != w.Name))
                    .Select(s => s.Name).ToList();

                var deletingClaimsRecords = await _packageMenuAccessRepository.Query().Where(w => w.PackageId == request.PackageId && deletingClaims.Contains(w.Claim)).ToListAsync(cancellationToken);

                if (deletingClaimsRecords.Any())
                {
                    _packageMenuAccessRepository.DeleteRange(deletingClaimsRecords);
                }

                var addedClaims= await _packageMenuAccessRepository.Query().Where(w => w.PackageId == request.PackageId && !w.IsDeleted).Select(s=>s.Claim).ToListAsync(cancellationToken);

                var addingClaims= request.ClaimNames.Where(w => !addedClaims.Contains(w)).Select(s=>new PackageMenuAccess
                {
                    Claim = s,
                    PackageId = request.PackageId
                }).ToList();


                if (addingClaims.Any())
                {
                    await _packageMenuAccessRepository.AddRangeAsync(addingClaims);
                } 

                await _packageMenuAccessRepository.SaveChangesAsync(); 

                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}


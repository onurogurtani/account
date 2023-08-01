using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.AuthorityManagement.Services.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageAccessMenues.Queries
{
    /// <summary>
    /// Get Package
    /// </summary>
    [LogScope]

    public class GetPackageAccessMenuesDefaultQuery : IRequest<DataResult<List<PackageMenuAccessDto>>>
    {
        public long PackageId { get; set; }

        [MessageClassAttr("Paket Görüntüleme")]
        public class GetPackageAccessMenuesDefaultQueryHandler : IRequestHandler<GetPackageAccessMenuesDefaultQuery, DataResult<List<PackageMenuAccessDto>>>
        {  
            private readonly IPackageMenuAccessRepository _packageMenuAccessRepository;
            private readonly IMediator _mediator;

            public GetPackageAccessMenuesDefaultQueryHandler(IClaimDefinitionService claimDefinitionService,  IMediator mediator, IPackageMenuAccessRepository packageMenuAccessRepository)
            {
                _mediator = mediator;
                _packageMenuAccessRepository = packageMenuAccessRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public virtual async Task<DataResult<List<PackageMenuAccessDto>>> Handle(GetPackageAccessMenuesDefaultQuery request, CancellationToken cancellationToken)
            {
                var defaultValues = await GetDefaultValue();
                var hasRecord = await _packageMenuAccessRepository.Query().AnyAsync(a => a.PackageId == request.PackageId && !a.IsDeleted, cancellationToken: cancellationToken);
                if (!hasRecord)
                {
                    return new DataResult<List<PackageMenuAccessDto>>(defaultValues, true);
                }

                var records = await _packageMenuAccessRepository.GetListAsync(w => w.PackageId == request.PackageId && !w.IsDeleted);

                foreach (var itemDefault in defaultValues)
                {
                    SetValue(itemDefault);
                }

                void SetValue(PackageMenuAccessDto defaultVal)
                {
                    if (defaultVal.Items.Any())
                    {
                        foreach (var item in defaultVal.Items)
                        {
                            SetValue(item);
                        }
                    }
                    defaultVal.Seledted = records.Any(w => w.Claim == defaultVal.Value);
                }

                return new DataResult<List<PackageMenuAccessDto>>( defaultValues, true); 
            }
             
            private async Task<List<PackageMenuAccessDto>> GetDefaultValue()
            {
                var defaultValues = await _mediator.Send(new GetPackageAccessMenuesDefaultQuery());
               return defaultValues.Data; 
            }
        }
    }
}
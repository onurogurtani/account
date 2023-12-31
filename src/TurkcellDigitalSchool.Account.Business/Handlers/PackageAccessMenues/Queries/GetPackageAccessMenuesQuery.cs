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
    /// Get Package Menu Access
    /// </summary>
    [LogScope] 
    public class GetPackageAccessMenuesQuery : IRequest<DataResult<List<PackageMenuAccessDto>>>
    {
        public long PackageId { get; set; }

        [MessageClassAttr("Paket Görüntüleme")]
        public class GetPackageAccessMenuesQueryHandler : IRequestHandler<GetPackageAccessMenuesQuery, DataResult<List<PackageMenuAccessDto>>>
        {  
            private readonly IPackageMenuAccessRepository _packageMenuAccessRepository;
            private readonly IPackageRepository _packageRepository;
            private readonly IMediator _mediator;

            public GetPackageAccessMenuesQueryHandler(IClaimDefinitionService claimDefinitionService,  IMediator mediator, IPackageMenuAccessRepository packageMenuAccessRepository, IPackageRepository packageRepository)
            {
                _mediator = mediator;
                _packageMenuAccessRepository = packageMenuAccessRepository;
                _packageRepository = packageRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public virtual async Task<DataResult<List<PackageMenuAccessDto>>> Handle(GetPackageAccessMenuesQuery request, CancellationToken cancellationToken)
            {
                var defaultValues = await GetDefaultValue();
                 
                var isDefaultValSending = ! _packageRepository.Query().Any(w => w.Id == request.PackageId && w.IsMenuAccessSet);

                if (isDefaultValSending)
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
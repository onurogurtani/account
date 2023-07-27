using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ServiceStack;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.AuthorityManagement.Services.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries
{
    /// <summary>
    /// Get Package
    /// </summary>
    [LogScope]

    public class GetPackageAccessMenuesQuery : IRequest<DataResult<List<PackageMenuAccessDto>>>
    {
        public long PackageId { get; set; }

        [MessageClassAttr("Paket Görüntüleme")]
        public class GetPackageAccessMenuesQueryHandler : IRequestHandler<GetPackageAccessMenuesQuery, DataResult<List<PackageMenuAccessDto>>>
        {
            private readonly IPackageMenuAccessRepository _packageMenuAccessRepository;
            private readonly IClaimDefinitionService _claimDefinitionService;

            public GetPackageAccessMenuesQueryHandler( IClaimDefinitionService claimDefinitionService, IPackageMenuAccessRepository packageMenuAccessRepository)
            {
                _claimDefinitionService = claimDefinitionService;
                _packageMenuAccessRepository = packageMenuAccessRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public virtual async Task<DataResult<List<PackageMenuAccessDto>>> Handle(GetPackageAccessMenuesQuery request, CancellationToken cancellationToken)
            {
                var defaultValues = GetDefaultValue();
                var hasRecord= await _packageMenuAccessRepository.Query().AnyAsync(a => a.PackageId == request.PackageId && !a.IsDeleted  , cancellationToken: cancellationToken);
                if (!hasRecord)
                {
                    return new DataResult<List<PackageMenuAccessDto>>(defaultValues, true);
                }

                var records= await _packageMenuAccessRepository.GetListAsync(w => w.PackageId == request.PackageId && !w.IsDeleted);

                foreach (var items in defaultValues)
                {
                    //items
                }

                void SetValue(PackageMenuAccessDto defaultVal )
                {

                }

                return new DataResult<List<PackageMenuAccessDto>>(GetDefaultValue(), true);
            }


            private List<PackageMenuAccessDto> GetDefaultValue()
            {
                var claims = _claimDefinitionService.GetClaimDefinitions().Where(w => w.ModuleType == ModuleType.Platform).ToList();

                var packageMenuAccessDto = new List<PackageMenuAccessDto>();

                foreach (var item in claims)
                { 
                    if (!string.IsNullOrEmpty(item.TopCategoryName))
                    { 
                        var topCategory = packageMenuAccessDto.FirstOrDefault(w => w.Description == item.TopCategoryName) ?? new PackageMenuAccessDto();

                        if (string.IsNullOrEmpty(topCategory.Description))
                        {
                            topCategory.Description = item.TopCategoryName;
                            packageMenuAccessDto.Add(topCategory);
                        }

                        if (topCategory.Items.All(a => a.Description != item.CategoryName))
                        {
                            topCategory.Items.Add(new PackageMenuAccessDto
                            {
                                Description = item.CategoryName,
                                Items = new List<PackageMenuAccessDto>
                               {
                                   new PackageMenuAccessDto
                                   {
                                       Description = item.Description,
                                       Value = item.Name,
                                       Seledted = true
                                   }
                               }
                            });
                        }
                        else
                        {
                            var category = topCategory.Items.FirstOrDefault(w => w.Description == item.CategoryName);  
                            category.Items.Add(new PackageMenuAccessDto
                            {
                                Description = item.Description,
                                Value = item.Name,
                                Seledted = true
                            });
                        } 
                    }
                    else
                    {
                        if (packageMenuAccessDto.All(w => w.Description != item.CategoryName))
                        {
                            var newCategory = new PackageMenuAccessDto();
                            newCategory.Description = item.CategoryName; 
                            newCategory.Items.Add(new PackageMenuAccessDto
                            {
                                Description = item.Description,
                                Value = item.Name,
                                Seledted = true
                            }); 
                            packageMenuAccessDto.Add(newCategory);
                        }
                        else
                        {
                            var category = packageMenuAccessDto.FirstOrDefault(w => w.Description == item.CategoryName); 
                            category.Items.Add(new PackageMenuAccessDto
                            {
                                Description = item.Description,
                                Value = item.Name,
                                Seledted = true
                            });

                        }
                    } 
                } 
                return packageMenuAccessDto;
            }
        }
    }
}
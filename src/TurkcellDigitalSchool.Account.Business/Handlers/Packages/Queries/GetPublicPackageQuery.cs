using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries
{
    [LogScope]
    public class GetPublicPackageQuery : IRequest<DataResult<PublicPackageDetailResponse>>
    {
        public long Id { get; set; }

        [MessageClassAttr("Microsite Paket Görüntüleme")]
        public class GetPublicPackageQueryHandler : IRequestHandler<GetPublicPackageQuery, DataResult<PublicPackageDetailResponse>>
        {
            private readonly IPackageRepository _packageRepository;

            public GetPublicPackageQueryHandler(IPackageRepository packageRepository)
            {
                _packageRepository = packageRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public virtual async Task<DataResult<PublicPackageDetailResponse>> Handle(GetPublicPackageQuery request, CancellationToken cancellationToken)
            {
                var query = _packageRepository.Query().Where(w => w.IsActive)
                    .Include(x => x.ImageOfPackages).ThenInclude(x => x.File)
                    .AsQueryable();

                var record = await query.Select(w => new PublicPackageDetailResponse
                {
                    Id = w.Id,
                    Content = w.Content,
                    Summary = w.Summary,
                    Name = w.Name,
                    Files = w.ImageOfPackages.Select(a => new PublicPackageFileDto { Id = a.File.Id, Name = a.File.FileName, FilePath = a.File.FilePath }).ToList()
                }).FirstOrDefaultAsync(x => x.Id == request.Id);

                if (record == null)
                    return new ErrorDataResult<PublicPackageDetailResponse>(null, RecordIsNotFound.PrepareRedisMessage());

                return new SuccessDataResult<PublicPackageDetailResponse>(record, SuccessfulOperation.PrepareRedisMessage());
            }


        }
    }
}

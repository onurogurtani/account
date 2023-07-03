using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries
{
    /// <summary>
    /// Get Package
    /// </summary>
    [LogScope]
     
    public class GetPackageQuery : IRequest<DataResult<Package>>
    {
        public long Id { get; set; }

        [MessageClassAttr("Paket Görüntüleme")]
        public class GetPackageQueryHandler : IRequestHandler<GetPackageQuery, DataResult<Package>>
        {
            private readonly IPackageRepository _packageRepository;

            public GetPackageQueryHandler(IPackageRepository packageRepository)

            {
                _packageRepository = packageRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public virtual async Task<DataResult<Package>> Handle(GetPackageQuery request, CancellationToken cancellationToken)
            {
                var query = _packageRepository.Query()
                    .Include(x => x.ImageOfPackages).ThenInclude(x => x.File)
                    .Include(x => x.PackageLessons).ThenInclude(x => x.Lesson).ThenInclude(x => x.Classroom)
                    .Include(x => x.PackageRoles).ThenInclude(x => x.Role)
                    .Include(x => x.PackageDocuments).ThenInclude(x => x.Document)
                    .Include(x => x.PackagePublishers).ThenInclude(x => x.Publisher)
                    .Include(x => x.PackageContractTypes).ThenInclude(x => x.ContractType)
                    .Include(x => x.PackageFieldTypes)
                    .Include(x => x.PackagePackageTypeEnums)
                    .Include(x => x.TestExamPackages)
                    .Include(x => x.CoachServicePackages)
                    .Include(x => x.MotivationActivityPackages)
                    .Include(x => x.PackageEvents)
                    .Include(x => x.PackageTestExams)
                    .Include(x => x.EducationYear)
                    .AsQueryable();

                var record = await query.FirstOrDefaultAsync(x => x.Id == request.Id);

                if (record == null)
                    return new ErrorDataResult<Package>(null, RecordIsNotFound.PrepareRedisMessage());

                return new SuccessDataResult<Package>(record, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}
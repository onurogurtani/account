using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries
{
    /// <summary>
    /// Get Package
    /// </summary>
    public class GetPackageQuery : IRequest<IDataResult<Package>>
    {
        public long Id { get; set; }

        public class GetPackageQueryHandler : IRequestHandler<GetPackageQuery, IDataResult<Package>>
        {
            private readonly IPackageRepository _packageRepository;

            public GetPackageQueryHandler(IPackageRepository packageRepository)

            {
                _packageRepository = packageRepository;
            }

            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public virtual async Task<IDataResult<Package>> Handle(GetPackageQuery request, CancellationToken cancellationToken)
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
                    .AsQueryable();


                var record = await query.FirstOrDefaultAsync(x => x.Id == request.Id);

                if (record == null)
                    return new ErrorDataResult<Package>(null, Messages.RecordIsNotFound);


                return new SuccessDataResult<Package>(record, Messages.Deleted);

            }
        }

    }
}
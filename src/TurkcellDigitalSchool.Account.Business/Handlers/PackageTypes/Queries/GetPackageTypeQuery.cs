//using DataAccess.Abstract;
//using Entities.Concrete;
//using Core.Utilities.Requests;

//namespace Business.Handlers.PackageTypeTypes.Queries
//{
//    public class GetPackageTypeTypeQuery : QueryByIdRequestBase<PackageTypeType>
//    {
//        public class GetPackageTypeTypeQueryHandler : QueryByIdRequestHandlerBase<PackageTypeType>
//        {
//            public GetPackageTypeTypeQueryHandler(IPackageTypeTypeRepository PackageTypeTypeRepository) : base(PackageTypeTypeRepository)
//            {
//            }
//        }
//    }
//}

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

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Queries
{
    /// <summary>
    /// Get PackageType
    /// </summary>
    public class GetPackageTypeQuery : IRequest<IDataResult<PackageType>>
    {
        public long Id { get; set; }

        public class GetPackageTypeQueryHandler : IRequestHandler<GetPackageTypeQuery, IDataResult<PackageType>>
        {
            private readonly IPackageTypeRepository _packageTypeRepository;

            public GetPackageTypeQueryHandler(IPackageTypeRepository packageTypeRepository)

            {
                _packageTypeRepository = packageTypeRepository;
            }

             
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public virtual async Task<IDataResult<PackageType>> Handle(GetPackageTypeQuery request, CancellationToken cancellationToken)
            {
                var query = _packageTypeRepository.Query()
                    .Include(x => x.PackageTypeTargetScreens).ThenInclude(x => x.TargetScreenId)
                    .AsQueryable();


                var record = await query.FirstOrDefaultAsync(x => x.Id == request.Id);

                if (record == null)
                    return new ErrorDataResult<PackageType>(null, Messages.RecordIsNotFound);


                return new SuccessDataResult<PackageType>(record, Messages.Deleted);

            }
        }

    }
}
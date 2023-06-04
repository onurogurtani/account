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
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Queries
{
    /// <summary>
    /// Get PackageType
    /// </summary>
    [LogScope]
    public class GetPackageTypeQuery : IRequest<DataResult<PackageType>>
    {
        public long Id { get; set; }

        [MessageClassAttr("Paket Türü Görüntüleme")]
        public class GetPackageTypeQueryHandler : IRequestHandler<GetPackageTypeQuery, DataResult<PackageType>>
        {
            private readonly IPackageTypeRepository _packageTypeRepository;

            public GetPackageTypeQueryHandler(IPackageTypeRepository packageTypeRepository)

            {
                _packageTypeRepository = packageTypeRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string Deleted = Messages.Deleted;
              
            [SecuredOperation]
            public virtual async Task<DataResult<PackageType>> Handle(GetPackageTypeQuery request, CancellationToken cancellationToken)
            {
                var query = _packageTypeRepository.Query()
                    .Include(x => x.PackageTypeTargetScreens).ThenInclude(x => x.TargetScreenId)
                    .AsQueryable();

                var record = await query.FirstOrDefaultAsync(x => x.Id == request.Id);

                if (record == null)
                    return new ErrorDataResult<PackageType>(null, RecordIsNotFound.PrepareRedisMessage());

                return new SuccessDataResult<PackageType>(record, Deleted.PrepareRedisMessage());
            }
        }
    }
}
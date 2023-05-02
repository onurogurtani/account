using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.StudentAnswerTargetRangeHandler.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete.Student;
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.StudentAnswerTargetRangeHandler.Commands
{
    public class CreateStudentAnswerTargetRangeCommand : IRequest<IResult>
    {
        public long UserId { get; set; }
        public long PackageId { get; set; }
        public decimal TargetRangeMin { get; set; }
        public decimal TargetRangeMax { get; set; }

        [MessageClassAttr("Öğrenci Net Hedef Aralığı Ekleme")]
        public class CreateStudentAnswerTargetCommandHandler : IRequestHandler<CreateStudentAnswerTargetRangeCommand, IResult>
        {
            IStudentAnswerTargetRangeRepository _studentAnswerTargetRangeRepository;
            IPackageRepository _packageRepository;
            /// <summary>
            /// Create StudentAnswerTarget
            /// </summary>
            /// <param name="studentAnswerTargetRangeRepository"></param>
            /// <param name="packageRepository"></param>
            public CreateStudentAnswerTargetCommandHandler(IStudentAnswerTargetRangeRepository studentAnswerTargetRangeRepository, IPackageRepository packageRepository)
            {
                _studentAnswerTargetRangeRepository = studentAnswerTargetRangeRepository;
                _packageRepository = packageRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string PackageIsNotFound = Constants.Messages.PackageIsNotFound;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string TargetRangeIsAlreadyExist = Constants.Messages.TargetRangeIsAlreadyExist;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [ValidationAspect(typeof(CreateStudentAnswerTargetRangeValidator), Priority = 2)]
            public async Task<IResult> Handle(CreateStudentAnswerTargetRangeCommand request, CancellationToken cancellationToken)
            {
                var isExistPackage = _packageRepository.Query().Any(x => x.Id == request.PackageId && x.IsDeleted == IsDeletedEnum.NotDeleted);
                if (!isExistPackage)
                {
                    return new ErrorResult(PackageIsNotFound.PrepareRedisMessage());
                }

                var existRecord = _studentAnswerTargetRangeRepository.Query().Any(x => x.UserId == request.UserId && x.PackageId == request.PackageId && x.IsDeleted == IsDeletedEnum.NotDeleted);
                if (existRecord)
                {
                    return new ErrorResult(TargetRangeIsAlreadyExist.PrepareRedisMessage());
                }

                var newRecord = new StudentAnswerTargetRange
                {
                    UserId = request.UserId,
                    PackageId = request.PackageId,
                    TargetRangeMin = request.TargetRangeMin,
                    TargetRangeMax = request.TargetRangeMax
                };

                await _studentAnswerTargetRangeRepository.CreateAndSaveAsync(newRecord);

                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

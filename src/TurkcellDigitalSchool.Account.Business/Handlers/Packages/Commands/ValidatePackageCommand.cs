using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands
{
    /// <summary>
    /// Update Package
    /// </summary>

    [TransactionScope]
    [LogScope]
    [SecuredOperationScope]
    public class ValidatePackageCommand : IRequest<IResult>
    {
        public Package Package { get; set; }

        [MessageClassAttr("Paket Kaydetme Validasyon")]
        public class ValidatePackageCommandHandler : IRequestHandler<ValidatePackageCommand, IResult>
        {
            private readonly IPackageRepository _packageRepository;
            private readonly ITestExamRepository _testExamRepository;
            private readonly IEventRepository _eventRepository;
            public ValidatePackageCommandHandler(IEventRepository eventRepository, ITestExamRepository testExamRepository, IPackageRepository packageRepository)
            {
                _eventRepository = eventRepository;
                _testExamRepository = testExamRepository;
                _packageRepository = packageRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Core.Common.Constants.Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Core.Common.Constants.Messages.SuccessfulOperation;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string PackageExamKindError = Constants.Messages.PackageExamKindError;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string PackageTestExamExamKindError = Constants.Messages.PackageTestExamExamKindError;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string MotivationPackageError = Constants.Messages.MotivationPackageError;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string CoachServicePackageError = Constants.Messages.CoachServicePackageError;
            public async Task<IResult> Handle(ValidatePackageCommand request, CancellationToken cancellationToken)
            {

                foreach (var examPackage in request.Package.TestExamPackages)
                {
                    var package = _packageRepository.Query().AsNoTracking().FirstOrDefault(x => x.Id == examPackage.PackageId);
                    if (package != null)
                    {
                        if (package.PackageTypeEnum != PackageTypeEnum.TestExam)
                            return new ErrorResult(PackageTestExamExamKindError.PrepareRedisMessage());
                    }
                    else
                        return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());
                }

                foreach (var packageMotivation in request.Package.MotivationActivityPackages)
                {
                    var package = _packageRepository.Query().AsNoTracking().FirstOrDefault(x => x.Id == packageMotivation.PackageId);
                    if (package != null)
                    {
                        if (package.PackageTypeEnum != PackageTypeEnum.MotivationEvent)
                            return new ErrorResult(MotivationPackageError.PrepareRedisMessage());
                    }
                    else
                        return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());
                }

                foreach (var packageMotivation in request.Package.CoachServicePackages)
                {
                    var package = _packageRepository.Query().AsNoTracking().FirstOrDefault(x => x.Id == packageMotivation.PackageId);
                    if (package != null)
                    {
                        if (package.PackageTypeEnum != PackageTypeEnum.CoachService)
                            return new ErrorResult(CoachServicePackageError.PrepareRedisMessage());
                    }
                    else
                        return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());
                }



                foreach (var packageTest in request.Package.PackageTestExams)
                {
                    var testExam = _testExamRepository.Query().AsNoTracking().FirstOrDefault(x => x.Id == packageTest.TestExamId);
                    if (testExam != null)
                    {
                        if ((int)testExam.ExamType != (int)request.Package.ExamKind)
                        {
                            if (request.Package.ExamKind == ExamKind.YKS)
                            {
                                if (testExam.ExamType != ExamType.TYT && testExam.ExamType != ExamType.AYT)
                                    return new ErrorResult(PackageExamKindError.PrepareRedisMessage());
                            }
                            else
                            {
                                return new ErrorResult(PackageExamKindError.PrepareRedisMessage());
                            }
                        }
                    }
                    else
                    {
                        return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());
                    }
                }





                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}


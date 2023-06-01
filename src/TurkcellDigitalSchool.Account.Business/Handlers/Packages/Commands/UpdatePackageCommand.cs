using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DotNetCore.CAP;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Results;
using JsonConverter = System.Text.Json.Serialization.JsonConverter;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands
{
    /// <summary>
    /// Update Package
    /// </summary>

    [TransactionScope]
    public class UpdatePackageCommand : IRequest<IResult>
    {
        public Package Package { get; set; }

        [MessageClassAttr("Paket Güncelleme")]
        public class UpdatePackageCommandHandler : IRequestHandler<UpdatePackageCommand, IResult>
        {
            private readonly IPackageRoleRepository _packageRoleRepository;
            private readonly IImageOfPackageRepository _imageOfPackageRepository;
            private readonly IPackageRepository _packageRepository;
            private readonly IPackageLessonRepository _packageLessonRepository;
            private readonly IPackagePublisherRepository _packagePublisherRepository;
            private readonly IPackageDocumentRepository _packageDocumentRepository;
            private readonly IPackageContractTypeRepository _packageContractTypeRepository;
            private readonly IPackagePackageTypeEnumRepository _packagePackageTypeEnumRepository;
            private readonly IPackageFieldTypeRepository _packageFieldTypeRepository;
            private readonly IPackageCoachServicePackageRepository _packageCoachServicePackageRepository;
            private readonly IPackageMotivationActivityPackageRepository _packageMotivationActivityPackageRepository;
            private readonly IPackageTestExamPackageRepository _packageTestExamPackageRepository;
            private readonly IPackageTestExamRepository _packageTestExamRepository;
            private readonly IPackageEventRepository _packageEventRepository;
            private readonly ICapPublisher _capPublisher;
            public UpdatePackageCommandHandler(
                IPackageCoachServicePackageRepository packageCoachServicePackageRepository, IPackageEventRepository packageEventRepository, IPackageMotivationActivityPackageRepository packageMotivationActivityPackageRepository, IPackageTestExamPackageRepository packageTestExamPackageRepository, IPackagePackageTypeEnumRepository packagePackageTypeEnumRepository, IPackageFieldTypeRepository packageFieldTypeRepository, IPackageRepository packageRepository, IImageOfPackageRepository imageOfPackageRepository, IPackageLessonRepository packageLessonRepository, IPackagePublisherRepository packagePublisherRepository, IPackageDocumentRepository packageDocumentRepository, IPackageContractTypeRepository packageContractTypeRepository, IPackageTestExamRepository packageTestExamRepository, ICapPublisher capPublisher, IPackageRoleRepository packageRoleRepository)
            {
                _packageRepository = packageRepository;
                _imageOfPackageRepository = imageOfPackageRepository;
                _packageLessonRepository = packageLessonRepository;
                _packagePublisherRepository = packagePublisherRepository;
                _packageDocumentRepository = packageDocumentRepository;
                _packageContractTypeRepository = packageContractTypeRepository;
                _packageCoachServicePackageRepository = packageCoachServicePackageRepository;
                _packageMotivationActivityPackageRepository = packageMotivationActivityPackageRepository;
                _packageTestExamPackageRepository = packageTestExamPackageRepository;
                _packagePackageTypeEnumRepository = packagePackageTypeEnumRepository;
                _packageFieldTypeRepository = packageFieldTypeRepository;
                _packageEventRepository = packageEventRepository;
                _packageTestExamRepository = packageTestExamRepository;
                _capPublisher = capPublisher;
                _packageRoleRepository = packageRoleRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordAlreadyExists = Messages.RecordAlreadyExists;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [SecuredOperation]
            public async Task<IResult> Handle(UpdatePackageCommand request, CancellationToken cancellationToken)
            {
                var isExist = _packageRepository.Query().Any(x => x.Id != request.Package.Id && x.Name.Trim().ToLower() == request.Package.Name.Trim().ToLower() && x.IsActive);
                if (isExist)
                    return new ErrorResult(RecordAlreadyExists.PrepareRedisMessage());

                var entity = await _packageRepository.GetAsync(x => x.Id == request.Package.Id);
                if (entity == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                var imageOfPackages = await _imageOfPackageRepository.GetListAsync(x => x.PackageId == request.Package.Id);
                _imageOfPackageRepository.DeleteRange(imageOfPackages);


                var packageLessons = await _packageLessonRepository.GetListAsync(x => x.PackageId == request.Package.Id);
                _packageLessonRepository.DeleteRange(packageLessons);

                foreach (var item in packageLessons)
                {
                    await _capPublisher.PublishAsync(item.GeneratePublishName(EntityState.Deleted), item, cancellationToken: cancellationToken);
                }

                var packagePublishers = await _packagePublisherRepository.GetListAsync(x => x.PackageId == request.Package.Id);
                _packagePublisherRepository.DeleteRange(packagePublishers);


                var packageDocuments = await _packageDocumentRepository.GetListAsync(x => x.PackageId == request.Package.Id);
                _packageDocumentRepository.DeleteRange(packageDocuments);

                var packageContractTypes = await _packageContractTypeRepository.GetListAsync(x => x.PackageId == request.Package.Id);
                _packageContractTypeRepository.DeleteRange(packageContractTypes);


                var packagePackageTypeEnums = await _packagePackageTypeEnumRepository.GetListAsync(x => x.PackageId == request.Package.Id);
                _packagePackageTypeEnumRepository.DeleteRange(packagePackageTypeEnums);


                var packageFieldTypes = await _packageFieldTypeRepository.GetListAsync(x => x.PackageId == request.Package.Id);
                _packageFieldTypeRepository.DeleteRange(packageFieldTypes);

                var packageCoachServicePackages = await _packageCoachServicePackageRepository.GetListAsync(x => x.PackageId == request.Package.Id);
                _packageCoachServicePackageRepository.DeleteRange(packageCoachServicePackages);



                var packageMotivationActivityPackages = await _packageMotivationActivityPackageRepository.GetListAsync(x => x.PackageId == request.Package.Id);
                _packageMotivationActivityPackageRepository.DeleteRange(packageMotivationActivityPackages);


                var packageTestExamPackages = await _packageTestExamPackageRepository.GetListAsync(x => x.PackageId == request.Package.Id);
                _packageTestExamPackageRepository.DeleteRange(packageTestExamPackages);

                var packageRoles = await _packageRoleRepository.GetListAsync(x => x.PackageId == request.Package.Id);
                _packageRoleRepository.DeleteRange(packageRoles);


                var packageTestExams = await _packageTestExamRepository.GetListAsync(x => x.PackageId == request.Package.Id);
                _packageTestExamRepository.DeleteRange(packageTestExams);

                foreach (var item in packageTestExams)
                { 
                    await _capPublisher.PublishAsync(item.GeneratePublishName(EntityState.Deleted), item, cancellationToken: cancellationToken);
                }


                var packageEvents = await _packageEventRepository.GetListAsync(x => x.PackageId == request.Package.Id);
                _packageEventRepository.DeleteRange(packageEvents);



                entity.Name = request.Package.Name;
                entity.Summary = request.Package.Summary;
                entity.Content = request.Package.Content;
                entity.IsActive = request.Package.IsActive;
                entity.StartDate = request.Package.StartDate;
                entity.FinishDate = request.Package.FinishDate;
                entity.HasCoachService = request.Package.HasCoachService;
                entity.HasTryingTest = request.Package.HasTryingTest;
                entity.TryingTestQuestionCount = request.Package.TryingTestQuestionCount;
                entity.HasMotivationEvent = request.Package.HasMotivationEvent;
                entity.PackageKind = request.Package.PackageKind;
                entity.PackageLessons = request.Package.PackageLessons;

                entity.PackageDocuments = request.Package.PackageDocuments;
                entity.PackageContractTypes = request.Package.PackageContractTypes;
                entity.PackageFieldTypes = request.Package.PackageFieldTypes;
                entity.PackagePackageTypeEnums = request.Package.PackagePackageTypeEnums;
                entity.TestExamPackages = request.Package.TestExamPackages;
                entity.MotivationActivityPackages = request.Package.MotivationActivityPackages;
                entity.CoachServicePackages = request.Package.CoachServicePackages;
                entity.PackageEvents = request.Package.PackageEvents;
                entity.PackageTestExams = request.Package.PackageTestExams;
                entity.EducationYearId = request.Package.EducationYearId;
                entity.PackageRoles = request.Package.PackageRoles;



                var record = _packageRepository.Update(entity);
                await _packageRepository.SaveChangesAsync();

                 
                await _capPublisher.PublishAsync(record.GeneratePublishName(EntityState.Modified), record, cancellationToken: cancellationToken);


                var imageOfPackageAddList = request.Package.ImageOfPackages.Select(s => new ImageOfPackage
                {
                    FileId = s.FileId,
                    PackageId = record.Id
                }).ToList();

                await _imageOfPackageRepository.AddRangeAsync(imageOfPackageAddList);
                await _imageOfPackageRepository.SaveChangesAsync();


                var packagePublishersAddList = request.Package.PackagePublishers.Select(s =>
                    new PackagePublisher
                    {
                        PackageId = record.Id,
                        PublisherId = s.PublisherId
                    });

                await _packagePublisherRepository.AddRangeAsync(packagePublishersAddList);
                await _packagePublisherRepository.SaveChangesAsync();

                return new SuccessDataResult<Package>(record, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}


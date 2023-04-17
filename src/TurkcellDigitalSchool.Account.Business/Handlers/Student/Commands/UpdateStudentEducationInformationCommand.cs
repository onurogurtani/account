using DocumentFormat.OpenXml.Wordprocessing;
using MediatR;
using ServiceStack.Script;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.ValidationRules;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Dtos.UserDtos;
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands
{
    public class UpdateStudentEducationInformationCommand : IRequest<IResult>
    {
        public long UserId { get; set; }
        public ExamType ExamType { get; set; }
        public long CityId { get; set; }
        public long CountyId { get; set; }
        public SchoolTypeEnum SchoolType { get; set; }
        public long SchoolId { get; set; }
        public long? ClassroomId { get; set; }
        public int? GraduationYear { get; set; }
        public int? DiplomaGrade { get; set; }
        public YKSStatementEnum? YKSExperienceInformation { get; set; }
        public PointTypeEnum? FieldType { get; set; }
        public PointTypeEnum? PointType { get; set; }
        public bool? ReligionLessonStatus { get; set; }

        public class UpdateStudentEducationInformationCommandHandler : IRequestHandler<UpdateStudentEducationInformationCommand, IResult>
        {
            IStudentEducationInformationRepository _studentEducationInformationRepository;
            public UpdateStudentEducationInformationCommandHandler(IStudentEducationInformationRepository studentEducationInformationRepository)
            {
                _studentEducationInformationRepository = studentEducationInformationRepository;
            }


            [MessageConstAttr(MessageCodeType.Success)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [ValidationAspect(typeof(UpdateStudentEducationInformationValidator), Priority = 2)]
            public async Task<IResult> Handle(UpdateStudentEducationInformationCommand request, CancellationToken cancellationToken)
            {
                var existStudentEducationInfo = _studentEducationInformationRepository.Query().FirstOrDefault(w => w.UserId == request.UserId);
                if (existStudentEducationInfo == null)
                {
                    var newRecord = new StudentEducationInformation
                    {
                        UserId = request.UserId,
                        ExamType = request.ExamType,
                        CityId = request.CityId,
                        CountyId = request.CountyId,
                        SchoolType = request.SchoolType,
                        SchoolId = request.SchoolId,
                        ClassroomId = request.ClassroomId,
                        GraduationYear = request.GraduationYear,
                        DiplomaGrade = request.GraduationYear,
                        YKSStatement = request.YKSExperienceInformation,
                        FieldType = request.FieldType,
                        PointType = request.PointType,
                        ReligionLessonStatus = request.ReligionLessonStatus,
                    };

                    await _studentEducationInformationRepository.CreateAndSaveAsync(newRecord);
                    return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
                }

                existStudentEducationInfo.ExamType = request.ExamType;
                existStudentEducationInfo.CityId = request.CityId;
                existStudentEducationInfo.CountyId = request.CountyId;
                existStudentEducationInfo.SchoolType = request.SchoolType;
                existStudentEducationInfo.SchoolId = request.SchoolId;
                existStudentEducationInfo.ClassroomId = request.ClassroomId;
                existStudentEducationInfo.GraduationYear = request.GraduationYear;
                existStudentEducationInfo.DiplomaGrade = request.GraduationYear;
                existStudentEducationInfo.YKSStatement = request.YKSExperienceInformation;
                existStudentEducationInfo.FieldType = request.FieldType;
                existStudentEducationInfo.PointType = request.PointType;
                existStudentEducationInfo.ReligionLessonStatus = request.ReligionLessonStatus;
                await _studentEducationInformationRepository.UpdateAndSaveAsync(existStudentEducationInfo);
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());

            }
        }

    }
}

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
        public StudentEducationRequestDto StudentEducationRequest { get; set; }

        public class UpdateStudentEducationInformationCommandHandler : IRequestHandler<UpdateStudentEducationInformationCommand, IResult>
        {
            private readonly IStudentEducationInformationRepository _studentEducationInformationRepository;
            private readonly IUserService _userService;
            public UpdateStudentEducationInformationCommandHandler(IStudentEducationInformationRepository studentEducationInformationRepository, IUserService userService)
            {
                _studentEducationInformationRepository = studentEducationInformationRepository;
                _userService = userService;
            }

            [MessageConstAttr(MessageCodeType.Success)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;

            [ValidationAspect(typeof(UpdateStudentEducationInformationValidator), Priority = 2)]
            public async Task<IResult> Handle(UpdateStudentEducationInformationCommand request, CancellationToken cancellationToken)
            {

                var getUser = _userService.GetUserById(request.StudentEducationRequest.UserId);
                if (getUser == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                var validationMessages = _userService.StudentEducationValidationRules(request.StudentEducationRequest);
                if (!string.IsNullOrWhiteSpace(validationMessages))
                {
                    return new ErrorResult(validationMessages);
                }

                var existStudentEducationInfo = _studentEducationInformationRepository.Query().FirstOrDefault(w => w.UserId == request.StudentEducationRequest.UserId);
                if (existStudentEducationInfo == null)
                {
                    var newRecord = new StudentEducationInformation
                    {
                        UserId = request.StudentEducationRequest.UserId,
                        ExamType = request.StudentEducationRequest.ExamType,
                        CityId = request.StudentEducationRequest.CityId,
                        CountyId = request.StudentEducationRequest.CountyId,
                        InstitutionId = request.StudentEducationRequest.InstitutionId,
                        SchoolId = request.StudentEducationRequest.SchoolId,
                        ClassroomId = request.StudentEducationRequest.ExamType == ExamType.LGS ? request.StudentEducationRequest.ClassroomId : null,
                        GraduationYearId = request.StudentEducationRequest.ExamType == ExamType.LGS ? null : request.StudentEducationRequest.GraduationYearId,
                        DiplomaGrade = request.StudentEducationRequest.ExamType == ExamType.LGS ? null : request.StudentEducationRequest.DiplomaGrade,
                        YKSStatement = request.StudentEducationRequest.ExamType == ExamType.LGS ? null : request.StudentEducationRequest.YKSExperienceInformation,
                        FieldType = request.StudentEducationRequest.ExamType == ExamType.LGS ? null : request.StudentEducationRequest.FieldType,
                        PointType = request.StudentEducationRequest.ExamType == ExamType.LGS ? null : request.StudentEducationRequest.PointType,
                        ReligionLessonStatus = request.StudentEducationRequest.ExamType == ExamType.LGS ? null : request.StudentEducationRequest.ReligionLessonStatus,
                        IsGraduate = request.StudentEducationRequest.ExamType == ExamType.LGS ? null : request.StudentEducationRequest.IsGraduate
                    };

                    await _studentEducationInformationRepository.CreateAndSaveAsync(newRecord);
                    return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
                }

                existStudentEducationInfo.ExamType = request.StudentEducationRequest.ExamType;
                existStudentEducationInfo.CityId = request.StudentEducationRequest.CityId;
                existStudentEducationInfo.CountyId = request.StudentEducationRequest.CountyId;
                existStudentEducationInfo.InstitutionId = request.StudentEducationRequest.InstitutionId;
                existStudentEducationInfo.SchoolId = request.StudentEducationRequest.SchoolId;
                existStudentEducationInfo.ClassroomId = request.StudentEducationRequest.ExamType == ExamType.LGS ? request.StudentEducationRequest.ClassroomId : null;
                existStudentEducationInfo.GraduationYearId = request.StudentEducationRequest.ExamType == ExamType.LGS ? null : request.StudentEducationRequest.GraduationYearId;
                existStudentEducationInfo.DiplomaGrade = request.StudentEducationRequest.ExamType == ExamType.LGS ? null : request.StudentEducationRequest.DiplomaGrade;
                existStudentEducationInfo.YKSStatement = request.StudentEducationRequest.ExamType == ExamType.LGS ? null : request.StudentEducationRequest.YKSExperienceInformation;
                existStudentEducationInfo.FieldType = request.StudentEducationRequest.ExamType == ExamType.LGS ? null : request.StudentEducationRequest.FieldType;
                existStudentEducationInfo.PointType = request.StudentEducationRequest.ExamType == ExamType.LGS ? null : request.StudentEducationRequest.PointType;
                existStudentEducationInfo.ReligionLessonStatus = request.StudentEducationRequest.ExamType == ExamType.LGS ? null : request.StudentEducationRequest.ReligionLessonStatus;
                existStudentEducationInfo.IsGraduate = request.StudentEducationRequest.ExamType == ExamType.LGS ? null : request.StudentEducationRequest.IsGraduate;

                await _studentEducationInformationRepository.UpdateAndSaveAsync(existStudentEducationInfo);
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());

            }
        }

    }
}

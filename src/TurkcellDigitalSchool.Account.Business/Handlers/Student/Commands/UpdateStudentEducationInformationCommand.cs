using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Account.Domain.Enums.Institution;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

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

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;


            public async Task<IResult> Handle(UpdateStudentEducationInformationCommand request, CancellationToken cancellationToken)
            {
                //TODO UserId Tokendan alınacaktır?
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
                        CityId = request.StudentEducationRequest.InstitutionId != (int)InstitutionEnum.AcikOgretimKurumlari ? request.StudentEducationRequest.CityId : null,
                        CountyId = request.StudentEducationRequest.InstitutionId != (int)InstitutionEnum.AcikOgretimKurumlari ? request.StudentEducationRequest.CountyId : null,
                        InstitutionId = request.StudentEducationRequest.InstitutionId,
                        SchoolId = request.StudentEducationRequest.SchoolId,
                        ClassroomId = request.StudentEducationRequest.ClassroomId,
                        //GraduationYear = request.StudentEducationRequest.ExamType == ExamType.LGS ? null : request.StudentEducationRequest.GraduationYear,
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
                existStudentEducationInfo.CityId = request.StudentEducationRequest.InstitutionId != (int)InstitutionEnum.AcikOgretimKurumlari ? request.StudentEducationRequest.CityId : null;
                existStudentEducationInfo.CountyId = request.StudentEducationRequest.InstitutionId != (int)InstitutionEnum.AcikOgretimKurumlari ? request.StudentEducationRequest.CountyId : null;

                existStudentEducationInfo.InstitutionId = request.StudentEducationRequest.InstitutionId;
                existStudentEducationInfo.SchoolId = request.StudentEducationRequest.SchoolId;
                existStudentEducationInfo.ClassroomId = request.StudentEducationRequest.ClassroomId;
                existStudentEducationInfo.GraduationYear = request.StudentEducationRequest.ExamType == ExamType.LGS ? null : request.StudentEducationRequest.GraduationYear;
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

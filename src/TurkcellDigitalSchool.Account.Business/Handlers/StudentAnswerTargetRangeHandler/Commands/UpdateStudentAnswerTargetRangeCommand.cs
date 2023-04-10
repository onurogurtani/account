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

namespace TurkcellDigitalSchool.Account.Business.Handlers.StudentAnswerTargetRangeHandler.Commands
{
    public class UpdateStudentAnswerTargetRangeCommand : IRequest<IResult>
    {
        public long Id { get; set; }
        public decimal TargetRangeMin { get; set; }
        public decimal TargetRangeMax { get; set; }

        [MessageClassAttr("Öğrenci Net Hedef Aralığı Güncelleme")]
        public class UpdateStudentAnswerTargetRangeCommandHandler : IRequestHandler<UpdateStudentAnswerTargetRangeCommand, IResult>
        {
            IStudentAnswerTargetRangeRepository _studentAnswerTargetRangeRepository;
            /// <summary>
            /// Update StudentAnswerTargetRange
            /// </summary>
            /// <param name="studentAnswerTargetRangeRepository"></param>
            public UpdateStudentAnswerTargetRangeCommandHandler(IStudentAnswerTargetRangeRepository studentAnswerTargetRangeRepository)
            {
                _studentAnswerTargetRangeRepository = studentAnswerTargetRangeRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            [MessageConstAttr(MessageCodeType.Success)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [ValidationAspect(typeof(UpdateStudentAnswerTargetRangeValidator), Priority = 2)]
            public async Task<IResult> Handle(UpdateStudentAnswerTargetRangeCommand request, CancellationToken cancellationToken)
            {
                var getStudentAnswerTargetRange = _studentAnswerTargetRangeRepository.GetById(request.Id);

                if (getStudentAnswerTargetRange == null)
                {
                    return new ErrorResult(RecordIsNotFound.PrepareRedisMessage());
                }

                getStudentAnswerTargetRange.TargetRangeMin = request.TargetRangeMin;
                getStudentAnswerTargetRange.TargetRangeMax = request.TargetRangeMax;

                await _studentAnswerTargetRangeRepository.UpdateAndSaveAsync(getStudentAnswerTargetRange);

                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

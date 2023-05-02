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
    public class DeleteStudentAnswerTargetRangeCommand : IRequest<IResult>
    {
        public long Id { get; set; }

        [MessageClassAttr("Öğrenci Net Hedef Aralığı Silme")]
        public class DeleteStudentAnswerTargetRangeCommandHandler : IRequestHandler<DeleteStudentAnswerTargetRangeCommand, IResult>
        {
            IStudentAnswerTargetRangeRepository _studentAnswerTargetRangeRepository;
            /// <summary>
            ///  Delete StudentAnswerTargetRange
            /// </summary>
            /// <param name="studentAnswerTargetRangeRepository"></param>
            public DeleteStudentAnswerTargetRangeCommandHandler(IStudentAnswerTargetRangeRepository studentAnswerTargetRangeRepository)
            {
                _studentAnswerTargetRangeRepository = studentAnswerTargetRangeRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            [ValidationAspect(typeof(DeleteStudentAnswerTargetRangeValidator), Priority = 2)]
            public async Task<IResult> Handle(DeleteStudentAnswerTargetRangeCommand request, CancellationToken cancellationToken)
            {
                var getStudentAnswerTargetRange = _studentAnswerTargetRangeRepository.GetById(request.Id);

                if (getStudentAnswerTargetRange == null)
                {
                    return new ErrorResult(RecordIsNotFound.PrepareRedisMessage());
                }

                _studentAnswerTargetRangeRepository.HardDeleteAndSave(getStudentAnswerTargetRange);

                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

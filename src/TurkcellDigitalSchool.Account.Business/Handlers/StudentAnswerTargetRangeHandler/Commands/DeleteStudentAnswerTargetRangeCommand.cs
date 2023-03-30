using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.StudentAnswerTargetRangeHandler.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.StudentAnswerTargetRangeHandler.Commands
{
    public class DeleteStudentAnswerTargetRangeCommand : IRequest<IResult>
    {
        public long Id { get; set; }
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


            [ValidationAspect(typeof(DeleteStudentAnswerTargetRangeValidator), Priority = 2)]
            public async Task<IResult> Handle(DeleteStudentAnswerTargetRangeCommand request, CancellationToken cancellationToken)
            {
                var getStudentAnswerTargetRange = _studentAnswerTargetRangeRepository.GetById(request.Id);

                if (getStudentAnswerTargetRange == null)
                {
                    return new ErrorResult("Kayıt bulunamadı");
                }

                _studentAnswerTargetRangeRepository.HardDeleteAndSave(getStudentAnswerTargetRange);

                return new SuccessResult(Messages.SuccessfulOperation);

            }
        }
    }
}

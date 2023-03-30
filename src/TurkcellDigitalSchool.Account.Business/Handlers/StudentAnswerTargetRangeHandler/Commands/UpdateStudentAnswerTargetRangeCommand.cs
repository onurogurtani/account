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
    public class UpdateStudentAnswerTargetRangeCommand : IRequest<IResult>
    {
        public long Id { get; set; }
        public decimal TargetRangeMin { get; set; }
        public decimal TargetRangeMax { get; set; }

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

            [ValidationAspect(typeof(UpdateStudentAnswerTargetRangeValidator), Priority = 2)]
            public async Task<IResult> Handle(UpdateStudentAnswerTargetRangeCommand request, CancellationToken cancellationToken)
            {
                var getStudentAnswerTargetRange = _studentAnswerTargetRangeRepository.GetById(request.Id);

                if (getStudentAnswerTargetRange == null)
                {
                    return new ErrorResult("Kayıt bulunamadı");
                }

                getStudentAnswerTargetRange.TargetRangeMin = request.TargetRangeMin;
                getStudentAnswerTargetRange.TargetRangeMax = request.TargetRangeMax;

                await _studentAnswerTargetRangeRepository.UpdateAndSaveAsync(getStudentAnswerTargetRange);

                return new SuccessResult(Messages.SuccessfulOperation);

            }
        }
    }
}

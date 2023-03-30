using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Admins.Queries
{
    /// <summary>
    /// CheckIsValidWordsQuery
    /// </summary>
    public class CheckIsValidWordsQuery : IRequest<IResult>
    {
        public string? Text { get; set; }

        public class CheckIsValidWordsQueryHandler : IRequestHandler<CheckIsValidWordsQuery, IResult>
        {

            public CheckIsValidWordsQueryHandler()
            {
            }

            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public virtual async Task<IResult> Handle(CheckIsValidWordsQuery request, CancellationToken cancellationToken)
            {
                bool check2 = false;

                string[] words = request.Text?.Trim().ToLower().Split(' ');

                for (int i = 0; i < words?.Length; i++)
                {
                    bool check1 = SwearWords.Words.Contains(words[i]);
                    if (words.Length > i + 1)
                        check2 = SwearWords.Words.Contains(words[i] + " " + words[i + 1]);
                    if (check1 || check2)
                        return new ErrorResult(Messages.CheckMessage);
                }

                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }

    }
}
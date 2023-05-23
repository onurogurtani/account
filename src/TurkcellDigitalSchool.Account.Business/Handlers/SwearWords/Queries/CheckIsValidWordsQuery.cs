using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.SwearWords.Queries
{
    /// <summary>
    /// CheckIsValidWordsQuery
    /// </summary>
    [LogScope]
    public class CheckIsValidWordsQuery : IRequest<IResult>
    {
        public string? Text { get; set; }

        [MessageClassAttr("Ge�erli Kelime Kontrol�")]
        public class CheckIsValidWordsQueryHandler : IRequestHandler<CheckIsValidWordsQuery, IResult>
        {
            public CheckIsValidWordsQueryHandler()
            {
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string CheckMessage = Messages.CheckMessage;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            
            [SecuredOperation]
            public virtual async Task<IResult> Handle(CheckIsValidWordsQuery request, CancellationToken cancellationToken)
            {
                bool check2 = false;

                string[] words = request.Text?.Trim().ToLower().Split(' ');

                for (int i = 0; i < words?.Length; i++)
                {
                    bool check1 = Common.Constants.SwearWords.Words.Contains(words[i]);
                    if (words.Length > i + 1)
                        check2 = Common.Constants.SwearWords.Words.Contains(words[i] + " " + words[i + 1]);
                    if (check1 || check2)
                        return new ErrorResult(CheckMessage.PrepareRedisMessage());
                }
                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}
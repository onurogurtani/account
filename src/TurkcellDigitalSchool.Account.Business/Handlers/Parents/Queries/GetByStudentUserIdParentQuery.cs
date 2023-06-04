using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Parents.Queries
{
    [ExcludeFromCodeCoverage]
    [LogScope]
    public class GetByStudentUserIdParentQuery : IRequest<DataResult<Parent>>
    {
        public long StudentUserId { get; set; } // student

        [MessageClassAttr("Öðrenci Velisi Görüntüleme")]
        public class GetByStudentUserIdParentQueryHandler : IRequestHandler<GetByStudentUserIdParentQuery, DataResult<Parent>>
        {
            private readonly IParentRepository _parentRepository;

            public GetByStudentUserIdParentQueryHandler(IParentRepository parentRepository)
            {
                _parentRepository = parentRepository;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            /// <summary>
            /// Parent information query with student user Id
            /// </summary>
            
            public async Task<DataResult<Parent>> Handle(GetByStudentUserIdParentQuery request, CancellationToken cancellationToken)
            {
                var parent = await _parentRepository.GetAsync(x => x.UserId == request.StudentUserId);
                return new SuccessDataResult<Parent>(parent, SuccessfulOperation.PrepareRedisMessage());
            }

        }
    }
}

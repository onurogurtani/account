using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Transaction;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Parents.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetByStudentUserIdParentQuery : IRequest<IDataResult<Parent>>
    {
        public long StudentUserId { get; set; } // student

        [MessageClassAttr("��renci Velisi G�r�nt�leme")]
        public class GetByStudentUserIdParentQueryHandler : IRequestHandler<GetByStudentUserIdParentQuery, IDataResult<Parent>>
        {
            private readonly IParentRepository _parentRepository;

            public GetByStudentUserIdParentQueryHandler(IParentRepository parentRepository)
            {
                _parentRepository = parentRepository;
            }

            [MessageConstAttr(MessageCodeType.Success)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            /// <summary>
            /// Parent information query with student user Id
            /// </summary>
            [LogAspect(typeof(FileLogger))]
            [TransactionScopeAspectAsync]
            public async Task<IDataResult<Parent>> Handle(GetByStudentUserIdParentQuery request, CancellationToken cancellationToken)
            {
                var parent = await _parentRepository.GetAsync(x => x.UserId == request.StudentUserId);
                return new SuccessDataResult<Parent>(parent, SuccessfulOperation.PrepareRedisMessage());
            }

        }
    }
}

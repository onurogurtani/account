using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
 
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Queries
{
    [LogScope]
     
    public class GetTeacherQuery : IRequest<DataResult<GetTeacherResponseDto>>
    {
        /// <summary>
        /// Get Teacher
        /// </summary>
        public long Id { get; set; }

        [MessageClassAttr("Öğretmen Görüntüleme")]
        public class GetTeacherQueryHandler : IRequestHandler<GetTeacherQuery, DataResult<GetTeacherResponseDto>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IMapper _mapper;

            public GetTeacherQueryHandler(IUserRepository userRepository, IMapper mapper)
            {
                _userRepository = userRepository;
                _mapper = mapper;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordIsNotFound = Messages.RecordIsNotFound;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public async Task<DataResult<GetTeacherResponseDto>> Handle(GetTeacherQuery request, CancellationToken cancellationToken)
            {
                var teacherQueryable = _userRepository.Query().AsQueryable();

                var data = await teacherQueryable.FirstOrDefaultAsync(x => x.Id == request.Id && x.UserType == UserType.Teacher);
                if (data == null)
                    return new ErrorDataResult<GetTeacherResponseDto>(null, RecordIsNotFound.PrepareRedisMessage());

                var teacher = _mapper.Map<GetTeacherResponseDto>(data);

                return new SuccessDataResult<GetTeacherResponseDto>(teacher, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}
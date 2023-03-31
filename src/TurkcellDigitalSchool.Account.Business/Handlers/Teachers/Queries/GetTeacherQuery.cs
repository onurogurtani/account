using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos.TeacherDtos; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Queries
{
    public class GetTeacherQuery : IRequest<IDataResult<GetTeacherResponseDto>>
    {
        /// <summary>
        /// Get Teacher
        /// </summary>
        public long Id { get; set; }

        public class GetTeacherQueryHandler : IRequestHandler<GetTeacherQuery, IDataResult<GetTeacherResponseDto>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IMapper _mapper;

            public GetTeacherQueryHandler(IUserRepository userRepository, IMapper mapper)
            {
                _userRepository = userRepository;
                _mapper = mapper;
            }

            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<GetTeacherResponseDto>> Handle(GetTeacherQuery request, CancellationToken cancellationToken)
            {
                var teacherQueryable = _userRepository.Query().AsQueryable();


                var data = await teacherQueryable.FirstOrDefaultAsync(x => x.Id == request.Id && x.UserTypeEnum == UserTypeEnum.Teacher);

                if (data == null)
                    return new ErrorDataResult<GetTeacherResponseDto>(null, Messages.RecordIsNotFound);

                var teacher = _mapper.Map<GetTeacherResponseDto>(data);

                return new SuccessDataResult<GetTeacherResponseDto>(teacher, Messages.SuccessfulOperation);
            }
        }
    }
}
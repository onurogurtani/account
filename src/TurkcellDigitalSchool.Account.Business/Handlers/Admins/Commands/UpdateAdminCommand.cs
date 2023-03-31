using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Entities.Dtos.Admin; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands
{
    /// <summary>
    /// Update Admin User
    /// </summary>
    public class UpdateAdminCommand : IRequest<IResult>
    {
        public CreateUpdateAdminDto Admin { get; set; }


        public class UpdateAdminCommandHandler : IRequestHandler<UpdateAdminCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly IUserRoleRepository _userRoleRepository;
            private readonly IMapper _mapper;

            public UpdateAdminCommandHandler(IUserRoleRepository userRoleRepository, IUserRepository userRepository, IMapper mapper)
            {
                _userRepository = userRepository;
                _userRoleRepository = userRoleRepository;
                _mapper = mapper;
            }


            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(CreateAdminValidator), Priority = 2)]
            public async Task<IResult> Handle(UpdateAdminCommand request, CancellationToken cancellationToken)
            {

                var entity = await _userRepository.GetAsync(x => x.Id == request.Admin.Id);
                if (entity == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                _mapper.Map(request.Admin, entity);

                var record = _userRepository.Update(entity);
                await _userRepository.SaveChangesAsync();

                var userGroups = await _userRoleRepository.GetListAsync(x => x.UserId == request.Admin.Id);
                _userRoleRepository.DeleteRange(userGroups);

                foreach (var roleId in request.Admin.RoleIds)
                    _userRoleRepository.Add(new UserRole { RoleId = roleId, UserId = record.Id });
                await _userRoleRepository.SaveChangesAsync();


                //var mappedRecord = _mapper.Map<User, AdminDto>(record);

                //mappedRecord.Roles = _userRoleRepository.Query().Include(x => x.Role).AsQueryable()
                //    .Where(x => !x.IsDeleted && x.UserId == mappedRecord.Id).ToListAsync().GetAwaiter().GetResult()
                //    .Select(x => x.Role).ToList();

                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }
    }
}


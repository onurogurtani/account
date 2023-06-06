using AutoMapper;
using DotNetCore.CAP;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands
{
    /// <summary>
    /// Update Admin User
    /// </summary>
    [TransactionScope]
    [LogScope]
    [SecuredOperation]
    public class UpdateAdminCommand : IRequest<IResult>
    {
        public CreateUpdateAdminDto Admin { get; set; }

        public class UpdateAdminCommandHandler : IRequestHandler<UpdateAdminCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly IUserRoleRepository _userRoleRepository;
            private readonly IMapper _mapper;
            private readonly ITokenHelper _tokenHelper;
            private readonly ICapPublisher _capPublisher;

            public UpdateAdminCommandHandler(IUserRoleRepository userRoleRepository, IUserRepository userRepository, IMapper mapper, ITokenHelper tokenHelper, ICapPublisher capPublisher)
            {
                _userRepository = userRepository;
                _userRoleRepository = userRoleRepository;
                _mapper = mapper;
                _tokenHelper = tokenHelper;
                _capPublisher = capPublisher;
            }

            public async Task<IResult> Handle(UpdateAdminCommand request, CancellationToken cancellationToken)
            {
                long currentuserId = _tokenHelper.GetUserIdByCurrentToken();
                var currentUser = await _userRepository.GetAsync(p => p.Id == currentuserId);

                var entity = await _userRepository.GetAsync(x => x.Id == request.Admin.Id);
                if (entity == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                if (currentUser.UserType == UserType.OrganisationAdmin || currentUser.UserType == UserType.FranchiseAdmin)
                    request.Admin.UserType = UserType.OrganisationAdmin;

                request.Admin.UserName = entity.UserName;
                _mapper.Map(request.Admin, entity);

                var record = _userRepository.Update(entity);
                await _userRepository.SaveChangesAsync();
                await _capPublisher.PublishAsync(entity.GeneratePublishName(EntityState.Modified), entity, cancellationToken: cancellationToken);

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


using System;
using System.Collections.Generic;
using System.Linq;
using DotNetCore.CAP;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Core.SubServices;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.SubServiceConst;

namespace TurkcellDigitalSchool.Account.Business.SubServices
{
    public class OperationCliamCreateRequestServices : BaseSubServices<AccountSubscribeDbContext>
    {
        private readonly IOperationClaimRepository _operationClaimRepository;
        public OperationCliamCreateRequestServices(AccountSubscribeDbContext context, IOperationClaimRepository operationClaimRepository) : base(context)
        {
            _operationClaimRepository = operationClaimRepository;
        }

        [CapSubscribe(SubServiceConst.OPERATION_CLAIM_CREATE_REQUEST)]
        public async Task CreateOperationClaim(List<string> claims)
        { 
            if (!claims.Any())
            {
                return;
            } 
            var dbClaimList = _operationClaimRepository.GetListAsync().Result.Select(s => s.Name).ToList();

            var addingClaims = claims.Select(s => new OperationClaim
            {
                Name = s
            }).Where(w => !dbClaimList.Contains(w.Name)).ToList();

            await _operationClaimRepository.AddRangeAsync(addingClaims);
            await _operationClaimRepository.SaveChangesAsync();
        } 
    }
}

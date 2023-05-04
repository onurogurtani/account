using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework; 

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class ForgetPasswordFailCounterRepository : EfEntityRepositoryBase<ForgetPasswordFailCounter, AccountDbContext>, IForgetPasswordFailCounterRepository
    {
        public ForgetPasswordFailCounterRepository(AccountDbContext context) : base(context)
        {
        }

        private readonly int CsrfTokenExpireHours = 6;

        public async Task ResetCsrfTokenForgetPasswordFailCount(string csrfToken)
        {
            var loginFailCounter = await Context.ForgetPasswordFailCounters.FirstOrDefaultAsync(w =>
                w.CsrfToken == csrfToken);

            if (loginFailCounter == null)
            {
                return;
            }
            loginFailCounter.FailCount = 0;
            await Context.SaveChangesAsync(CancellationToken.None);
        }

        public async Task<int> IncCsrfTokenForgetPasswordFailCount(string csrfToken)
        {
            var expTime = DateTime.Now.AddHours(CsrfTokenExpireHours * -1);
            var loginFailCounter =
                await Context.ForgetPasswordFailCounters.FirstOrDefaultAsync(w =>
                    w.CsrfToken == csrfToken && w.InsertTime >= expTime);

            if (loginFailCounter == null)
            {
                loginFailCounter = new ForgetPasswordFailCounter
                {
                    CsrfToken = csrfToken
                };
                Context.ForgetPasswordFailCounters.Add(loginFailCounter);
            }
            else
            {
                loginFailCounter.UpdateTime = DateTime.Now;
            }
            loginFailCounter.FailCount = (loginFailCounter.FailCount ?? 0) + 1;
            await Context.SaveChangesAsync();
            return (loginFailCounter.FailCount ?? 0);
        }

        public async Task<int> GetCsrfTokenForgetPasswordFailCount(string csrfToken)
        {
            var expTime = DateTime.Now.AddHours(CsrfTokenExpireHours * -1);
            var loginFailCounter = await Context.ForgetPasswordFailCounters.FirstOrDefaultAsync(w => w.CsrfToken == csrfToken && w.InsertTime >= expTime);
            return (loginFailCounter?.FailCount ?? 0);
        }

    }
}

using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class LoginFailCounterRepository : EfEntityRepositoryBase<LoginFailCounter, ProjectDbContext>, ILoginFailCounterRepository
    {
        public LoginFailCounterRepository(ProjectDbContext context) : base(context)
        {
        }

        private readonly int CsrfTokenExpireHours = 6;

        public async Task ResetCsrfTokenFailLoginCount(string csrfToken)
        {
            var expTime = DateTime.Now.AddHours(CsrfTokenExpireHours * -1);
            var loginFailCounter = await Context.LoginFailCounters.FirstOrDefaultAsync(w =>
                w.CsrfToken == csrfToken  && w.InsertTime > expTime);

            if (loginFailCounter != null)
            {
                return;
            }
            loginFailCounter.FailCount = 0;
            await Context.SaveChangesAsync(CancellationToken.None);
        }

        public async Task<int> IncCsrfTokenFailLoginCount(string csrfToken)
        {
            var expTime = DateTime.Now.AddHours(CsrfTokenExpireHours * -1);
            var loginFailCounter =
                await Context.LoginFailCounters.FirstOrDefaultAsync(w =>
                    w.CsrfToken == csrfToken && w.InsertTime >= expTime);

            if (loginFailCounter == null)
            {
                loginFailCounter = new LoginFailCounter();
                Context.LoginFailCounters.Add(loginFailCounter); 
            }
            else
            {
                loginFailCounter.UpdateTime = DateTime.Now; 
            }
            loginFailCounter.FailCount = (loginFailCounter.FailCount ?? 0) + 1;
            await Context.SaveChangesAsync();
            return (loginFailCounter.FailCount ?? 0);
        }

        public async Task<int> GetCsrfTokenFailLoginCount(string csrfToken)
        {
            var expTime = DateTime.Now.AddHours(CsrfTokenExpireHours * -1);
            var loginFailCounter = await Context.LoginFailCounters.FirstOrDefaultAsync(w => w.CsrfToken == csrfToken && w.InsertTime >= expTime);
            return (loginFailCounter?.FailCount ?? 0);
        }




    }
}

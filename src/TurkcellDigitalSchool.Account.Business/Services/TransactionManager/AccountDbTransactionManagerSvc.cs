using DotNetCore.CAP;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Core.TransactionManager;

namespace TurkcellDigitalSchool.Account.Business.Services.TransactionManager
{
    public class AccountDbTransactionManagerSvc : TransactionManagerSvc
    {
        public AccountDbTransactionManagerSvc(AccountDbContext dataContext, ICapPublisher capPublisher) : base(dataContext, capPublisher)
        {
        }
    }
}

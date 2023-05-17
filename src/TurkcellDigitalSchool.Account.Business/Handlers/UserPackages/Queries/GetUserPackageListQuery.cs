using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql;
using ServiceStack;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Transaction;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Queries
{
    public class GetUserPackageListQuery : IRequest<IDataResult<List<long>>>
    {
        public long UserId { get; set; }
        public class GetUserPackageListQueryHandler : IRequestHandler<GetUserPackageListQuery, IDataResult<List<long>>>
        {
            private readonly IConfiguration _configuration;
            private readonly ITokenHelper _tokenHelper;

            public GetUserPackageListQueryHandler(IConfiguration configuration, ITokenHelper tokenHelper)
            {
                _tokenHelper = tokenHelper;
                _configuration = configuration;

            }

            [LogAspect(typeof(FileLogger))]
            [TransactionScopeAspectAsync]
            public async Task<IDataResult<List<long>>> Handle(GetUserPackageListQuery request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();

                var connectionString = _configuration.GetConnectionString("DArchPostgreContext");
                var connection = new NpgsqlConnection(connectionString);
                connection.Open();

                var CommandText = $"with recursive cte as ( select  st.*, 1 lvl from  (select p.id packageid , 0 parentid    from public.package  p"
                + " union all  select pt.testexampackageid packageid, pt.packageid parentid from  public.packagetestexampackage pt"
                + " union all  select ptm.motivationactivitypackageid packageid , ptm.packageid parentid from  public.packagemotivationactivitypackage ptm"
                + " union all  select ptc.coachservicepackageid packageid   , ptc.packageid parentid from  public.packagecoachservicepackages ptc ) st where exists"
                + " (select* from userpackage up where up.packageid = st.packageid and up.userid =" + userId + ")"
                + " union all  select stt.*, c.lvl +1  from  (select p.id packageid, 0 parentid from public.package p"
                + " union all  select pt.testexampackageid packageid , pt.packageid parentid from  public.packagetestexampackage pt"
                + " union all  select ptm.motivationactivitypackageid packageid , ptm.packageid parentid from  public.packagemotivationactivitypackage ptm"
                + " union all  select ptc.coachservicepackageid packageid   , ptc.packageid parentid from  public.packagecoachservicepackages ptc ) stt"
                + " inner join cte c on c.packageid = stt.parentid ) select* from cte join public.packagepackagetypeenum tt on tt.packageid = cte.packageid";

                var userPackageList = new List<long>();

                await using (NpgsqlCommand cmd = new NpgsqlCommand(CommandText, connection))
                {
                    cmd.Parameters.AddWithValue("userId", userId);

                    await using (NpgsqlDataReader reader = await cmd.ExecuteReaderAsync())
                        while (await reader.ReadAsync())
                        {
                            var a = (long)reader["packageid"];
                            userPackageList.Add(a);
                        }
                }

                return new SuccessDataResult<List<long>>(userPackageList, Messages.SuccessfulOperation);
            }

        }
    }
}

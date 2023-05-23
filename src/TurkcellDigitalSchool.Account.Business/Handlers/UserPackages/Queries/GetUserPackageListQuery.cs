using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Configuration;
using Npgsql;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Queries
{
    [LogScope]
    public class GetUserPackageListQuery : IRequest<IDataResult<List<GetUserTestExamPackageDto>>>
    {
        public class GetUserPackageListQueryHandler : IRequestHandler<GetUserPackageListQuery, IDataResult<List<GetUserTestExamPackageDto>>>
        {
            private readonly IConfiguration _configuration;
            private readonly ITokenHelper _tokenHelper;

            public GetUserPackageListQueryHandler(IConfiguration configuration, ITokenHelper tokenHelper)
            {
                _tokenHelper = tokenHelper;
                _configuration = configuration; 
            }

          
            public async Task<IDataResult<List<GetUserTestExamPackageDto>>> Handle(GetUserPackageListQuery request, CancellationToken cancellationToken)
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
                + " inner join cte c on c.packageid = stt.parentid ) select cte.*, tt.* ,p2.testexamid from cte join public.packagepackagetypeenum tt on tt.packageid = cte.packageid"
                + " join public.packagetestexam p2 on p2.packageid = cte.packageid";

                var userPackageList = new List<GetUserTestExamPackageDto>();

                await using (NpgsqlCommand cmd = new NpgsqlCommand(CommandText, connection))
                {
                    cmd.Parameters.AddWithValue("userId", userId);

                    await using (NpgsqlDataReader reader = await cmd.ExecuteReaderAsync())
                        while (await reader.ReadAsync())
                        {
                            var a= new GetUserTestExamPackageDto();
                            a.Id = (long)reader["packageid"];
                            a.TestExamId = (long)reader["testexamid"];
                            userPackageList.Add(a);
                        }
                }

                return new SuccessDataResult<List<GetUserTestExamPackageDto>>(userPackageList, Messages.SuccessfulOperation);
            }

        }
    }
}

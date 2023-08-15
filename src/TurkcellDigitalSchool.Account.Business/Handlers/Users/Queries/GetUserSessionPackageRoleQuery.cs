using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Account.Business.Helpers;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using ServiceStack.Text;
using Npgsql;
using Microsoft.Extensions.Configuration;
using TurkcellDigitalSchool.Account.Domain.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    ///<summary>
    ///Get User Session Package Role
    /// </summary>


    public class GetUserSessionPackageRoleQuery : IRequest<DataResult<PagedList<UserSessionPackageRoleDto>>>
    {
        public int ListType { get; set; } = 0;
        public long? PackageId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public PaginationQuery PaginationQuery { get; set; }

        public class GetUserSessionPackageRoleQueryHandler : IRequestHandler<GetUserSessionPackageRoleQuery, DataResult<PagedList<UserSessionPackageRoleDto>>>
        {
            private readonly IUserSessionRepository _userSessionRepository;
            private readonly ITokenHelper _tokenHelper;
            private readonly AccountDbContext _accountDbContext;
            private readonly IConfiguration _configuration;
            public GetUserSessionPackageRoleQueryHandler(IConfiguration configuration, IUserSessionRepository userSessionRepository, ITokenHelper tokenHelper, AccountDbContext accountDbContext)
            {
                _userSessionRepository = userSessionRepository;
                _tokenHelper = tokenHelper;
                _accountDbContext = accountDbContext;
                _configuration = configuration;
            }

            private class DateRange
            {
                public DateTime StartDate { get; set; }
                public DateTime EndDate { get; set; }
            }

            private PagedList<UserSessionPackageRoleDto> GetPagedList(IQueryable<UserSessionPackageRoleDto> query, PaginationQuery paginationQuery)
            {
                if (paginationQuery == null || paginationQuery.PageSize < 1 || paginationQuery.PageNumber < 1)
                {
                    return new PagedList<UserSessionPackageRoleDto>(query.ToList(), query.Count(), 1, 0);
                }
                var items = query.Skip((paginationQuery.PageNumber - 1) * paginationQuery.PageSize)
                    .Take(paginationQuery.PageSize)
                    .ToList();
                return new PagedList<UserSessionPackageRoleDto>(items, query.Count(), paginationQuery.PageNumber, paginationQuery.PageSize);
            }

            private List<DateRange> GetPeriodList(GetUserSessionPackageRoleQuery request)
            {
                if (request.StartDate.AddMonths(1) > request.EndDate)
                {
                    return GetDailyPeriodList(request, 1);
                }
                else if (request.StartDate.AddMonths(1) < request.EndDate)
                {
                    return GetDailyPeriodList(request, 7);
                }
                else if (request.StartDate.AddMonths(4) < request.EndDate)
                {
                    return GetDailyPeriodList(request, 20);
                }
                else
                {
                    return GetMountlyPeriodList(request);
                }
            }

            private List<DateRange> GetDailyPeriodList(GetUserSessionPackageRoleQuery request, int dayIterator)
            {
                DateTime lastDate = request.StartDate;
                List<DateRange> list = new List<DateRange>();
                while (lastDate <= request.EndDate)
                {
                    DateRange dto = new DateRange { StartDate = lastDate, EndDate = lastDate.AddDays(dayIterator - 1) };
                    if (dto.EndDate > request.EndDate)
                    {
                        dto.EndDate = request.EndDate;
                    }
                    list.Add(dto);
                    lastDate = dto.EndDate.AddDays(1);
                }
                return list;
            }

            private List<DateRange> GetMountlyPeriodList(GetUserSessionPackageRoleQuery request)
            {
                DateTime lastDate = request.StartDate;
                List<DateRange> list = new List<DateRange>();
                while (lastDate <= request.EndDate)
                {
                    DateRange dto = new DateRange { StartDate = lastDate, EndDate = lastDate.AddMonths(1).StartOfLastMonth().AddDays(-1) };
                    if (dto.EndDate > request.EndDate)
                    {
                        dto.EndDate = request.EndDate;
                    }
                    list.Add(dto);
                    lastDate = dto.EndDate.AddDays(1);
                }
                return list;
            }

            private DateTime GetLastDate(DateTime startDate, DateTime endDate, int dayIterator)
            {
                DateTime lastDate = startDate.AddDays(dayIterator);
                if (lastDate > endDate)
                {
                    return endDate.AddDays(1);
                }
                return lastDate;
            }
            private string GetQueryDateString(DateTime date)
            {
                return $"make_date({date.Year}, {date.Month}, {date.Day})";
            }
            private string GetQueryDateBeforeString(DateTime date)
            {
                return $"(date_trunc('day', {GetQueryDateString(date)}) + interval '0 day - 1 msecond')::timestamp";
            }

            private string GetDailyQueryString(GetUserSessionPackageRoleQuery request, int dayIterator)
            {
                DateTime lastDate = GetLastDate(request.StartDate, request.EndDate, dayIterator);
                string period = $"select {GetQueryDateString(request.StartDate)} as startdate, ";
                period += $"{GetQueryDateBeforeString(lastDate)} as enddate";

                while (lastDate <= request.EndDate)
                {
                    period += $" union select {GetQueryDateString(lastDate)}, ";
                    lastDate = GetLastDate(lastDate, request.EndDate, dayIterator);
                    period += $"{GetQueryDateBeforeString(lastDate)}";
                }

                return period;
            }
            private string GetMonthlyQueryString(GetUserSessionPackageRoleQuery request)
            {
                var query = _accountDbContext.UserSessions.Where(w => w.StartTime < request.EndDate && w.EndTime >= request.StartDate);
                var minYear = ((query.OrderBy(o => o.StartTime).FirstOrDefault()?.StartTime) ?? DateTime.Now).Year;
                var maxYear = ((query.OrderByDescending(o => o.EndTime ?? System.DateTime.Now).LastOrDefault()?.EndTime) ?? DateTime.Now).Year;

                string years = $"select {minYear} as y ";

                for (int i = minYear + 1; i <= maxYear; i++)
                {
                    years += $" union select {i}";
                }
                string s = 
                "                    select \n" +
                "                        case when z.startdate < #1# then #1# else z.startdate end startdate,\n" +
                "                        case when z.enddate > #2# then \n" +
                "                        (date_trunc('day', #2#) + interval '1 day - 1 msecond')::timestamp\n" +
                "                        else z.enddate end enddate\n" +
                "                    from (\n" +
                "                        select \n" +
                "                            make_date(y, m, 1) as startdate, \n" +
                "                            (date_trunc('month', make_date(y, m, 1)) + interval '1 month - 1 msecond')::timestamp AS enddate\n" +
                "                        from \n" +
                "                        (    \n" +
                $"                            {years}\n" +
                "                        ) x\n" +
                "                        cross join\n" +
                "                        (\n" +
                "                            select 1 as m, 'OCAK' as mn union select 2, 'ŞUBAT' union select 3, 'MART' union select 4, 'NİSAN' union select 5, 'MAYIS' union select 6, 'HAZİRAN' union select 7, 'TEMMUZ' union select 8, 'AĞUSTOS' union select 9, 'EYLÜL' union select 10, 'EKİM' union select 11, 'KASIM' union select 12, 'ARALIK'\n" +
                "                        ) y\n" +
                "                    ) z\n" + 
                "                    where z.startdate < #2# and coalesce(z.enddate, now()) >= #1#\n";
                s = s.Replace("#1#", $"{GetQueryDateString(request.StartDate)}");
                s = s.Replace("#2#", $"{GetQueryDateString(request.EndDate)}");
                return s;
            }
            private string GetPeriodQueryString(GetUserSessionPackageRoleQuery request)
            {
                if(request.ListType == 0)
                {
                    return GetMonthlyQueryString(request);
                }
                else if (request.StartDate.AddMonths(1) > request.EndDate)
                {
                    return GetDailyQueryString(request, 1);
                }
                else if (request.StartDate.AddMonths(1) < request.EndDate)
                {
                    return GetDailyQueryString(request, 7);
                }
                else if (request.StartDate.AddMonths(4) < request.EndDate)
                {
                    return GetDailyQueryString(request, 20);
                }
                else
                {
                    return GetMonthlyQueryString(request);
                }
            }

            private string GetQueryString(GetUserSessionPackageRoleQuery request)
            {
                string periodQuery = GetPeriodQueryString(request);

                return "select \n" +
                "    p.name packageName, r.name roleName, y.startdate startDate, y.enddate endDate, \n" +
                "    sum(totalminutes) as loginTime,\n" +
                "    sum(logincount) as loginCount\n" +
                "from account.userpackage up\n" +
                "inner join account.userrole ur on up.userid  = ur.userid \n" +
                $"inner join account.package p on up.packageid = p.id {((request.PackageId > 0) ? $"and p.id = {request.PackageId}" : "")}\n" +
                "inner join account.role r on ur.roleid  = r.id \n" +
                "inner join (\n" +
                "    select  \n" +
                "            sum ((date_part('day', ed::timestamp - sd::timestamp)  * 24 + \n" +
                "            date_part('hour', ed::timestamp - sd::timestamp)) * 60 +\n" +
                "            date_part('minute', ed::timestamp - sd::timestamp)) as totalminutes,\n" +
                "            count(*) as logincount,\n" +
                "            userid, startdate, enddate  \n" +
                "    from (        \n" +
                "        select \n" +
                "            d.*,\n" +
                "            us.starttime, us.endtime,  \n" +
                "            case when us.starttime < d.startdate then d.startdate else us.starttime end sd,\n" +
                "            case when coalesce(us.endtime, now()) > d.enddate then d.enddate else coalesce(us.endtime, now()) end ed,\n" +
                "            us.userid \n" +
                "        from account.usersessions us\n" +
                "        inner join (\n" +
                $"                    {periodQuery}\n" +
                "        )  as d on us.starttime <= d.enddate and coalesce(us.endtime, now()) >= d.startdate\n" +
                $"        where us.starttime < make_date({request.EndDate.Year}, {request.EndDate.Month}, {request.EndDate.Day}) and coalesce(us.endtime, now()) >= make_date({request.StartDate.Year}, {request.StartDate.Month}, {request.StartDate.Day}) \n" +
                "    ) x\n" +
                "    group by userid, startdate, enddate\n" +
                ") y on y.userid = ur.userid \n" +
                "group  by p.name, r.name, y.startdate, y.enddate\n";
            }
            private string GetListQueryString(GetUserSessionPackageRoleQuery request)
            {
                string query = GetQueryString(request) +
                "order by y.startdate, p.name, r.name\n" +
                $"limit {request.PaginationQuery.PageSize} offset {request.PaginationQuery.PageSize * (request.PaginationQuery.PageNumber - 1)}\n";
                return query;
            }
            private string GetCountQueryString(GetUserSessionPackageRoleQuery request)
            {
                string query = "select count(*) as totalCount from\n" +
                "(\n" +
                GetQueryString(request) +
                ") c\n";
                return query;
            }
            private async Task<int> GetCount(GetUserSessionPackageRoleQuery request)
            {
                var connectionString = _configuration.GetConnectionString("DArchPostgreContext");
                int count = 0;
                using (var connection = new NpgsqlConnection(connectionString))
                {
                    var commandText = GetCountQueryString(request);
                    connection.Open();
                    await using (NpgsqlCommand cmd = new NpgsqlCommand(commandText, connection))
                    {
                        await using (NpgsqlDataReader reader = await cmd.ExecuteReaderAsync())
                            while (await reader.ReadAsync())
                            {
                                count = Convert.ToInt32(reader["totalCount"]);
                            }
                    }
                    connection.Close();
                }
                return count;
            }
            public virtual async Task<DataResult<PagedList<UserSessionPackageRoleDto>>> Handle(GetUserSessionPackageRoleQuery request, CancellationToken cancellationToken)
            {
                var connectionString = _configuration.GetConnectionString("DArchPostgreContext");

                int count = await GetCount(request);

                var list = new List<UserSessionPackageRoleDto>();

                using (var connection = new NpgsqlConnection(connectionString))
                {
                    var CommandText = GetListQueryString(request);

                    connection.Open();

                    await using (NpgsqlCommand cmd = new NpgsqlCommand(CommandText, connection))
                    {
                        await using (NpgsqlDataReader reader = await cmd.ExecuteReaderAsync())
                            while (await reader.ReadAsync())
                            {
                                list.Add(
                                    new UserSessionPackageRoleDto
                                    {
                                        StartDate = (DateTime)reader["startDate"],
                                        EndDate = (DateTime)reader["endDate"],
                                        PackageName = reader["packageName"].ToString(),
                                        RoleName = reader["roleName"].ToString(),
                                        LoginCount = Convert.ToInt32(reader["loginCount"]),
                                        LoginTime = reader["loginTime"].ToString(),
                                        Year = ((DateTime)reader["startDate"]).Year,
                                        Month = (((DateTime)reader["startDate"]).Month).ToMonthString(),
                                    }
                                );
                            }
                    }
                    connection.Close();
                }
                var pagedList = new PagedList<UserSessionPackageRoleDto>(list, count, request.PaginationQuery.PageNumber, request.PaginationQuery.PageSize);
                return new SuccessDataResult<PagedList<UserSessionPackageRoleDto>>(pagedList);
            }
        }
    }
}
//Package Manager Console açıp > Default Project > DataAccess seçilir

// Eğer IDE'den örneğin staging'e migration yapılacaksa
$env:ASPNETCORE_ENVIRONMENT='DEV'
$env:ASPNETCORE_ENVIRONMENT='Staging'
$env:ASPNETCORE_ENVIRONMENT='Production'


*******************************************************************************************************
// PostgreSQL
$env:ASPNETCORE_ENVIRONMENT='DEV'
Add-Migration organisationType_add_IsSingularOrganisation  -context PostgreDbContext -OutputDir DataAccess/Migrations/Postgre
$env:ASPNETCORE_ENVIRONMENT='DEV'
Update-Database -context PostgreDbContext
 
Remove-Migration   -context PostgreDbContext
*******************************************************************************************************




dotnet ef migrations add InitialCreate --context PostgreDbContext --output-dir Migrations/Postgre

/*
İlk şemayı yartmak için aşağıdaki drop gerekebilir.

drop table public."__EFMigrationsHistory";
drop table public."ContactPreferences";
drop table public."GroupClaims";
drop table public."OperationClaims";
drop table public."UserClaims";
drop table public."UserGroups";
drop table public."Logs";
drop table public."MobileLogins";
drop table public."Groups";
drop table public."Users";

select concat('drop table ',table_schema,'."',cast(table_name as varchar),'";') 
from INFORMATION_SCHEMA.TABLES
where table_schema='public';
*/
//Package Manager Console açıp > Default Project > DataAccess seçilir

// Eğer IDE'den örneğin staging'e migration yapılacaksa
$env:ASPNETCORE_ENVIRONMENT='DEV'
$env:ASPNETCORE_ENVIRONMENT='STAGING' 


*******************************************************************************************************
// PostgreSQL
$env:ASPNETCORE_ENVIRONMENT='DEV'
$env:ASPNETCORE_ENVIRONMENT='STAGING' 
Add-Migration initDb  -context AccountDbContext -OutputDir DataAccess/Migrations/Postgre
$env:ASPNETCORE_ENVIRONMENT='DEV'
$env:ASPNETCORE_ENVIRONMENT='STAGING' 
Update-Database -context AccountDbContext
 
Remove-Migration   -context AccountDbContext
******************************************************************************************************** 
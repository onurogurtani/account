//Package Manager Console açıp > Default Project > DataAccess seçilir

// Eğer IDE'den örneğin staging'e migration yapılacaksa
$env:ASPNETCORE_ENVIRONMENT='DEV'
$env:ASPNETCORE_ENVIRONMENT='Staging'
$env:ASPNETCORE_ENVIRONMENT='Production'


*******************************************************************************************************
// PostgreSQL
$env:ASPNETCORE_ENVIRONMENT='DEV'
Add-Migration initDb  -context AccountDbContext -OutputDir DataAccess/Migrations/Postgre
$env:ASPNETCORE_ENVIRONMENT='DEV'
Update-Database -context AccountDbContext
 
Remove-Migration   -context AccountDbContext
******************************************************************************************************** 
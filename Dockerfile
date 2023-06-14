FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app
EXPOSE 6021
# Copy everything else and build
COPY ./src/ ./ 

COPY ["nuget.config", "."]  
COPY ["Directory.Packages.props", "."]  

RUN dotnet restore ./TurkcellDigitalSchool.Account.Api/TurkcellDigitalSchool.Account.Api.csproj
RUN dotnet publish ./TurkcellDigitalSchool.Account.Api/TurkcellDigitalSchool.Account.Api.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "TurkcellDigitalSchool.Account.Api.dll"]
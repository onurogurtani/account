#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["nuget.config", "."]
COPY ["TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.IdentityServerService/TurkcellDigitalSchool.IdentityServerService.csproj", "TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.IdentityServerService/"]
COPY ["TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Business/TurkcellDigitalSchool.Account.Business.csproj", "TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Business/"]
COPY ["TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.DataAccess/TurkcellDigitalSchool.Account.DataAccess.csproj", "TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.DataAccess/"]
COPY ["TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Domain/TurkcellDigitalSchool.Account.Domain.csproj", "TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Domain/"]
RUN dotnet restore "TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.IdentityServerService/TurkcellDigitalSchool.IdentityServerService.csproj"
COPY . .
WORKDIR "/src/TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.IdentityServerService"
RUN dotnet build "TurkcellDigitalSchool.IdentityServerService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TurkcellDigitalSchool.IdentityServerService.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TurkcellDigitalSchool.IdentityServerService.dll"]
#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["nuget.config", "."]
COPY ["TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Api/TurkcellDigitalSchool.Account.Api.csproj", "TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Api/"]
COPY ["TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Container/TurkcellDigitalSchool.Account.Container.csproj", "TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Container/"]
COPY ["TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Business/TurkcellDigitalSchool.Account.Business.csproj", "TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Business/"]
COPY ["TurkcellDigitalSchool.General/src/TurkcellDigitalSchool.Integration/TurkcellDigitalSchool.Integration.csproj", "TurkcellDigitalSchool.General/src/TurkcellDigitalSchool.Integration/"]
COPY ["TurkcellDigitalSchool.Infrastructure/src/TurkcellDigitalSchool.Core/TurkcellDigitalSchool.Core.csproj", "TurkcellDigitalSchool.Infrastructure/src/TurkcellDigitalSchool.Core/"]
COPY ["TurkcellDigitalSchool.Infrastructure/src/TurkcellDigitalSchool.Common/TurkcellDigitalSchool.Common.csproj", "TurkcellDigitalSchool.Infrastructure/src/TurkcellDigitalSchool.Common/"]
COPY ["TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.DataAccess/TurkcellDigitalSchool.Account.DataAccess.csproj", "TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.DataAccess/"]
COPY ["TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Domain/TurkcellDigitalSchool.Account.Domain.csproj", "TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Domain/"]
COPY ["TurkcellDigitalSchool.General/src/TurkcellDigitalSchool.DbAccess/TurkcellDigitalSchool.DbAccess.csproj", "TurkcellDigitalSchool.General/src/TurkcellDigitalSchool.DbAccess/"]
RUN dotnet restore "TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Api/TurkcellDigitalSchool.Account.Api.csproj"
COPY . .
WORKDIR "/src/TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Api"
RUN dotnet build "TurkcellDigitalSchool.Account.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TurkcellDigitalSchool.Account.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TurkcellDigitalSchool.Account.Api.dll"]
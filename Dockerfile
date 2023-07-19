#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM artifactory.turkcell.com.tr/local-docker-3rd-party/mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

FROM artifactory.turkcell.com.tr/local-docker-3rd-party/mcr.microsoft.com/dotnet/sdk:6.0 AS build

COPY ["./Directory.Packages.props", "src/TurkcellDigitalSchool.Account.Api/"]
COPY ["./src/TurkcellDigitalSchool.Account.Api/TurkcellDigitalSchool.Account.Api.csproj", "src/TurkcellDigitalSchool.Account.Api/"]
COPY ["./src/TurkcellDigitalSchool.Account.Container/TurkcellDigitalSchool.Account.Container.csproj", "src/TurkcellDigitalSchool.Account.Container/"]
COPY ["./src/TurkcellDigitalSchool.Account.Business/TurkcellDigitalSchool.Account.Business.csproj", "src/TurkcellDigitalSchool.Account.Business/"]
COPY ["./src/TurkcellDigitalSchool.Account.DataAccess/TurkcellDigitalSchool.Account.DataAccess.csproj", "src/TurkcellDigitalSchool.Account.DataAccess/"]
COPY ["./src/TurkcellDigitalSchool.Account.Domain/TurkcellDigitalSchool.Account.Domain.csproj", "src/TurkcellDigitalSchool.Account.Domain/"]
RUN dotnet restore "src/TurkcellDigitalSchool.Account.Api/TurkcellDigitalSchool.Account.Api.csproj"  -s https://artifactory.turkcell.com.tr/artifactory/api/nuget/nuget/ 
COPY . .
WORKDIR "src/TurkcellDigitalSchool.Account.Api/"
RUN dotnet build "TurkcellDigitalSchool.Account.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TurkcellDigitalSchool.Account.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app


COPY --from=publish /app/publish .
EXPOSE 6021
ENV ASPNETCORE_ENVIRONMENT="DEVTURKCELL"
ENV ASPNETCORE_URLS="http://+:6021"
ENV TZ=Europe/Istanbul
ENTRYPOINT ["dotnet", "TurkcellDigitalSchool.Account.Api.dll"]
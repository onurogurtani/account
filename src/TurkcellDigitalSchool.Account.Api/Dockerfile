#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM artifactory.turkcell.com.tr/asa/dotnet/6:latest AS base
WORKDIR /app
EXPOSE 80

FROM artifactory.turkcell.com.tr/asa/dotnet/6:latest AS build
WORKDIR /src
COPY ["nuget.config", "."]
COPY ["TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Api/TurkcellDigitalSchool.Account.Api.csproj", "TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Api/"]
COPY ["TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Container/TurkcellDigitalSchool.Account.Container.csproj", "TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Container/"]
COPY ["TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Business/TurkcellDigitalSchool.Account.Business.csproj", "TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Business/"]
COPY ["TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.DataAccess/TurkcellDigitalSchool.Account.DataAccess.csproj", "TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.DataAccess/"]
COPY ["TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Domain/TurkcellDigitalSchool.Account.Domain.csproj", "TurkcellDigitalSchool.Microservices/TurkcellDigitalSchool.Account/src/TurkcellDigitalSchool.Account.Domain/"]
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

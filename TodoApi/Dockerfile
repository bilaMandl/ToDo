# Base image for the runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Set environment variable for ASP.NET Core
ENV ASPNETCORE_URLS=http://+:80

# Use a non-root user for security
USER app

# Build image
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src

# Copy project file and restore dependencies
COPY ["TodoApi/TodoApi.csproj", "./"]
RUN dotnet restore "TodoApi/TodoApi.csproj"

# Copy the rest of the application code
COPY . .

# Build the application
WORKDIR "/src/TodoApi"
RUN dotnet build "TodoApi.csproj" -c $configuration -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "TodoApi.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

# Final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TodoApi.dll"]

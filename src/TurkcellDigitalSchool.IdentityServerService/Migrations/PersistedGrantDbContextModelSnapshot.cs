﻿// <auto-generated />
using System;
using Duende.IdentityServer.EntityFramework.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TurkcellDigitalSchool.IdentityServerService.Migrations
{
    [DbContext(typeof(PersistedGrantDbContext))]
    partial class PersistedGrantDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("account")
                .HasAnnotation("ProductVersion", "6.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Duende.IdentityServer.EntityFramework.Entities.DeviceFlowCodes", b =>
                {
                    b.Property<string>("UserCode")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)")
                        .HasColumnName("usercode");

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)")
                        .HasColumnName("clientid");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("creationtime");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasMaxLength(50000)
                        .HasColumnType("character varying(50000)")
                        .HasColumnName("data");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)")
                        .HasColumnName("description");

                    b.Property<string>("DeviceCode")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)")
                        .HasColumnName("devicecode");

                    b.Property<DateTime?>("Expiration")
                        .IsRequired()
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("expiration");

                    b.Property<string>("SessionId")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("sessionid");

                    b.Property<string>("SubjectId")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)")
                        .HasColumnName("subjectid");

                    b.HasKey("UserCode")
                        .HasName("pk_devicecodes");

                    b.HasIndex("DeviceCode")
                        .IsUnique()
                        .HasDatabaseName("ix_devicecodes_devicecode");

                    b.HasIndex("Expiration")
                        .HasDatabaseName("ix_devicecodes_expiration");

                    b.ToTable("DeviceCodes", "account");
                });

            modelBuilder.Entity("Duende.IdentityServer.EntityFramework.Entities.Key", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<string>("Algorithm")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("algorithm");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("created");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("data");

                    b.Property<bool>("DataProtected")
                        .HasColumnType("boolean")
                        .HasColumnName("dataprotected");

                    b.Property<bool>("IsX509Certificate")
                        .HasColumnType("boolean")
                        .HasColumnName("isx509certificate");

                    b.Property<string>("Use")
                        .HasColumnType("text")
                        .HasColumnName("use");

                    b.Property<int>("Version")
                        .HasColumnType("integer")
                        .HasColumnName("version");

                    b.HasKey("Id")
                        .HasName("pk_keys");

                    b.HasIndex("Use")
                        .HasDatabaseName("ix_keys_use");

                    b.ToTable("Keys", "account");
                });

            modelBuilder.Entity("Duende.IdentityServer.EntityFramework.Entities.PersistedGrant", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)")
                        .HasColumnName("clientid");

                    b.Property<DateTime?>("ConsumedTime")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("consumedtime");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("creationtime");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasMaxLength(50000)
                        .HasColumnType("character varying(50000)")
                        .HasColumnName("data");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)")
                        .HasColumnName("description");

                    b.Property<DateTime?>("Expiration")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("expiration");

                    b.Property<string>("Key")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)")
                        .HasColumnName("key");

                    b.Property<string>("SessionId")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("sessionid");

                    b.Property<string>("SubjectId")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)")
                        .HasColumnName("subjectid");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("type");

                    b.HasKey("Id")
                        .HasName("pk_persistedgrants");

                    b.HasIndex("ConsumedTime")
                        .HasDatabaseName("ix_persistedgrants_consumedtime");

                    b.HasIndex("Expiration")
                        .HasDatabaseName("ix_persistedgrants_expiration");

                    b.HasIndex("Key")
                        .IsUnique()
                        .HasDatabaseName("ix_persistedgrants_key");

                    b.HasIndex("SubjectId", "ClientId", "Type")
                        .HasDatabaseName("ix_persistedgrants_subjectid_clientid_type");

                    b.HasIndex("SubjectId", "SessionId", "Type")
                        .HasDatabaseName("ix_persistedgrants_subjectid_sessionid_type");

                    b.ToTable("PersistedGrants", "account");
                });

            modelBuilder.Entity("Duende.IdentityServer.EntityFramework.Entities.ServerSideSession", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("created");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("data");

                    b.Property<string>("DisplayName")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("displayname");

                    b.Property<DateTime?>("Expires")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("expires");

                    b.Property<string>("Key")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("key");

                    b.Property<DateTime>("Renewed")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("renewed");

                    b.Property<string>("Scheme")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("scheme");

                    b.Property<string>("SessionId")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("sessionid");

                    b.Property<string>("SubjectId")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("subjectid");

                    b.HasKey("Id")
                        .HasName("pk_serversidesessions");

                    b.HasIndex("DisplayName")
                        .HasDatabaseName("ix_serversidesessions_displayname");

                    b.HasIndex("Expires")
                        .HasDatabaseName("ix_serversidesessions_expires");

                    b.HasIndex("Key")
                        .IsUnique()
                        .HasDatabaseName("ix_serversidesessions_key");

                    b.HasIndex("SessionId")
                        .HasDatabaseName("ix_serversidesessions_sessionid");

                    b.HasIndex("SubjectId")
                        .HasDatabaseName("ix_serversidesessions_subjectid");

                    b.ToTable("ServerSideSessions", "account");
                });
#pragma warning restore 612, 618
        }
    }
}

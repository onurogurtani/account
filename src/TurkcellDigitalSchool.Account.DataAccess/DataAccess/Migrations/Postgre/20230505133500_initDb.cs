using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class initDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "appsetting",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    value = table.Column<string>(type: "text", nullable: true),
                    customerid = table.Column<int>(type: "integer", nullable: true),
                    languageid = table.Column<long>(type: "bigint", nullable: true),
                    vouid = table.Column<int>(type: "integer", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_appsetting", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "city",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_city", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "classroom",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: true),
                    code = table.Column<string>(type: "text", nullable: true),
                    isactive = table.Column<bool>(type: "boolean", nullable: false),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_classroom", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "contracttype",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    description = table.Column<string>(type: "text", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_contracttype", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "country",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_country", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "education",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    graduationstatus = table.Column<string>(type: "text", nullable: true),
                    graduationyear = table.Column<string>(type: "text", nullable: true),
                    diplomagrade = table.Column<string>(type: "text", nullable: true),
                    yksexperienceinformation = table.Column<string>(type: "text", nullable: true),
                    institution = table.Column<string>(type: "text", nullable: true),
                    school = table.Column<string>(type: "text", nullable: true),
                    classroom = table.Column<string>(type: "text", nullable: true),
                    field = table.Column<string>(type: "text", nullable: true),
                    isreligiousculturecoursemust = table.Column<bool>(type: "boolean", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_education", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "event",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    isactive = table.Column<bool>(type: "boolean", nullable: false),
                    ispublised = table.Column<bool>(type: "boolean", nullable: false),
                    isdraft = table.Column<bool>(type: "boolean", nullable: false),
                    formid = table.Column<long>(type: "bigint", nullable: true),
                    startdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    enddate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    eventtypeenum = table.Column<int>(type: "integer", nullable: false),
                    keywords = table.Column<string>(type: "text", nullable: true),
                    locationtype = table.Column<int>(type: "integer", nullable: false),
                    physicaladdress = table.Column<string>(type: "text", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_event", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "file",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    filetype = table.Column<int>(type: "integer", nullable: false),
                    filename = table.Column<string>(type: "text", nullable: true),
                    filepath = table.Column<string>(type: "text", nullable: true),
                    contenttype = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_file", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "forgetpasswordfailcounters",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    csrftoken = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    failcount = table.Column<int>(type: "integer", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_forgetpasswordfailcounters", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "graduationyear",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_graduationyear", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "institution",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_institution", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "institutiontype",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_institutiontype", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "loginfailcounters",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    csrftoken = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    failcount = table.Column<int>(type: "integer", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_loginfailcounters", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "loginfailforgetpasssendlinks",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    guid = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    checkcount = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    usedstatus = table.Column<int>(type: "integer", nullable: false),
                    expdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_loginfailforgetpasssendlinks", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "messagemap",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    code = table.Column<string>(type: "text", nullable: true),
                    messagekey = table.Column<string>(type: "text", nullable: true),
                    message = table.Column<string>(type: "text", nullable: true),
                    messageparameters = table.Column<string>(type: "text", nullable: true),
                    userfriendlynameofmessage = table.Column<string>(type: "text", nullable: true),
                    oldversionofuserfriendlymessage = table.Column<string>(type: "text", nullable: true),
                    usedclass = table.Column<string>(type: "text", nullable: true),
                    defaultnameofusedclass = table.Column<string>(type: "text", nullable: true),
                    userfriendlynameofusedclass = table.Column<string>(type: "text", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_messagemap", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "messagetype",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    count = table.Column<int>(type: "integer", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_messagetype", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "mobilelogins",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    provider = table.Column<int>(type: "integer", nullable: false),
                    externaluserid = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    code = table.Column<int>(type: "integer", maxLength: 50, nullable: false),
                    senddate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    lastsenddate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    useddate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    status = table.Column<int>(type: "integer", nullable: false),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    cellphone = table.Column<string>(type: "text", nullable: true),
                    resendcount = table.Column<int>(type: "integer", nullable: false),
                    newpassguid = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    newpassguidexp = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    newpassstatus = table.Column<int>(type: "integer", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_mobilelogins", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "operationclaim",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: true),
                    alias = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    categoryid = table.Column<long>(type: "bigint", nullable: true),
                    categoryname = table.Column<string>(type: "text", nullable: true),
                    vouid = table.Column<int>(type: "integer", nullable: true),
                    vouname = table.Column<string>(type: "text", nullable: true),
                    segmentid = table.Column<int>(type: "integer", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_operationclaim", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "organisationtype",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    description = table.Column<string>(type: "text", nullable: true),
                    issingularorganisation = table.Column<bool>(type: "boolean", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_organisationtype", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "package",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    hascoachservice = table.Column<bool>(type: "boolean", nullable: false),
                    hastryingtest = table.Column<bool>(type: "boolean", nullable: false),
                    tryingtestquestioncount = table.Column<int>(type: "integer", nullable: true),
                    hasmotivationevent = table.Column<bool>(type: "boolean", nullable: false),
                    packagekind = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    summary = table.Column<string>(type: "text", nullable: true),
                    content = table.Column<string>(type: "text", nullable: true),
                    isactive = table.Column<bool>(type: "boolean", nullable: false),
                    startdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    finishdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_package", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "packagetype",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: true),
                    iscanseetargetscreen = table.Column<bool>(type: "boolean", nullable: false),
                    isactive = table.Column<bool>(type: "boolean", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_packagetype", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "parent",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    namesurname = table.Column<string>(type: "text", nullable: true),
                    tc = table.Column<long>(type: "bigint", nullable: false),
                    phone = table.Column<string>(type: "text", nullable: true),
                    email = table.Column<string>(type: "text", nullable: true),
                    passwordsalt = table.Column<byte[]>(type: "bytea", nullable: true),
                    passwordhash = table.Column<byte[]>(type: "bytea", nullable: true),
                    contactoption = table.Column<string>(type: "text", nullable: true),
                    notificationstatus = table.Column<bool>(type: "boolean", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_parent", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "publisher",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    code = table.Column<string>(type: "text", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_publisher", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "role",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    description = table.Column<string>(type: "text", nullable: true),
                    isorganisationview = table.Column<bool>(type: "boolean", nullable: false),
                    usertype = table.Column<int>(type: "integer", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_role", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "targetscreen",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: true),
                    pagename = table.Column<string>(type: "text", nullable: true),
                    isactive = table.Column<bool>(type: "boolean", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_targetscreen", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "testexamtype",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    isactive = table.Column<bool>(type: "boolean", nullable: false),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_testexamtype", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "unverifieduser",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    usertypeid = table.Column<int>(type: "integer", nullable: false),
                    citizenid = table.Column<long>(type: "bigint", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    surname = table.Column<string>(type: "text", nullable: true),
                    email = table.Column<string>(type: "text", nullable: true),
                    mobilephones = table.Column<string>(type: "text", nullable: true),
                    passwordsalt = table.Column<byte[]>(type: "bytea", nullable: true),
                    passwordhash = table.Column<byte[]>(type: "bytea", nullable: true),
                    verificationkey = table.Column<string>(type: "text", nullable: true),
                    verificationkeylasttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_unverifieduser", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    passwordsalt = table.Column<byte[]>(type: "bytea", nullable: true),
                    passwordhash = table.Column<byte[]>(type: "bytea", nullable: true),
                    addingtype = table.Column<int>(type: "integer", nullable: false),
                    relatedidentity = table.Column<string>(type: "character varying(2500)", maxLength: 2500, nullable: true),
                    oauthaccesstoken = table.Column<string>(type: "character varying(2500)", maxLength: 2500, nullable: true),
                    oauthopenidconnecttoken = table.Column<string>(type: "text", nullable: true),
                    registerstatus = table.Column<int>(type: "integer", nullable: false),
                    usertype = table.Column<int>(type: "integer", nullable: false),
                    faillogincount = table.Column<int>(type: "integer", nullable: true),
                    failotpcount = table.Column<int>(type: "integer", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    citizenid = table.Column<long>(type: "bigint", nullable: false),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    surname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    namesurname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    username = table.Column<string>(type: "text", nullable: true),
                    email = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    emailverify = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    mobilephones = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    mobilephonesverify = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    status = table.Column<bool>(type: "boolean", nullable: false),
                    birthdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    birthplace = table.Column<string>(type: "text", nullable: true),
                    genderid = table.Column<int>(type: "integer", nullable: false),
                    recorddate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    address = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    residencecityid = table.Column<long>(type: "bigint", nullable: true),
                    residencecountyid = table.Column<long>(type: "bigint", nullable: true),
                    contactoption = table.Column<string>(type: "text", nullable: true),
                    avatarid = table.Column<long>(type: "bigint", nullable: false),
                    notes = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    updatecontactdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    contactbysms = table.Column<bool>(type: "boolean", nullable: false),
                    contactbymail = table.Column<bool>(type: "boolean", nullable: false),
                    contactbycall = table.Column<bool>(type: "boolean", nullable: false),
                    viewmydata = table.Column<bool>(type: "boolean", nullable: false),
                    usercode = table.Column<Guid>(type: "uuid", nullable: false),
                    remindlater = table.Column<bool>(type: "boolean", nullable: false),
                    lastpassworddate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    lastpasswordchangeguid = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    lastpasswordchangeexptime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    lastwebsessionid = table.Column<long>(type: "bigint", nullable: true),
                    lastwebsessiontime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    lastmobilesessionid = table.Column<long>(type: "bigint", nullable: true),
                    lastmobilesessiontime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "county",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    cityid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_county", x => x.id);
                    table.ForeignKey(
                        name: "fk_county_city_cityid",
                        column: x => x.cityid,
                        principalTable: "city",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "lesson",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: true),
                    order = table.Column<int>(type: "integer", nullable: false),
                    isactive = table.Column<bool>(type: "boolean", nullable: false),
                    classroomid = table.Column<long>(type: "bigint", nullable: false),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_lesson", x => x.id);
                    table.ForeignKey(
                        name: "fk_lesson_classroom_classroomid",
                        column: x => x.classroomid,
                        principalTable: "classroom",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "contractkind",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    description = table.Column<string>(type: "text", nullable: true),
                    contracttypeid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_contractkind", x => x.id);
                    table.ForeignKey(
                        name: "fk_contractkind_contracttypes_contracttypeid",
                        column: x => x.contracttypeid,
                        principalTable: "contracttype",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "message",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    messagekey = table.Column<string>(type: "text", nullable: true),
                    usedclass = table.Column<string>(type: "text", nullable: true),
                    messagenumber = table.Column<int>(type: "integer", nullable: false),
                    messagetypeid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_message", x => x.id);
                    table.ForeignKey(
                        name: "fk_message_messagetypes_messagetypeid",
                        column: x => x.messagetypeid,
                        principalTable: "messagetype",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "organisation",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    crmid = table.Column<long>(type: "bigint", nullable: false),
                    organisationmanager = table.Column<string>(type: "text", nullable: true),
                    customernumber = table.Column<string>(type: "text", nullable: true),
                    customermanager = table.Column<string>(type: "text", nullable: true),
                    organisationtypeid = table.Column<long>(type: "bigint", nullable: false),
                    organisationaddress = table.Column<string>(type: "text", nullable: true),
                    organisationmail = table.Column<string>(type: "text", nullable: true),
                    organisationwebsite = table.Column<string>(type: "text", nullable: true),
                    organisationimageid = table.Column<long>(type: "bigint", nullable: false),
                    segmenttype = table.Column<int>(type: "integer", nullable: false),
                    cityid = table.Column<long>(type: "bigint", nullable: false),
                    countyid = table.Column<long>(type: "bigint", nullable: false),
                    contactname = table.Column<string>(type: "text", nullable: true),
                    contactmail = table.Column<string>(type: "text", nullable: true),
                    contactphone = table.Column<string>(type: "text", nullable: true),
                    contractstartdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    contractfinishdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    packagekind = table.Column<int>(type: "integer", nullable: false),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    packagename = table.Column<string>(type: "text", nullable: true),
                    licencenumber = table.Column<int>(type: "integer", nullable: false),
                    domainname = table.Column<string>(type: "text", nullable: true),
                    membershipstartdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    membershipfinishdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    adminname = table.Column<string>(type: "text", nullable: true),
                    adminsurname = table.Column<string>(type: "text", nullable: true),
                    admintc = table.Column<string>(type: "text", nullable: true),
                    adminmail = table.Column<string>(type: "text", nullable: true),
                    adminphone = table.Column<string>(type: "text", nullable: true),
                    serviceinfochoice = table.Column<int>(type: "integer", nullable: false),
                    contractnumber = table.Column<string>(type: "text", nullable: true),
                    hostname = table.Column<string>(type: "text", nullable: true),
                    apikey = table.Column<string>(type: "text", nullable: true),
                    apisecret = table.Column<string>(type: "text", nullable: true),
                    virtualtrainingroomquota = table.Column<int>(type: "integer", nullable: false),
                    virtualmeetingroomquota = table.Column<int>(type: "integer", nullable: false),
                    organisationstatusinfo = table.Column<int>(type: "integer", nullable: false),
                    reasonforstatus = table.Column<string>(type: "text", nullable: true),
                    parantid = table.Column<long>(type: "bigint", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_organisation", x => x.id);
                    table.ForeignKey(
                        name: "fk_organisation_organisationtypes_organisationtypeid",
                        column: x => x.organisationtypeid,
                        principalTable: "organisationtype",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "imageofpackage",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    fileid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_imageofpackage", x => x.id);
                    table.ForeignKey(
                        name: "fk_imageofpackage_files_fileid",
                        column: x => x.fileid,
                        principalTable: "file",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_imageofpackage_packages_packageid",
                        column: x => x.packageid,
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagecoachservicepackages",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    coachservicepackageid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_packagecoachservicepackages", x => x.id);
                    table.ForeignKey(
                        name: "fk_packagecoachservicepackages_packages_packageid",
                        column: x => x.packageid,
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagecontracttypes",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    contracttypeid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_packagecontracttypes", x => x.id);
                    table.ForeignKey(
                        name: "fk_packagecontracttypes_contracttypes_contracttypeid",
                        column: x => x.contracttypeid,
                        principalTable: "contracttype",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_packagecontracttypes_packages_packageid",
                        column: x => x.packageid,
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packageevent",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    eventid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_packageevent", x => x.id);
                    table.ForeignKey(
                        name: "fk_packageevent_events_eventid",
                        column: x => x.eventid,
                        principalTable: "event",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_packageevent_package_packageid",
                        column: x => x.packageid,
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagefieldtype",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    fieldtype = table.Column<int>(type: "integer", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_packagefieldtype", x => x.id);
                    table.ForeignKey(
                        name: "fk_packagefieldtype_packages_packageid",
                        column: x => x.packageid,
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagemotivationactivitypackage",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    motivationactivitypackageid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_packagemotivationactivitypackage", x => x.id);
                    table.ForeignKey(
                        name: "fk_packagemotivationactivitypackage_package_packageid",
                        column: x => x.packageid,
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagepackagetypeenum",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    packagetypeenum = table.Column<int>(type: "integer", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_packagepackagetypeenum", x => x.id);
                    table.ForeignKey(
                        name: "fk_packagepackagetypeenum_package_packageid",
                        column: x => x.packageid,
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagetestexampackage",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    testexampackageid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_packagetestexampackage", x => x.id);
                    table.ForeignKey(
                        name: "fk_packagetestexampackage_package_packageid",
                        column: x => x.packageid,
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "studentanswertargetrange",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    targetrangemin = table.Column<decimal>(type: "numeric", nullable: false),
                    targetrangemax = table.Column<decimal>(type: "numeric", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_studentanswertargetrange", x => x.id);
                    table.ForeignKey(
                        name: "fk_studentanswertargetrange_package_packageid",
                        column: x => x.packageid,
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagepublisher",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    publisherid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_packagepublisher", x => x.id);
                    table.ForeignKey(
                        name: "fk_packagepublisher_package_packageid",
                        column: x => x.packageid,
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_packagepublisher_publishers_publisherid",
                        column: x => x.publisherid,
                        principalTable: "publisher",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagerole",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    roleid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_packagerole", x => x.id);
                    table.ForeignKey(
                        name: "fk_packagerole_package_packageid",
                        column: x => x.packageid,
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_packagerole_roles_roleid",
                        column: x => x.roleid,
                        principalTable: "role",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "roleclaim",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    roleid = table.Column<long>(type: "bigint", nullable: false),
                    claimname = table.Column<string>(type: "text", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_roleclaim", x => x.id);
                    table.ForeignKey(
                        name: "fk_roleclaim_roles_roleid",
                        column: x => x.roleid,
                        principalTable: "role",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagetypetargetscreen",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    targetscreenid = table.Column<long>(type: "bigint", nullable: false),
                    packagetypeid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_packagetypetargetscreen", x => x.id);
                    table.ForeignKey(
                        name: "fk_packagetypetargetscreen_packagetype_packagetypeid",
                        column: x => x.packagetypeid,
                        principalTable: "packagetype",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_packagetypetargetscreen_targetscreens_targetscreenid",
                        column: x => x.targetscreenid,
                        principalTable: "targetscreen",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "testexam",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    code = table.Column<string>(type: "text", nullable: true),
                    testexamtypeid = table.Column<long>(type: "bigint", nullable: false),
                    islivetestexam = table.Column<bool>(type: "boolean", nullable: false),
                    keywords = table.Column<string>(type: "text", nullable: true),
                    classroomid = table.Column<long>(type: "bigint", nullable: false),
                    difficulty = table.Column<int>(type: "integer", nullable: false),
                    testexamtime = table.Column<int>(type: "integer", nullable: false),
                    startdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    finishdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    testexamstatus = table.Column<int>(type: "integer", nullable: false),
                    examtype = table.Column<int>(type: "integer", nullable: true),
                    transitionbetweenquestions = table.Column<bool>(type: "boolean", nullable: false),
                    transitionbetweensections = table.Column<bool>(type: "boolean", nullable: false),
                    isallowdownloadpdf = table.Column<bool>(type: "boolean", nullable: false),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_testexam", x => x.id);
                    table.ForeignKey(
                        name: "fk_testexam_classroom_classroomid",
                        column: x => x.classroomid,
                        principalTable: "classroom",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_testexam_testexamtypes_testexamtypeid",
                        column: x => x.testexamtypeid,
                        principalTable: "testexamtype",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "studentparentinformation",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    surname = table.Column<string>(type: "text", nullable: true),
                    citizenid = table.Column<string>(type: "text", nullable: true),
                    email = table.Column<string>(type: "text", nullable: true),
                    mobilphones = table.Column<string>(type: "text", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_studentparentinformation", x => x.id);
                    table.ForeignKey(
                        name: "fk_studentparentinformation_users_userid",
                        column: x => x.userid,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "userbasketpackages",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    quantity = table.Column<int>(type: "integer", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_userbasketpackages", x => x.id);
                    table.ForeignKey(
                        name: "fk_userbasketpackages_packages_packageid",
                        column: x => x.packageid,
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_userbasketpackages_users_userid",
                        column: x => x.userid,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usercommunicationpreferences",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    issms = table.Column<bool>(type: "boolean", nullable: true),
                    isemail = table.Column<bool>(type: "boolean", nullable: true),
                    iscall = table.Column<bool>(type: "boolean", nullable: true),
                    isnotification = table.Column<bool>(type: "boolean", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_usercommunicationpreferences", x => x.id);
                    table.ForeignKey(
                        name: "fk_usercommunicationpreferences_users_userid",
                        column: x => x.userid,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "userpackages",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    purchasedate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_userpackages", x => x.id);
                    table.ForeignKey(
                        name: "fk_userpackages_packages_packageid",
                        column: x => x.packageid,
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_userpackages_users_userid",
                        column: x => x.userid,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "userrole",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    roleid = table.Column<long>(type: "bigint", nullable: false),
                    packageid = table.Column<long>(type: "bigint", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_userrole", x => x.id);
                    table.ForeignKey(
                        name: "fk_userrole_package_packageid",
                        column: x => x.packageid,
                        principalTable: "package",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_userrole_role_roleid",
                        column: x => x.roleid,
                        principalTable: "role",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_userrole_users_userid",
                        column: x => x.userid,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usersessions",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    lasttokendate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    notbefore = table.Column<int>(type: "integer", nullable: false),
                    sessiontype = table.Column<int>(type: "integer", nullable: false),
                    starttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    endtime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    refreshtoken = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    ipadress = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    deviceinfo = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_usersessions", x => x.id);
                    table.ForeignKey(
                        name: "fk_usersessions_users_userid",
                        column: x => x.userid,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usersupportteamviewmydata",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    isviewmydata = table.Column<bool>(type: "boolean", nullable: false),
                    isfifteenminutes = table.Column<bool>(type: "boolean", nullable: true),
                    isonemonth = table.Column<bool>(type: "boolean", nullable: true),
                    isalways = table.Column<bool>(type: "boolean", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_usersupportteamviewmydata", x => x.id);
                    table.ForeignKey(
                        name: "fk_usersupportteamviewmydata_users_userid",
                        column: x => x.userid,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "school",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    institutionid = table.Column<long>(type: "bigint", nullable: true),
                    institutiontypeid = table.Column<long>(type: "bigint", nullable: true),
                    cityid = table.Column<long>(type: "bigint", nullable: true),
                    countyid = table.Column<long>(type: "bigint", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_school", x => x.id);
                    table.ForeignKey(
                        name: "fk_school_city_cityid",
                        column: x => x.cityid,
                        principalTable: "city",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_school_county_countyid",
                        column: x => x.countyid,
                        principalTable: "county",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_school_institution_institutionid",
                        column: x => x.institutionid,
                        principalTable: "institution",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_school_institutiontype_institutiontypeid",
                        column: x => x.institutiontypeid,
                        principalTable: "institutiontype",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "packagelesson",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    lessonid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_packagelesson", x => x.id);
                    table.ForeignKey(
                        name: "fk_packagelesson_lessons_lessonid",
                        column: x => x.lessonid,
                        principalTable: "lesson",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_packagelesson_package_packageid",
                        column: x => x.packageid,
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "document",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    content = table.Column<string>(type: "text", nullable: true),
                    version = table.Column<int>(type: "integer", nullable: false),
                    requiredapproval = table.Column<bool>(type: "boolean", nullable: false),
                    clientrequiredapproval = table.Column<bool>(type: "boolean", nullable: false),
                    contractkindid = table.Column<long>(type: "bigint", nullable: false),
                    validstartdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    validenddate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_document", x => x.id);
                    table.ForeignKey(
                        name: "fk_document_contractkind_contractkindid",
                        column: x => x.contractkindid,
                        principalTable: "contractkind",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "branchmainfield",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    isactive = table.Column<bool>(type: "boolean", nullable: false),
                    organisationid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_branchmainfield", x => x.id);
                    table.ForeignKey(
                        name: "fk_branchmainfield_organisation_organisationid",
                        column: x => x.organisationid,
                        principalTable: "organisation",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "organisationinfochangerequests",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    requestdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    requeststate = table.Column<int>(type: "integer", nullable: false),
                    responsestate = table.Column<int>(type: "integer", nullable: false),
                    organisationid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_organisationinfochangerequests", x => x.id);
                    table.ForeignKey(
                        name: "fk_organisationinfochangerequests_organisations_organisationid",
                        column: x => x.organisationid,
                        principalTable: "organisation",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "organisationuser",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    organisationid = table.Column<long>(type: "bigint", nullable: false),
                    isactive = table.Column<bool>(type: "boolean", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_organisationuser", x => x.id);
                    table.ForeignKey(
                        name: "fk_organisationuser_organisation_organisationid",
                        column: x => x.organisationid,
                        principalTable: "organisation",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_organisationuser_users_userid",
                        column: x => x.userid,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagetestexam",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    testexamid = table.Column<long>(type: "bigint", nullable: false),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_packagetestexam", x => x.id);
                    table.ForeignKey(
                        name: "fk_packagetestexam_package_packageid",
                        column: x => x.packageid,
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_packagetestexam_testexams_testexamid",
                        column: x => x.testexamid,
                        principalTable: "testexam",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "studenteducationinformation",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    examtype = table.Column<int>(type: "integer", nullable: false),
                    cityid = table.Column<long>(type: "bigint", nullable: false),
                    countyid = table.Column<long>(type: "bigint", nullable: false),
                    institutionid = table.Column<long>(type: "bigint", nullable: false),
                    schoolid = table.Column<long>(type: "bigint", nullable: false),
                    classroomid = table.Column<long>(type: "bigint", nullable: true),
                    isgraduate = table.Column<bool>(type: "boolean", nullable: true),
                    graduationyearid = table.Column<long>(type: "bigint", nullable: true),
                    diplomagrade = table.Column<double>(type: "double precision", nullable: true),
                    yksstatement = table.Column<int>(type: "integer", nullable: true),
                    fieldtype = table.Column<int>(type: "integer", nullable: true),
                    pointtype = table.Column<int>(type: "integer", nullable: true),
                    religionlessonstatus = table.Column<bool>(type: "boolean", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_studenteducationinformation", x => x.id);
                    table.ForeignKey(
                        name: "fk_studenteducationinformation_city_cityid",
                        column: x => x.cityid,
                        principalTable: "city",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_studenteducationinformation_classrooms_classroomid",
                        column: x => x.classroomid,
                        principalTable: "classroom",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_studenteducationinformation_county_countyid",
                        column: x => x.countyid,
                        principalTable: "county",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_studenteducationinformation_graduationyear_graduationyearid",
                        column: x => x.graduationyearid,
                        principalTable: "graduationyear",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_studenteducationinformation_institution_institutionid",
                        column: x => x.institutionid,
                        principalTable: "institution",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_studenteducationinformation_school_schoolid",
                        column: x => x.schoolid,
                        principalTable: "school",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_studenteducationinformation_users_userid",
                        column: x => x.userid,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "documentcontracttype",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    contracttypeid = table.Column<long>(type: "bigint", nullable: false),
                    documentid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_documentcontracttype", x => x.id);
                    table.ForeignKey(
                        name: "fk_documentcontracttype_contracttype_contracttypeid",
                        column: x => x.contracttypeid,
                        principalTable: "contracttype",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_documentcontracttype_documents_documentid",
                        column: x => x.documentid,
                        principalTable: "document",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagedocument",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    documentid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_packagedocument", x => x.id);
                    table.ForeignKey(
                        name: "fk_packagedocument_documents_documentid",
                        column: x => x.documentid,
                        principalTable: "document",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_packagedocument_packages_packageid",
                        column: x => x.packageid,
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usercontrat",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    documentid = table.Column<long>(type: "bigint", nullable: false),
                    isaccepted = table.Column<bool>(type: "boolean", nullable: true),
                    accepteddate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    islastversion = table.Column<bool>(type: "boolean", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_usercontrat", x => x.id);
                    table.ForeignKey(
                        name: "fk_usercontrat_document_documentid",
                        column: x => x.documentid,
                        principalTable: "document",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_usercontrat_users_userid",
                        column: x => x.userid,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "organisationchangereqcontents",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    requestid = table.Column<long>(type: "bigint", nullable: false),
                    propertyenum = table.Column<int>(type: "integer", nullable: false),
                    propertyvalue = table.Column<string>(type: "text", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_organisationchangereqcontents", x => x.id);
                    table.ForeignKey(
                        name: "fk_organisationchangereqcontents_organisationinfochangerequest~",
                        column: x => x.requestid,
                        principalTable: "organisationinfochangerequests",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_branchmainfield_organisationid",
                table: "branchmainfield",
                column: "organisationid");

            migrationBuilder.CreateIndex(
                name: "ix_contractkind_contracttypeid",
                table: "contractkind",
                column: "contracttypeid");

            migrationBuilder.CreateIndex(
                name: "ix_county_cityid",
                table: "county",
                column: "cityid");

            migrationBuilder.CreateIndex(
                name: "ix_document_contractkindid",
                table: "document",
                column: "contractkindid");

            migrationBuilder.CreateIndex(
                name: "ix_documentcontracttype_contracttypeid",
                table: "documentcontracttype",
                column: "contracttypeid");

            migrationBuilder.CreateIndex(
                name: "ix_documentcontracttype_documentid",
                table: "documentcontracttype",
                column: "documentid");

            migrationBuilder.CreateIndex(
                name: "ix_forgetpasswordfailcounters_csrftoken",
                table: "forgetpasswordfailcounters",
                column: "csrftoken");

            migrationBuilder.CreateIndex(
                name: "ix_forgetpasswordfailcounters_inserttime",
                table: "forgetpasswordfailcounters",
                column: "inserttime");

            migrationBuilder.CreateIndex(
                name: "ix_imageofpackage_fileid",
                table: "imageofpackage",
                column: "fileid");

            migrationBuilder.CreateIndex(
                name: "ix_imageofpackage_packageid",
                table: "imageofpackage",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_lesson_classroomid",
                table: "lesson",
                column: "classroomid");

            migrationBuilder.CreateIndex(
                name: "ix_loginfailcounters_csrftoken",
                table: "loginfailcounters",
                column: "csrftoken");

            migrationBuilder.CreateIndex(
                name: "ix_loginfailcounters_inserttime",
                table: "loginfailcounters",
                column: "inserttime");

            migrationBuilder.CreateIndex(
                name: "ix_loginfailforgetpasssendlinks_expdate",
                table: "loginfailforgetpasssendlinks",
                column: "expdate");

            migrationBuilder.CreateIndex(
                name: "ix_loginfailforgetpasssendlinks_guid_userid",
                table: "loginfailforgetpasssendlinks",
                columns: new[] { "guid", "userid" });

            migrationBuilder.CreateIndex(
                name: "ix_message_messagetypeid",
                table: "message",
                column: "messagetypeid");

            migrationBuilder.CreateIndex(
                name: "ix_mobilelogins_id_newpassguid_newpassstatus_newpassguidexp",
                table: "mobilelogins",
                columns: new[] { "id", "newpassguid", "newpassstatus", "newpassguidexp" });

            migrationBuilder.CreateIndex(
                name: "ix_mobilelogins_userid_externaluserid_provider",
                table: "mobilelogins",
                columns: new[] { "userid", "externaluserid", "provider" });

            migrationBuilder.CreateIndex(
                name: "ix_organisation_organisationtypeid",
                table: "organisation",
                column: "organisationtypeid");

            migrationBuilder.CreateIndex(
                name: "ix_organisationchangereqcontents_requestid",
                table: "organisationchangereqcontents",
                column: "requestid");

            migrationBuilder.CreateIndex(
                name: "ix_organisationinfochangerequests_organisationid",
                table: "organisationinfochangerequests",
                column: "organisationid");

            migrationBuilder.CreateIndex(
                name: "ix_organisationuser_organisationid",
                table: "organisationuser",
                column: "organisationid");

            migrationBuilder.CreateIndex(
                name: "ix_organisationuser_userid",
                table: "organisationuser",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "ix_packagecoachservicepackages_packageid",
                table: "packagecoachservicepackages",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagecontracttypes_contracttypeid",
                table: "packagecontracttypes",
                column: "contracttypeid");

            migrationBuilder.CreateIndex(
                name: "ix_packagecontracttypes_packageid",
                table: "packagecontracttypes",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagedocument_documentid",
                table: "packagedocument",
                column: "documentid");

            migrationBuilder.CreateIndex(
                name: "ix_packagedocument_packageid",
                table: "packagedocument",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packageevent_eventid",
                table: "packageevent",
                column: "eventid");

            migrationBuilder.CreateIndex(
                name: "ix_packageevent_packageid",
                table: "packageevent",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagefieldtype_packageid",
                table: "packagefieldtype",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagelesson_lessonid",
                table: "packagelesson",
                column: "lessonid");

            migrationBuilder.CreateIndex(
                name: "ix_packagelesson_packageid",
                table: "packagelesson",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagemotivationactivitypackage_packageid",
                table: "packagemotivationactivitypackage",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagepackagetypeenum_packageid",
                table: "packagepackagetypeenum",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagepublisher_packageid",
                table: "packagepublisher",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagepublisher_publisherid",
                table: "packagepublisher",
                column: "publisherid");

            migrationBuilder.CreateIndex(
                name: "ix_packagerole_packageid",
                table: "packagerole",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagerole_roleid",
                table: "packagerole",
                column: "roleid");

            migrationBuilder.CreateIndex(
                name: "ix_packagetestexam_packageid",
                table: "packagetestexam",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagetestexam_testexamid",
                table: "packagetestexam",
                column: "testexamid");

            migrationBuilder.CreateIndex(
                name: "ix_packagetestexampackage_packageid",
                table: "packagetestexampackage",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagetypetargetscreen_packagetypeid",
                table: "packagetypetargetscreen",
                column: "packagetypeid");

            migrationBuilder.CreateIndex(
                name: "ix_packagetypetargetscreen_targetscreenid",
                table: "packagetypetargetscreen",
                column: "targetscreenid");

            migrationBuilder.CreateIndex(
                name: "ix_roleclaim_roleid",
                table: "roleclaim",
                column: "roleid");

            migrationBuilder.CreateIndex(
                name: "ix_school_cityid",
                table: "school",
                column: "cityid");

            migrationBuilder.CreateIndex(
                name: "ix_school_countyid",
                table: "school",
                column: "countyid");

            migrationBuilder.CreateIndex(
                name: "ix_school_institutionid",
                table: "school",
                column: "institutionid");

            migrationBuilder.CreateIndex(
                name: "ix_school_institutiontypeid",
                table: "school",
                column: "institutiontypeid");

            migrationBuilder.CreateIndex(
                name: "ix_studentanswertargetrange_packageid",
                table: "studentanswertargetrange",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_studenteducationinformation_cityid",
                table: "studenteducationinformation",
                column: "cityid");

            migrationBuilder.CreateIndex(
                name: "ix_studenteducationinformation_classroomid",
                table: "studenteducationinformation",
                column: "classroomid");

            migrationBuilder.CreateIndex(
                name: "ix_studenteducationinformation_countyid",
                table: "studenteducationinformation",
                column: "countyid");

            migrationBuilder.CreateIndex(
                name: "ix_studenteducationinformation_graduationyearid",
                table: "studenteducationinformation",
                column: "graduationyearid");

            migrationBuilder.CreateIndex(
                name: "ix_studenteducationinformation_institutionid",
                table: "studenteducationinformation",
                column: "institutionid");

            migrationBuilder.CreateIndex(
                name: "ix_studenteducationinformation_schoolid",
                table: "studenteducationinformation",
                column: "schoolid");

            migrationBuilder.CreateIndex(
                name: "ix_studenteducationinformation_userid",
                table: "studenteducationinformation",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "ix_studentparentinformation_userid",
                table: "studentparentinformation",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "ix_testexam_classroomid",
                table: "testexam",
                column: "classroomid");

            migrationBuilder.CreateIndex(
                name: "ix_testexam_testexamtypeid",
                table: "testexam",
                column: "testexamtypeid");

            migrationBuilder.CreateIndex(
                name: "ix_userbasketpackages_packageid",
                table: "userbasketpackages",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_userbasketpackages_userid",
                table: "userbasketpackages",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "ix_usercommunicationpreferences_userid",
                table: "usercommunicationpreferences",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "ix_usercontrat_documentid",
                table: "usercontrat",
                column: "documentid");

            migrationBuilder.CreateIndex(
                name: "ix_usercontrat_userid",
                table: "usercontrat",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "ix_userpackages_packageid",
                table: "userpackages",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_userpackages_userid",
                table: "userpackages",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "ix_userrole_packageid",
                table: "userrole",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_userrole_roleid",
                table: "userrole",
                column: "roleid");

            migrationBuilder.CreateIndex(
                name: "ix_userrole_userid",
                table: "userrole",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "ix_users_citizenid",
                table: "users",
                column: "citizenid",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_users_email",
                table: "users",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_users_mobilephones",
                table: "users",
                column: "mobilephones");

            migrationBuilder.CreateIndex(
                name: "ix_users_relatedidentity",
                table: "users",
                column: "relatedidentity",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_usersessions_starttime",
                table: "usersessions",
                column: "starttime");

            migrationBuilder.CreateIndex(
                name: "ix_usersessions_userid_sessiontype_endtime",
                table: "usersessions",
                columns: new[] { "userid", "sessiontype", "endtime" });

            migrationBuilder.CreateIndex(
                name: "ix_usersupportteamviewmydata_userid",
                table: "usersupportteamviewmydata",
                column: "userid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "appsetting");

            migrationBuilder.DropTable(
                name: "branchmainfield");

            migrationBuilder.DropTable(
                name: "country");

            migrationBuilder.DropTable(
                name: "documentcontracttype");

            migrationBuilder.DropTable(
                name: "education");

            migrationBuilder.DropTable(
                name: "forgetpasswordfailcounters");

            migrationBuilder.DropTable(
                name: "imageofpackage");

            migrationBuilder.DropTable(
                name: "loginfailcounters");

            migrationBuilder.DropTable(
                name: "loginfailforgetpasssendlinks");

            migrationBuilder.DropTable(
                name: "message");

            migrationBuilder.DropTable(
                name: "messagemap");

            migrationBuilder.DropTable(
                name: "mobilelogins");

            migrationBuilder.DropTable(
                name: "operationclaim");

            migrationBuilder.DropTable(
                name: "organisationchangereqcontents");

            migrationBuilder.DropTable(
                name: "organisationuser");

            migrationBuilder.DropTable(
                name: "packagecoachservicepackages");

            migrationBuilder.DropTable(
                name: "packagecontracttypes");

            migrationBuilder.DropTable(
                name: "packagedocument");

            migrationBuilder.DropTable(
                name: "packageevent");

            migrationBuilder.DropTable(
                name: "packagefieldtype");

            migrationBuilder.DropTable(
                name: "packagelesson");

            migrationBuilder.DropTable(
                name: "packagemotivationactivitypackage");

            migrationBuilder.DropTable(
                name: "packagepackagetypeenum");

            migrationBuilder.DropTable(
                name: "packagepublisher");

            migrationBuilder.DropTable(
                name: "packagerole");

            migrationBuilder.DropTable(
                name: "packagetestexam");

            migrationBuilder.DropTable(
                name: "packagetestexampackage");

            migrationBuilder.DropTable(
                name: "packagetypetargetscreen");

            migrationBuilder.DropTable(
                name: "parent");

            migrationBuilder.DropTable(
                name: "roleclaim");

            migrationBuilder.DropTable(
                name: "studentanswertargetrange");

            migrationBuilder.DropTable(
                name: "studenteducationinformation");

            migrationBuilder.DropTable(
                name: "studentparentinformation");

            migrationBuilder.DropTable(
                name: "unverifieduser");

            migrationBuilder.DropTable(
                name: "userbasketpackages");

            migrationBuilder.DropTable(
                name: "usercommunicationpreferences");

            migrationBuilder.DropTable(
                name: "usercontrat");

            migrationBuilder.DropTable(
                name: "userpackages");

            migrationBuilder.DropTable(
                name: "userrole");

            migrationBuilder.DropTable(
                name: "usersessions");

            migrationBuilder.DropTable(
                name: "usersupportteamviewmydata");

            migrationBuilder.DropTable(
                name: "file");

            migrationBuilder.DropTable(
                name: "messagetype");

            migrationBuilder.DropTable(
                name: "organisationinfochangerequests");

            migrationBuilder.DropTable(
                name: "event");

            migrationBuilder.DropTable(
                name: "lesson");

            migrationBuilder.DropTable(
                name: "publisher");

            migrationBuilder.DropTable(
                name: "testexam");

            migrationBuilder.DropTable(
                name: "packagetype");

            migrationBuilder.DropTable(
                name: "targetscreen");

            migrationBuilder.DropTable(
                name: "graduationyear");

            migrationBuilder.DropTable(
                name: "school");

            migrationBuilder.DropTable(
                name: "document");

            migrationBuilder.DropTable(
                name: "package");

            migrationBuilder.DropTable(
                name: "role");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "organisation");

            migrationBuilder.DropTable(
                name: "classroom");

            migrationBuilder.DropTable(
                name: "testexamtype");

            migrationBuilder.DropTable(
                name: "county");

            migrationBuilder.DropTable(
                name: "institution");

            migrationBuilder.DropTable(
                name: "institutiontype");

            migrationBuilder.DropTable(
                name: "contractkind");

            migrationBuilder.DropTable(
                name: "organisationtype");

            migrationBuilder.DropTable(
                name: "city");

            migrationBuilder.DropTable(
                name: "contracttype");
        }
    }
}

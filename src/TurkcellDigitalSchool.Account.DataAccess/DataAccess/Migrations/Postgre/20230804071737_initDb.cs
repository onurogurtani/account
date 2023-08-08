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
            migrationBuilder.EnsureSchema(
                name: "account");

            migrationBuilder.CreateTable(
                name: "appsetting",
                schema: "account",
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
                schema: "account",
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
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    code = table.Column<string>(type: "text", nullable: true),
                    isactive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_classroom", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "contracttype",
                schema: "account",
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
                schema: "account",
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
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    graduationstatus = table.Column<string>(type: "text", nullable: true),
                    graduationyear = table.Column<int>(type: "integer", nullable: true),
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
                name: "educationyear",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    startyear = table.Column<int>(type: "integer", nullable: false),
                    endyear = table.Column<int>(type: "integer", nullable: false),
                    startdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    enddate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_educationyear", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "event",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    description = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    isactive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
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
                name: "eydatatransfermap",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    table = table.Column<string>(type: "text", nullable: true),
                    neweducationyearid = table.Column<long>(type: "bigint", nullable: false),
                    oldid = table.Column<long>(type: "bigint", nullable: false),
                    newid = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_eydatatransfermap", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "file",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    filetype = table.Column<int>(type: "integer", nullable: false),
                    filename = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    filepath = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    contenttype = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    description = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_file", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "forgetpasswordfailcounters",
                schema: "account",
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
                name: "institution",
                schema: "account",
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
                schema: "account",
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
                name: "ldapuserinfo",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    uid = table.Column<string>(type: "text", nullable: true),
                    mail = table.Column<string>(type: "text", nullable: true),
                    mobile = table.Column<string>(type: "text", nullable: true),
                    fullname = table.Column<string>(type: "text", nullable: true),
                    objectclass = table.Column<string>(type: "text", nullable: true),
                    group = table.Column<string>(type: "text", nullable: true),
                    positionname = table.Column<string>(type: "text", nullable: true),
                    sn = table.Column<string>(type: "text", nullable: true),
                    birthdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    unitname = table.Column<string>(type: "text", nullable: true),
                    divisiongroupname = table.Column<string>(type: "text", nullable: true),
                    managername = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<bool>(type: "boolean", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_ldapuserinfo", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "loginfailcounters",
                schema: "account",
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
                schema: "account",
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
                schema: "account",
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
                schema: "account",
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
                schema: "account",
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
                name: "onetimepasswords",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    channeltypeid = table.Column<int>(type: "integer", nullable: false),
                    serviceid = table.Column<int>(type: "integer", nullable: false),
                    code = table.Column<int>(type: "integer", nullable: false),
                    otpstatusid = table.Column<int>(type: "integer", nullable: false),
                    senddate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    expirydate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    processdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_onetimepasswords", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "operationclaim",
                schema: "account",
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
                    moduletype = table.Column<int>(type: "integer", nullable: false),
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
                schema: "account",
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
                name: "packagemenuaccess",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    packageid = table.Column<long>(type: "bigint", nullable: false),
                    claim = table.Column<string>(type: "text", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_packagemenuaccess", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "packagetype",
                schema: "account",
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
                schema: "account",
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
                    studentaccesstochat = table.Column<bool>(type: "boolean", nullable: false),
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
                schema: "account",
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
                schema: "account",
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
                schema: "account",
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
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    description = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    isactive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_testexamtype", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "unverifieduser",
                schema: "account",
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
                name: "user",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    passwordsalt = table.Column<byte[]>(type: "bytea", nullable: true),
                    passwordhash = table.Column<byte[]>(type: "bytea", nullable: true),
                    addingtype = table.Column<int>(type: "integer", nullable: false),
                    relatedidentity = table.Column<string>(type: "text", nullable: true),
                    oauthaccesstoken = table.Column<string>(type: "text", nullable: true),
                    oauthopenidconnecttoken = table.Column<string>(type: "text", nullable: true),
                    registerstatus = table.Column<int>(type: "integer", nullable: false),
                    examkind = table.Column<int>(type: "integer", nullable: true),
                    usertype = table.Column<int>(type: "integer", nullable: false),
                    faillogincount = table.Column<int>(type: "integer", nullable: true),
                    failotpcount = table.Column<int>(type: "integer", nullable: true),
                    isldapuser = table.Column<bool>(type: "boolean", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    citizenid = table.Column<long>(type: "bigint", nullable: true),
                    name = table.Column<string>(type: "text", nullable: true),
                    surname = table.Column<string>(type: "text", nullable: true),
                    namesurname = table.Column<string>(type: "text", nullable: true),
                    username = table.Column<string>(type: "text", nullable: true),
                    email = table.Column<string>(type: "text", nullable: true),
                    emailverify = table.Column<bool>(type: "boolean", nullable: false),
                    mobilephones = table.Column<string>(type: "text", nullable: true),
                    mobilephonesverify = table.Column<bool>(type: "boolean", nullable: false),
                    status = table.Column<bool>(type: "boolean", nullable: false),
                    birthdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    birthplace = table.Column<string>(type: "text", nullable: true),
                    genderid = table.Column<int>(type: "integer", nullable: false),
                    recorddate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    address = table.Column<string>(type: "text", nullable: true),
                    residencecityid = table.Column<long>(type: "bigint", nullable: true),
                    residencecountyid = table.Column<long>(type: "bigint", nullable: true),
                    contactoption = table.Column<string>(type: "text", nullable: true),
                    avatarid = table.Column<long>(type: "bigint", nullable: false),
                    notes = table.Column<string>(type: "text", nullable: true),
                    updatecontactdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    contactbysms = table.Column<bool>(type: "boolean", nullable: false),
                    contactbymail = table.Column<bool>(type: "boolean", nullable: false),
                    contactbycall = table.Column<bool>(type: "boolean", nullable: false),
                    viewmydata = table.Column<bool>(type: "boolean", nullable: false),
                    sharecalendarwithparent = table.Column<bool>(type: "boolean", nullable: false),
                    behalfofloginkey = table.Column<string>(type: "text", nullable: true),
                    usercode = table.Column<Guid>(type: "uuid", nullable: false),
                    remindlater = table.Column<bool>(type: "boolean", nullable: false),
                    lastpassworddate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    lastpasswordchangeguid = table.Column<string>(type: "text", nullable: true),
                    lastpasswordchangeexptime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    lastwebsessionid = table.Column<long>(type: "bigint", nullable: true),
                    lastwebsessiontime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    lastmobilesessionid = table.Column<long>(type: "bigint", nullable: true),
                    lastmobilesessiontime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    profilingstate = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "county",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "city",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "lesson",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    order = table.Column<int>(type: "integer", nullable: false),
                    isactive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    classroomid = table.Column<long>(type: "bigint", nullable: false),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_lesson", x => x.id);
                    table.ForeignKey(
                        name: "fk_lesson_classroom_classroomid",
                        column: x => x.classroomid,
                        principalSchema: "account",
                        principalTable: "classroom",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "contractkind",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "contracttype",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "package",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    hascoachservice = table.Column<bool>(type: "boolean", nullable: false),
                    hastryingtest = table.Column<bool>(type: "boolean", nullable: false),
                    tryingtestquestioncount = table.Column<int>(type: "integer", nullable: true),
                    hasmotivationevent = table.Column<bool>(type: "boolean", nullable: false),
                    packagekind = table.Column<int>(type: "integer", nullable: false),
                    packagetypeenum = table.Column<int>(type: "integer", nullable: false),
                    examkind = table.Column<int>(type: "integer", nullable: false),
                    educationyearid = table.Column<long>(type: "bigint", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    summary = table.Column<string>(type: "text", nullable: true),
                    content = table.Column<string>(type: "text", nullable: true),
                    isactive = table.Column<bool>(type: "boolean", nullable: false),
                    ismenuaccessset = table.Column<bool>(type: "boolean", nullable: false),
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
                    table.ForeignKey(
                        name: "fk_package_educationyears_educationyearid",
                        column: x => x.educationyearid,
                        principalSchema: "account",
                        principalTable: "educationyear",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "greetingmessage",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    hasdaterange = table.Column<bool>(type: "boolean", nullable: false),
                    content = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    startdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    enddate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    daycount = table.Column<long>(type: "bigint", nullable: true),
                    order = table.Column<long>(type: "bigint", nullable: true),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    fileid = table.Column<long>(type: "bigint", nullable: true),
                    contentalignment = table.Column<long>(type: "bigint", nullable: false),
                    contentforecolor = table.Column<string>(type: "text", nullable: true),
                    descriptionforecolor = table.Column<string>(type: "text", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_greetingmessage", x => x.id);
                    table.ForeignKey(
                        name: "fk_greetingmessage_files_fileid",
                        column: x => x.fileid,
                        principalSchema: "account",
                        principalTable: "file",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "message",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "messagetype",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "organisation",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "organisationtype",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "roleclaim",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "role",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagetypetargetscreen",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "packagetype",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_packagetypetargetscreen_targetscreens_targetscreenid",
                        column: x => x.targetscreenid,
                        principalSchema: "account",
                        principalTable: "targetscreen",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "testexam",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    code = table.Column<string>(type: "text", nullable: true),
                    testexamtypeid = table.Column<long>(type: "bigint", nullable: false),
                    islivetestexam = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    keywords = table.Column<string>(type: "text", nullable: true),
                    educationyearid = table.Column<long>(type: "bigint", nullable: false),
                    classroomid = table.Column<long>(type: "bigint", nullable: false),
                    difficulty = table.Column<int>(type: "integer", nullable: false),
                    testexamtime = table.Column<int>(type: "integer", nullable: false),
                    startdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    finishdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    testexamstatus = table.Column<int>(type: "integer", nullable: false),
                    examkind = table.Column<int>(type: "integer", nullable: false),
                    transitionbetweenquestions = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    transitionbetweensections = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    isallowdownloadpdf = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_testexam", x => x.id);
                    table.ForeignKey(
                        name: "fk_testexam_classroom_classroomid",
                        column: x => x.classroomid,
                        principalSchema: "account",
                        principalTable: "classroom",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_testexam_educationyear_educationyearid",
                        column: x => x.educationyearid,
                        principalSchema: "account",
                        principalTable: "educationyear",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_testexam_testexamtypes_testexamtypeid",
                        column: x => x.testexamtypeid,
                        principalSchema: "account",
                        principalTable: "testexamtype",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "coachleadercoach",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    coachid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_coachleadercoach", x => x.id);
                    table.ForeignKey(
                        name: "fk_coachleadercoach_users_coachid",
                        column: x => x.coachid,
                        principalSchema: "account",
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_coachleadercoach_users_userid",
                        column: x => x.userid,
                        principalSchema: "account",
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "studentcoach",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    coachid = table.Column<long>(type: "bigint", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_studentcoach", x => x.id);
                    table.ForeignKey(
                        name: "fk_studentcoach_users_coachid",
                        column: x => x.coachid,
                        principalSchema: "account",
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_studentcoach_users_userid",
                        column: x => x.userid,
                        principalSchema: "account",
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "studentparentinformation",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    parentid = table.Column<long>(type: "bigint", nullable: false),
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
                        name: "fk_studentparentinformation_users_parentid",
                        column: x => x.parentid,
                        principalSchema: "account",
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_studentparentinformation_users_userid",
                        column: x => x.userid,
                        principalSchema: "account",
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usercommunicationpreferences",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usersessions",
                schema: "account",
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
                    behalfofloginuserid = table.Column<long>(type: "bigint", nullable: true),
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
                        principalSchema: "account",
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usersupportteamviewmydata",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "school",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "city",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_school_county_countyid",
                        column: x => x.countyid,
                        principalSchema: "account",
                        principalTable: "county",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_school_institution_institutionid",
                        column: x => x.institutionid,
                        principalSchema: "account",
                        principalTable: "institution",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_school_institutiontype_institutiontypeid",
                        column: x => x.institutiontypeid,
                        principalSchema: "account",
                        principalTable: "institutiontype",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "document",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "contractkind",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "imageofpackage",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "file",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_imageofpackage_packages_packageid",
                        column: x => x.packageid,
                        principalSchema: "account",
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagecoachservicepackages",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagecontracttypes",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "contracttype",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_packagecontracttypes_packages_packageid",
                        column: x => x.packageid,
                        principalSchema: "account",
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packageevent",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "event",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_packageevent_package_packageid",
                        column: x => x.packageid,
                        principalSchema: "account",
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagefieldtype",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagelesson",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "lesson",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_packagelesson_package_packageid",
                        column: x => x.packageid,
                        principalSchema: "account",
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagemotivationactivitypackage",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagepackagetypeenum",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagepublisher",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_packagepublisher_publishers_publisherid",
                        column: x => x.publisherid,
                        principalSchema: "account",
                        principalTable: "publisher",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagerole",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_packagerole_roles_roleid",
                        column: x => x.roleid,
                        principalSchema: "account",
                        principalTable: "role",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagetestexampackage",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "studentanswertargetrange",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "userbasketpackages",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_userbasketpackages_users_userid",
                        column: x => x.userid,
                        principalSchema: "account",
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "userpackage",
                schema: "account",
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
                    table.PrimaryKey("pk_userpackage", x => x.id);
                    table.ForeignKey(
                        name: "fk_userpackage_package_packageid",
                        column: x => x.packageid,
                        principalSchema: "account",
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_userpackage_user_userid",
                        column: x => x.userid,
                        principalSchema: "account",
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "userrole",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "package",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_userrole_role_roleid",
                        column: x => x.roleid,
                        principalSchema: "account",
                        principalTable: "role",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_userrole_user_userid",
                        column: x => x.userid,
                        principalSchema: "account",
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "branchmainfield",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "organisation",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "organisationinfochangerequests",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "organisation",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "organisationuser",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "organisation",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_organisationuser_users_userid",
                        column: x => x.userid,
                        principalSchema: "account",
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagetestexam",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_packagetestexam_testexams_testexamid",
                        column: x => x.testexamid,
                        principalSchema: "account",
                        principalTable: "testexam",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "documentcontracttype",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "contracttype",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_documentcontracttype_documents_documentid",
                        column: x => x.documentid,
                        principalSchema: "account",
                        principalTable: "document",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "packagedocument",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "document",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_packagedocument_packages_packageid",
                        column: x => x.packageid,
                        principalSchema: "account",
                        principalTable: "package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usercontrat",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "document",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_usercontrat_users_userid",
                        column: x => x.userid,
                        principalSchema: "account",
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "organisationchangereqcontents",
                schema: "account",
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
                        principalSchema: "account",
                        principalTable: "organisationinfochangerequests",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_branchmainfield_organisationid",
                schema: "account",
                table: "branchmainfield",
                column: "organisationid");

            migrationBuilder.CreateIndex(
                name: "ix_coachleadercoach_coachid",
                schema: "account",
                table: "coachleadercoach",
                column: "coachid");

            migrationBuilder.CreateIndex(
                name: "ix_coachleadercoach_userid",
                schema: "account",
                table: "coachleadercoach",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "ix_contractkind_contracttypeid",
                schema: "account",
                table: "contractkind",
                column: "contracttypeid");

            migrationBuilder.CreateIndex(
                name: "ix_county_cityid",
                schema: "account",
                table: "county",
                column: "cityid");

            migrationBuilder.CreateIndex(
                name: "ix_document_contractkindid",
                schema: "account",
                table: "document",
                column: "contractkindid");

            migrationBuilder.CreateIndex(
                name: "ix_documentcontracttype_contracttypeid",
                schema: "account",
                table: "documentcontracttype",
                column: "contracttypeid");

            migrationBuilder.CreateIndex(
                name: "ix_documentcontracttype_documentid",
                schema: "account",
                table: "documentcontracttype",
                column: "documentid");

            migrationBuilder.CreateIndex(
                name: "ix_forgetpasswordfailcounters_csrftoken",
                schema: "account",
                table: "forgetpasswordfailcounters",
                column: "csrftoken");

            migrationBuilder.CreateIndex(
                name: "ix_forgetpasswordfailcounters_inserttime",
                schema: "account",
                table: "forgetpasswordfailcounters",
                column: "inserttime");

            migrationBuilder.CreateIndex(
                name: "ix_greetingmessage_fileid",
                schema: "account",
                table: "greetingmessage",
                column: "fileid");

            migrationBuilder.CreateIndex(
                name: "ix_imageofpackage_fileid",
                schema: "account",
                table: "imageofpackage",
                column: "fileid");

            migrationBuilder.CreateIndex(
                name: "ix_imageofpackage_packageid",
                schema: "account",
                table: "imageofpackage",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_lesson_classroomid",
                schema: "account",
                table: "lesson",
                column: "classroomid");

            migrationBuilder.CreateIndex(
                name: "ix_loginfailcounters_csrftoken",
                schema: "account",
                table: "loginfailcounters",
                column: "csrftoken");

            migrationBuilder.CreateIndex(
                name: "ix_loginfailcounters_inserttime",
                schema: "account",
                table: "loginfailcounters",
                column: "inserttime");

            migrationBuilder.CreateIndex(
                name: "ix_loginfailforgetpasssendlinks_expdate",
                schema: "account",
                table: "loginfailforgetpasssendlinks",
                column: "expdate");

            migrationBuilder.CreateIndex(
                name: "ix_loginfailforgetpasssendlinks_guid_userid",
                schema: "account",
                table: "loginfailforgetpasssendlinks",
                columns: new[] { "guid", "userid" });

            migrationBuilder.CreateIndex(
                name: "ix_message_messagetypeid",
                schema: "account",
                table: "message",
                column: "messagetypeid");

            migrationBuilder.CreateIndex(
                name: "ix_mobilelogins_id_newpassguid_newpassstatus_newpassguidexp",
                schema: "account",
                table: "mobilelogins",
                columns: new[] { "id", "newpassguid", "newpassstatus", "newpassguidexp" });

            migrationBuilder.CreateIndex(
                name: "ix_mobilelogins_userid_externaluserid_provider",
                schema: "account",
                table: "mobilelogins",
                columns: new[] { "userid", "externaluserid", "provider" });

            migrationBuilder.CreateIndex(
                name: "ix_organisation_organisationtypeid",
                schema: "account",
                table: "organisation",
                column: "organisationtypeid");

            migrationBuilder.CreateIndex(
                name: "ix_organisationchangereqcontents_requestid",
                schema: "account",
                table: "organisationchangereqcontents",
                column: "requestid");

            migrationBuilder.CreateIndex(
                name: "ix_organisationinfochangerequests_organisationid",
                schema: "account",
                table: "organisationinfochangerequests",
                column: "organisationid");

            migrationBuilder.CreateIndex(
                name: "ix_organisationuser_organisationid",
                schema: "account",
                table: "organisationuser",
                column: "organisationid");

            migrationBuilder.CreateIndex(
                name: "ix_organisationuser_userid",
                schema: "account",
                table: "organisationuser",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "ix_package_educationyearid",
                schema: "account",
                table: "package",
                column: "educationyearid");

            migrationBuilder.CreateIndex(
                name: "ix_packagecoachservicepackages_packageid",
                schema: "account",
                table: "packagecoachservicepackages",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagecontracttypes_contracttypeid",
                schema: "account",
                table: "packagecontracttypes",
                column: "contracttypeid");

            migrationBuilder.CreateIndex(
                name: "ix_packagecontracttypes_packageid",
                schema: "account",
                table: "packagecontracttypes",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagedocument_documentid",
                schema: "account",
                table: "packagedocument",
                column: "documentid");

            migrationBuilder.CreateIndex(
                name: "ix_packagedocument_packageid",
                schema: "account",
                table: "packagedocument",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packageevent_eventid",
                schema: "account",
                table: "packageevent",
                column: "eventid");

            migrationBuilder.CreateIndex(
                name: "ix_packageevent_packageid",
                schema: "account",
                table: "packageevent",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagefieldtype_packageid",
                schema: "account",
                table: "packagefieldtype",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagelesson_lessonid",
                schema: "account",
                table: "packagelesson",
                column: "lessonid");

            migrationBuilder.CreateIndex(
                name: "ix_packagelesson_packageid",
                schema: "account",
                table: "packagelesson",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagemotivationactivitypackage_packageid",
                schema: "account",
                table: "packagemotivationactivitypackage",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagepackagetypeenum_packageid",
                schema: "account",
                table: "packagepackagetypeenum",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagepublisher_packageid",
                schema: "account",
                table: "packagepublisher",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagepublisher_publisherid",
                schema: "account",
                table: "packagepublisher",
                column: "publisherid");

            migrationBuilder.CreateIndex(
                name: "ix_packagerole_packageid",
                schema: "account",
                table: "packagerole",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagerole_roleid",
                schema: "account",
                table: "packagerole",
                column: "roleid");

            migrationBuilder.CreateIndex(
                name: "ix_packagetestexam_packageid",
                schema: "account",
                table: "packagetestexam",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagetestexam_testexamid",
                schema: "account",
                table: "packagetestexam",
                column: "testexamid");

            migrationBuilder.CreateIndex(
                name: "ix_packagetestexampackage_packageid",
                schema: "account",
                table: "packagetestexampackage",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_packagetypetargetscreen_packagetypeid",
                schema: "account",
                table: "packagetypetargetscreen",
                column: "packagetypeid");

            migrationBuilder.CreateIndex(
                name: "ix_packagetypetargetscreen_targetscreenid",
                schema: "account",
                table: "packagetypetargetscreen",
                column: "targetscreenid");

            migrationBuilder.CreateIndex(
                name: "ix_roleclaim_roleid",
                schema: "account",
                table: "roleclaim",
                column: "roleid");

            migrationBuilder.CreateIndex(
                name: "ix_school_cityid",
                schema: "account",
                table: "school",
                column: "cityid");

            migrationBuilder.CreateIndex(
                name: "ix_school_countyid",
                schema: "account",
                table: "school",
                column: "countyid");

            migrationBuilder.CreateIndex(
                name: "ix_school_institutionid",
                schema: "account",
                table: "school",
                column: "institutionid");

            migrationBuilder.CreateIndex(
                name: "ix_school_institutiontypeid",
                schema: "account",
                table: "school",
                column: "institutiontypeid");

            migrationBuilder.CreateIndex(
                name: "ix_studentanswertargetrange_packageid",
                schema: "account",
                table: "studentanswertargetrange",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_studentcoach_coachid",
                schema: "account",
                table: "studentcoach",
                column: "coachid");

            migrationBuilder.CreateIndex(
                name: "ix_studentcoach_userid",
                schema: "account",
                table: "studentcoach",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "ix_studentparentinformation_parentid",
                schema: "account",
                table: "studentparentinformation",
                column: "parentid");

            migrationBuilder.CreateIndex(
                name: "ix_studentparentinformation_userid",
                schema: "account",
                table: "studentparentinformation",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "ix_testexam_classroomid",
                schema: "account",
                table: "testexam",
                column: "classroomid");

            migrationBuilder.CreateIndex(
                name: "ix_testexam_educationyearid",
                schema: "account",
                table: "testexam",
                column: "educationyearid");

            migrationBuilder.CreateIndex(
                name: "ix_testexam_testexamtypeid",
                schema: "account",
                table: "testexam",
                column: "testexamtypeid");

            migrationBuilder.CreateIndex(
                name: "ix_userbasketpackages_packageid",
                schema: "account",
                table: "userbasketpackages",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_userbasketpackages_userid",
                schema: "account",
                table: "userbasketpackages",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "ix_usercommunicationpreferences_userid",
                schema: "account",
                table: "usercommunicationpreferences",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "ix_usercontrat_documentid",
                schema: "account",
                table: "usercontrat",
                column: "documentid");

            migrationBuilder.CreateIndex(
                name: "ix_usercontrat_userid",
                schema: "account",
                table: "usercontrat",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "ix_userpackage_packageid",
                schema: "account",
                table: "userpackage",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_userpackage_userid",
                schema: "account",
                table: "userpackage",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "ix_userrole_packageid",
                schema: "account",
                table: "userrole",
                column: "packageid");

            migrationBuilder.CreateIndex(
                name: "ix_userrole_roleid",
                schema: "account",
                table: "userrole",
                column: "roleid");

            migrationBuilder.CreateIndex(
                name: "ix_userrole_userid",
                schema: "account",
                table: "userrole",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "ix_usersessions_starttime",
                schema: "account",
                table: "usersessions",
                column: "starttime");

            migrationBuilder.CreateIndex(
                name: "ix_usersessions_userid_sessiontype_endtime",
                schema: "account",
                table: "usersessions",
                columns: new[] { "userid", "sessiontype", "endtime" });

            migrationBuilder.CreateIndex(
                name: "ix_usersupportteamviewmydata_userid",
                schema: "account",
                table: "usersupportteamviewmydata",
                column: "userid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "appsetting",
                schema: "account");

            migrationBuilder.DropTable(
                name: "branchmainfield",
                schema: "account");

            migrationBuilder.DropTable(
                name: "coachleadercoach",
                schema: "account");

            migrationBuilder.DropTable(
                name: "country",
                schema: "account");

            migrationBuilder.DropTable(
                name: "documentcontracttype",
                schema: "account");

            migrationBuilder.DropTable(
                name: "education",
                schema: "account");

            migrationBuilder.DropTable(
                name: "eydatatransfermap",
                schema: "account");

            migrationBuilder.DropTable(
                name: "forgetpasswordfailcounters",
                schema: "account");

            migrationBuilder.DropTable(
                name: "greetingmessage",
                schema: "account");

            migrationBuilder.DropTable(
                name: "imageofpackage",
                schema: "account");

            migrationBuilder.DropTable(
                name: "ldapuserinfo",
                schema: "account");

            migrationBuilder.DropTable(
                name: "loginfailcounters",
                schema: "account");

            migrationBuilder.DropTable(
                name: "loginfailforgetpasssendlinks",
                schema: "account");

            migrationBuilder.DropTable(
                name: "message",
                schema: "account");

            migrationBuilder.DropTable(
                name: "messagemap",
                schema: "account");

            migrationBuilder.DropTable(
                name: "mobilelogins",
                schema: "account");

            migrationBuilder.DropTable(
                name: "onetimepasswords",
                schema: "account");

            migrationBuilder.DropTable(
                name: "operationclaim",
                schema: "account");

            migrationBuilder.DropTable(
                name: "organisationchangereqcontents",
                schema: "account");

            migrationBuilder.DropTable(
                name: "organisationuser",
                schema: "account");

            migrationBuilder.DropTable(
                name: "packagecoachservicepackages",
                schema: "account");

            migrationBuilder.DropTable(
                name: "packagecontracttypes",
                schema: "account");

            migrationBuilder.DropTable(
                name: "packagedocument",
                schema: "account");

            migrationBuilder.DropTable(
                name: "packageevent",
                schema: "account");

            migrationBuilder.DropTable(
                name: "packagefieldtype",
                schema: "account");

            migrationBuilder.DropTable(
                name: "packagelesson",
                schema: "account");

            migrationBuilder.DropTable(
                name: "packagemenuaccess",
                schema: "account");

            migrationBuilder.DropTable(
                name: "packagemotivationactivitypackage",
                schema: "account");

            migrationBuilder.DropTable(
                name: "packagepackagetypeenum",
                schema: "account");

            migrationBuilder.DropTable(
                name: "packagepublisher",
                schema: "account");

            migrationBuilder.DropTable(
                name: "packagerole",
                schema: "account");

            migrationBuilder.DropTable(
                name: "packagetestexam",
                schema: "account");

            migrationBuilder.DropTable(
                name: "packagetestexampackage",
                schema: "account");

            migrationBuilder.DropTable(
                name: "packagetypetargetscreen",
                schema: "account");

            migrationBuilder.DropTable(
                name: "parent",
                schema: "account");

            migrationBuilder.DropTable(
                name: "roleclaim",
                schema: "account");

            migrationBuilder.DropTable(
                name: "school",
                schema: "account");

            migrationBuilder.DropTable(
                name: "studentanswertargetrange",
                schema: "account");

            migrationBuilder.DropTable(
                name: "studentcoach",
                schema: "account");

            migrationBuilder.DropTable(
                name: "studentparentinformation",
                schema: "account");

            migrationBuilder.DropTable(
                name: "unverifieduser",
                schema: "account");

            migrationBuilder.DropTable(
                name: "userbasketpackages",
                schema: "account");

            migrationBuilder.DropTable(
                name: "usercommunicationpreferences",
                schema: "account");

            migrationBuilder.DropTable(
                name: "usercontrat",
                schema: "account");

            migrationBuilder.DropTable(
                name: "userpackage",
                schema: "account");

            migrationBuilder.DropTable(
                name: "userrole",
                schema: "account");

            migrationBuilder.DropTable(
                name: "usersessions",
                schema: "account");

            migrationBuilder.DropTable(
                name: "usersupportteamviewmydata",
                schema: "account");

            migrationBuilder.DropTable(
                name: "file",
                schema: "account");

            migrationBuilder.DropTable(
                name: "messagetype",
                schema: "account");

            migrationBuilder.DropTable(
                name: "organisationinfochangerequests",
                schema: "account");

            migrationBuilder.DropTable(
                name: "event",
                schema: "account");

            migrationBuilder.DropTable(
                name: "lesson",
                schema: "account");

            migrationBuilder.DropTable(
                name: "publisher",
                schema: "account");

            migrationBuilder.DropTable(
                name: "testexam",
                schema: "account");

            migrationBuilder.DropTable(
                name: "packagetype",
                schema: "account");

            migrationBuilder.DropTable(
                name: "targetscreen",
                schema: "account");

            migrationBuilder.DropTable(
                name: "county",
                schema: "account");

            migrationBuilder.DropTable(
                name: "institution",
                schema: "account");

            migrationBuilder.DropTable(
                name: "institutiontype",
                schema: "account");

            migrationBuilder.DropTable(
                name: "document",
                schema: "account");

            migrationBuilder.DropTable(
                name: "package",
                schema: "account");

            migrationBuilder.DropTable(
                name: "role",
                schema: "account");

            migrationBuilder.DropTable(
                name: "user",
                schema: "account");

            migrationBuilder.DropTable(
                name: "organisation",
                schema: "account");

            migrationBuilder.DropTable(
                name: "classroom",
                schema: "account");

            migrationBuilder.DropTable(
                name: "testexamtype",
                schema: "account");

            migrationBuilder.DropTable(
                name: "city",
                schema: "account");

            migrationBuilder.DropTable(
                name: "contractkind",
                schema: "account");

            migrationBuilder.DropTable(
                name: "educationyear",
                schema: "account");

            migrationBuilder.DropTable(
                name: "organisationtype",
                schema: "account");

            migrationBuilder.DropTable(
                name: "contracttype",
                schema: "account");
        }
    }
}

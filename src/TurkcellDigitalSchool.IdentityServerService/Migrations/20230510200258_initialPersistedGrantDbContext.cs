using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TurkcellDigitalSchool.IdentityServerService.Migrations
{
    public partial class initialPersistedGrantDbContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DeviceCodes",
                columns: table => new
                {
                    usercode = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    devicecode = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    subjectid = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    sessionid = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    clientid = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    description = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    creationtime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    expiration = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    data = table.Column<string>(type: "character varying(50000)", maxLength: 50000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_devicecodes", x => x.usercode);
                });

            migrationBuilder.CreateTable(
                name: "Keys",
                columns: table => new
                {
                    id = table.Column<string>(type: "text", nullable: false),
                    version = table.Column<int>(type: "integer", nullable: false),
                    created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    use = table.Column<string>(type: "text", nullable: true),
                    algorithm = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    isx509certificate = table.Column<bool>(type: "boolean", nullable: false),
                    dataprotected = table.Column<bool>(type: "boolean", nullable: false),
                    data = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_keys", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "PersistedGrants",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    key = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    subjectid = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    sessionid = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    clientid = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    description = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    creationtime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    expiration = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    consumedtime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    data = table.Column<string>(type: "character varying(50000)", maxLength: 50000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_persistedgrants", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ServerSideSessions",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    key = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    scheme = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    subjectid = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    sessionid = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    displayname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    renewed = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    expires = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    data = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_serversidesessions", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_devicecodes_devicecode",
                table: "DeviceCodes",
                column: "devicecode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_devicecodes_expiration",
                table: "DeviceCodes",
                column: "expiration");

            migrationBuilder.CreateIndex(
                name: "ix_keys_use",
                table: "Keys",
                column: "use");

            migrationBuilder.CreateIndex(
                name: "ix_persistedgrants_consumedtime",
                table: "PersistedGrants",
                column: "consumedtime");

            migrationBuilder.CreateIndex(
                name: "ix_persistedgrants_expiration",
                table: "PersistedGrants",
                column: "expiration");

            migrationBuilder.CreateIndex(
                name: "ix_persistedgrants_key",
                table: "PersistedGrants",
                column: "key",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_persistedgrants_subjectid_clientid_type",
                table: "PersistedGrants",
                columns: new[] { "subjectid", "clientid", "type" });

            migrationBuilder.CreateIndex(
                name: "ix_persistedgrants_subjectid_sessionid_type",
                table: "PersistedGrants",
                columns: new[] { "subjectid", "sessionid", "type" });

            migrationBuilder.CreateIndex(
                name: "ix_serversidesessions_displayname",
                table: "ServerSideSessions",
                column: "displayname");

            migrationBuilder.CreateIndex(
                name: "ix_serversidesessions_expires",
                table: "ServerSideSessions",
                column: "expires");

            migrationBuilder.CreateIndex(
                name: "ix_serversidesessions_key",
                table: "ServerSideSessions",
                column: "key",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_serversidesessions_sessionid",
                table: "ServerSideSessions",
                column: "sessionid");

            migrationBuilder.CreateIndex(
                name: "ix_serversidesessions_subjectid",
                table: "ServerSideSessions",
                column: "subjectid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DeviceCodes");

            migrationBuilder.DropTable(
                name: "Keys");

            migrationBuilder.DropTable(
                name: "PersistedGrants");

            migrationBuilder.DropTable(
                name: "ServerSideSessions");
        }
    }
}

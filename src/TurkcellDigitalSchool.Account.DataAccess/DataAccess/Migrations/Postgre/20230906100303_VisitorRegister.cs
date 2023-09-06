using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class VisitorRegister : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "visitorregisters",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: true),
                    surname = table.Column<string>(type: "text", nullable: true),
                    email = table.Column<string>(type: "text", nullable: true),
                    mobilephones = table.Column<string>(type: "text", nullable: true),
                    sessioncode = table.Column<Guid>(type: "uuid", nullable: false),
                    smsotpcode = table.Column<int>(type: "integer", nullable: false),
                    mailotpcode = table.Column<int>(type: "integer", nullable: false),
                    expirydate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    processdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    iscompleted = table.Column<bool>(type: "boolean", nullable: false),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_visitorregisters", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "visitorregisters",
                schema: "account");
        }
    }
}

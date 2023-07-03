using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class GreetingMessage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "greetingmessage",
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
                        principalTable: "file",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "ix_greetingmessage_fileid",
                table: "greetingmessage",
                column: "fileid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "greetingmessage");
        }
    }
}

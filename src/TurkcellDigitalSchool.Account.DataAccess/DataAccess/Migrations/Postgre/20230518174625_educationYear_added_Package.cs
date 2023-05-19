using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class educationYear_added_Package : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "educationyearid",
                table: "package",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "educationyear",
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

            migrationBuilder.CreateIndex(
                name: "ix_package_educationyearid",
                table: "package",
                column: "educationyearid");

            migrationBuilder.AddForeignKey(
                name: "fk_package_educationyears_educationyearid",
                table: "package",
                column: "educationyearid",
                principalTable: "educationyear",
                principalColumn: "id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_package_educationyears_educationyearid",
                table: "package");

            migrationBuilder.DropTable(
                name: "educationyear");

            migrationBuilder.DropIndex(
                name: "ix_package_educationyearid",
                table: "package");

            migrationBuilder.DropColumn(
                name: "educationyearid",
                table: "package");
        }
    }
}

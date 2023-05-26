using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class Remove_GraduateYear_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_studenteducationinformation_graduationyear_graduationyearid",
                table: "studenteducationinformation");

            migrationBuilder.DropTable(
                name: "graduationyear");

            migrationBuilder.DropIndex(
                name: "ix_studenteducationinformation_graduationyearid",
                table: "studenteducationinformation");

            migrationBuilder.DropColumn(
                name: "graduationyearid",
                table: "studenteducationinformation");

            migrationBuilder.DropColumn(
                name: "graduationyear",
                table: "education");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "graduationyearid",
                table: "studenteducationinformation",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "graduationyear",
                table: "education",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "graduationyear",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    code = table.Column<string>(type: "text", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    recordstatus = table.Column<int>(type: "integer", nullable: false),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_graduationyear", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_studenteducationinformation_graduationyearid",
                table: "studenteducationinformation",
                column: "graduationyearid");

            migrationBuilder.AddForeignKey(
                name: "fk_studenteducationinformation_graduationyear_graduationyearid",
                table: "studenteducationinformation",
                column: "graduationyearid",
                principalTable: "graduationyear",
                principalColumn: "id");
        }
    }
}

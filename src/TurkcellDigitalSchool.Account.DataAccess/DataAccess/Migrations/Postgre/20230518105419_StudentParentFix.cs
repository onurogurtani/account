using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class StudentParentFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "citizenid",
                table: "studentparentinformation");

            migrationBuilder.DropColumn(
                name: "email",
                table: "studentparentinformation");

            migrationBuilder.DropColumn(
                name: "mobilphones",
                table: "studentparentinformation");

            migrationBuilder.DropColumn(
                name: "name",
                table: "studentparentinformation");

            migrationBuilder.DropColumn(
                name: "surname",
                table: "studentparentinformation");

            migrationBuilder.AddColumn<long>(
                name: "parentid",
                table: "studentparentinformation",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "ix_studentparentinformation_parentid",
                table: "studentparentinformation",
                column: "parentid");

            migrationBuilder.AddForeignKey(
                name: "fk_studentparentinformation_users_parentid",
                table: "studentparentinformation",
                column: "parentid",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_studentparentinformation_users_parentid",
                table: "studentparentinformation");

            migrationBuilder.DropIndex(
                name: "ix_studentparentinformation_parentid",
                table: "studentparentinformation");

            migrationBuilder.DropColumn(
                name: "parentid",
                table: "studentparentinformation");

            migrationBuilder.AddColumn<string>(
                name: "citizenid",
                table: "studentparentinformation",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "studentparentinformation",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "mobilphones",
                table: "studentparentinformation",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "studentparentinformation",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "surname",
                table: "studentparentinformation",
                type: "text",
                nullable: true);
        }
    }
}

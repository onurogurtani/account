using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class educationYear_notNull : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_package_educationyears_educationyearid",
                table: "package");

            migrationBuilder.AlterColumn<long>(
                name: "educationyearid",
                table: "package",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "fk_package_educationyears_educationyearid",
                table: "package",
                column: "educationyearid",
                principalTable: "educationyear",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_package_educationyears_educationyearid",
                table: "package");

            migrationBuilder.AlterColumn<long>(
                name: "educationyearid",
                table: "package",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddForeignKey(
                name: "fk_package_educationyears_educationyearid",
                table: "package",
                column: "educationyearid",
                principalTable: "educationyear",
                principalColumn: "id");
        }
    }
}

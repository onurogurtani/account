using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class testExam_edited : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "examtype",
                table: "testexam",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "educationyearid",
                table: "testexam",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "ix_testexam_educationyearid",
                table: "testexam",
                column: "educationyearid");

            migrationBuilder.AddForeignKey(
                name: "fk_testexam_educationyear_educationyearid",
                table: "testexam",
                column: "educationyearid",
                principalTable: "educationyear",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_testexam_educationyear_educationyearid",
                table: "testexam");

            migrationBuilder.DropIndex(
                name: "ix_testexam_educationyearid",
                table: "testexam");

            migrationBuilder.DropColumn(
                name: "educationyearid",
                table: "testexam");

            migrationBuilder.AlterColumn<int>(
                name: "examtype",
                table: "testexam",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");
        }
    }
}

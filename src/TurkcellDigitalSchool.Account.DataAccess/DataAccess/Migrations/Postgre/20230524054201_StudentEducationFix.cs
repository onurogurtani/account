using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class StudentEducationFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_studenteducationinformation_city_cityid",
                table: "studenteducationinformation");

            migrationBuilder.DropForeignKey(
                name: "fk_studenteducationinformation_county_countyid",
                table: "studenteducationinformation");

            migrationBuilder.AlterColumn<long>(
                name: "countyid",
                table: "studenteducationinformation",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<long>(
                name: "cityid",
                table: "studenteducationinformation",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddForeignKey(
                name: "fk_studenteducationinformation_city_cityid",
                table: "studenteducationinformation",
                column: "cityid",
                principalTable: "city",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_studenteducationinformation_county_countyid",
                table: "studenteducationinformation",
                column: "countyid",
                principalTable: "county",
                principalColumn: "id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_studenteducationinformation_city_cityid",
                table: "studenteducationinformation");

            migrationBuilder.DropForeignKey(
                name: "fk_studenteducationinformation_county_countyid",
                table: "studenteducationinformation");

            migrationBuilder.AlterColumn<long>(
                name: "countyid",
                table: "studenteducationinformation",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "cityid",
                table: "studenteducationinformation",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "fk_studenteducationinformation_city_cityid",
                table: "studenteducationinformation",
                column: "cityid",
                principalTable: "city",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_studenteducationinformation_county_countyid",
                table: "studenteducationinformation",
                column: "countyid",
                principalTable: "county",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

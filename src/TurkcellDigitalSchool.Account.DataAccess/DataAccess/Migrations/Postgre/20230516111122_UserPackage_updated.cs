using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class UserPackage_updated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_userpackages_packages_packageid",
                table: "userpackages");

            migrationBuilder.DropForeignKey(
                name: "fk_userpackages_users_userid",
                table: "userpackages");

            migrationBuilder.DropPrimaryKey(
                name: "pk_userpackages",
                table: "userpackages");

            migrationBuilder.RenameTable(
                name: "userpackages",
                newName: "userpackage");

            migrationBuilder.RenameIndex(
                name: "ix_userpackages_userid",
                table: "userpackage",
                newName: "ix_userpackage_userid");

            migrationBuilder.RenameIndex(
                name: "ix_userpackages_packageid",
                table: "userpackage",
                newName: "ix_userpackage_packageid");

            migrationBuilder.AddPrimaryKey(
                name: "pk_userpackage",
                table: "userpackage",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_userpackage_package_packageid",
                table: "userpackage",
                column: "packageid",
                principalTable: "package",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_userpackage_users_userid",
                table: "userpackage",
                column: "userid",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_userpackage_package_packageid",
                table: "userpackage");

            migrationBuilder.DropForeignKey(
                name: "fk_userpackage_users_userid",
                table: "userpackage");

            migrationBuilder.DropPrimaryKey(
                name: "pk_userpackage",
                table: "userpackage");

            migrationBuilder.RenameTable(
                name: "userpackage",
                newName: "userpackages");

            migrationBuilder.RenameIndex(
                name: "ix_userpackage_userid",
                table: "userpackages",
                newName: "ix_userpackages_userid");

            migrationBuilder.RenameIndex(
                name: "ix_userpackage_packageid",
                table: "userpackages",
                newName: "ix_userpackages_packageid");

            migrationBuilder.AddPrimaryKey(
                name: "pk_userpackages",
                table: "userpackages",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_userpackages_packages_packageid",
                table: "userpackages",
                column: "packageid",
                principalTable: "package",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_userpackages_users_userid",
                table: "userpackages",
                column: "userid",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

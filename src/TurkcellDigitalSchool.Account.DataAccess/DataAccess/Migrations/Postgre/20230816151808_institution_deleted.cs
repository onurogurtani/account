using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class institution_deleted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_school_institution_institutionid",
                schema: "account",
                table: "school");

            migrationBuilder.DropForeignKey(
                name: "fk_school_institutiontype_institutiontypeid",
                schema: "account",
                table: "school");

            migrationBuilder.DropTable(
                name: "institution",
                schema: "account");

            migrationBuilder.DropTable(
                name: "institutiontype",
                schema: "account");

            migrationBuilder.DropIndex(
                name: "ix_school_institutionid",
                schema: "account",
                table: "school");

            migrationBuilder.DropIndex(
                name: "ix_school_institutiontypeid",
                schema: "account",
                table: "school");

            migrationBuilder.AlterColumn<int>(
                name: "institutiontypeid",
                schema: "account",
                table: "school",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "institutionid",
                schema: "account",
                table: "school",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "institutiontypeid",
                schema: "account",
                table: "school",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<long>(
                name: "institutionid",
                schema: "account",
                table: "school",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateTable(
                name: "institution",
                schema: "account",
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
                    table.PrimaryKey("pk_institution", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "institutiontype",
                schema: "account",
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
                    table.PrimaryKey("pk_institutiontype", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_school_institutionid",
                schema: "account",
                table: "school",
                column: "institutionid");

            migrationBuilder.CreateIndex(
                name: "ix_school_institutiontypeid",
                schema: "account",
                table: "school",
                column: "institutiontypeid");

            migrationBuilder.AddForeignKey(
                name: "fk_school_institution_institutionid",
                schema: "account",
                table: "school",
                column: "institutionid",
                principalSchema: "account",
                principalTable: "institution",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_school_institutiontype_institutiontypeid",
                schema: "account",
                table: "school",
                column: "institutiontypeid",
                principalSchema: "account",
                principalTable: "institutiontype",
                principalColumn: "id");
        }
    }
}

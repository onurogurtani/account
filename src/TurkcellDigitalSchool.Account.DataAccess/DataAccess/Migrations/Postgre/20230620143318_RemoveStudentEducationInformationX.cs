using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Migrations.Postgre
{
    public partial class RemoveStudentEducationInformationX : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "studenteducationinformation");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "studenteducationinformation",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    cityid = table.Column<long>(type: "bigint", nullable: true),
                    classroomid = table.Column<long>(type: "bigint", nullable: true),
                    countyid = table.Column<long>(type: "bigint", nullable: true),
                    institutionid = table.Column<long>(type: "bigint", nullable: false),
                    schoolid = table.Column<long>(type: "bigint", nullable: false),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    diplomagrade = table.Column<double>(type: "double precision", nullable: true),
                    examtype = table.Column<int>(type: "integer", nullable: false),
                    fieldtype = table.Column<int>(type: "integer", nullable: true),
                    graduationyear = table.Column<int>(type: "integer", nullable: true),
                    inserttime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    insertuserid = table.Column<long>(type: "bigint", nullable: true),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false),
                    isgraduate = table.Column<bool>(type: "boolean", nullable: true),
                    pointtype = table.Column<int>(type: "integer", nullable: true),
                    religionlessonstatus = table.Column<bool>(type: "boolean", nullable: true),
                    updatetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updateuserid = table.Column<long>(type: "bigint", nullable: true),
                    yksstatement = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_studenteducationinformation", x => x.id);
                    table.ForeignKey(
                        name: "fk_studenteducationinformation_city_cityid",
                        column: x => x.cityid,
                        principalTable: "city",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_studenteducationinformation_classrooms_classroomid",
                        column: x => x.classroomid,
                        principalTable: "classroom",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_studenteducationinformation_county_countyid",
                        column: x => x.countyid,
                        principalTable: "county",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_studenteducationinformation_institution_institutionid",
                        column: x => x.institutionid,
                        principalTable: "institution",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_studenteducationinformation_school_schoolid",
                        column: x => x.schoolid,
                        principalTable: "school",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_studenteducationinformation_user_userid",
                        column: x => x.userid,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_studenteducationinformation_cityid",
                table: "studenteducationinformation",
                column: "cityid");

            migrationBuilder.CreateIndex(
                name: "ix_studenteducationinformation_classroomid",
                table: "studenteducationinformation",
                column: "classroomid");

            migrationBuilder.CreateIndex(
                name: "ix_studenteducationinformation_countyid",
                table: "studenteducationinformation",
                column: "countyid");

            migrationBuilder.CreateIndex(
                name: "ix_studenteducationinformation_institutionid",
                table: "studenteducationinformation",
                column: "institutionid");

            migrationBuilder.CreateIndex(
                name: "ix_studenteducationinformation_schoolid",
                table: "studenteducationinformation",
                column: "schoolid");

            migrationBuilder.CreateIndex(
                name: "ix_studenteducationinformation_userid",
                table: "studenteducationinformation",
                column: "userid");
        }
    }
}

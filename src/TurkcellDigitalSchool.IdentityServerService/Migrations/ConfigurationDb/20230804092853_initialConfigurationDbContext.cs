using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TurkcellDigitalSchool.IdentityServerService.Migrations.ConfigurationDb
{
    public partial class initialConfigurationDbContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "account");

            migrationBuilder.CreateTable(
                name: "ApiResources",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    enabled = table.Column<bool>(type: "boolean", nullable: false),
                    name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    displayname = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    allowedaccesstokensigningalgorithms = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    showindiscoverydocument = table.Column<bool>(type: "boolean", nullable: false),
                    requireresourceindicator = table.Column<bool>(type: "boolean", nullable: false),
                    created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    updated = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    lastaccessed = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    noneditable = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_apiresources", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ApiScopes",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    enabled = table.Column<bool>(type: "boolean", nullable: false),
                    name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    displayname = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    required = table.Column<bool>(type: "boolean", nullable: false),
                    emphasize = table.Column<bool>(type: "boolean", nullable: false),
                    showindiscoverydocument = table.Column<bool>(type: "boolean", nullable: false),
                    created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    updated = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    lastaccessed = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    noneditable = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_apiscopes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Clients",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    enabled = table.Column<bool>(type: "boolean", nullable: false),
                    clientid = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    protocoltype = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    requireclientsecret = table.Column<bool>(type: "boolean", nullable: false),
                    clientname = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    clienturi = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    logouri = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    requireconsent = table.Column<bool>(type: "boolean", nullable: false),
                    allowrememberconsent = table.Column<bool>(type: "boolean", nullable: false),
                    alwaysincludeuserclaimsinidtoken = table.Column<bool>(type: "boolean", nullable: false),
                    requirepkce = table.Column<bool>(type: "boolean", nullable: false),
                    allowplaintextpkce = table.Column<bool>(type: "boolean", nullable: false),
                    requirerequestobject = table.Column<bool>(type: "boolean", nullable: false),
                    allowaccesstokensviabrowser = table.Column<bool>(type: "boolean", nullable: false),
                    frontchannellogouturi = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    frontchannellogoutsessionrequired = table.Column<bool>(type: "boolean", nullable: false),
                    backchannellogouturi = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    backchannellogoutsessionrequired = table.Column<bool>(type: "boolean", nullable: false),
                    allowofflineaccess = table.Column<bool>(type: "boolean", nullable: false),
                    identitytokenlifetime = table.Column<int>(type: "integer", nullable: false),
                    allowedidentitytokensigningalgorithms = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    accesstokenlifetime = table.Column<int>(type: "integer", nullable: false),
                    authorizationcodelifetime = table.Column<int>(type: "integer", nullable: false),
                    consentlifetime = table.Column<int>(type: "integer", nullable: true),
                    absoluterefreshtokenlifetime = table.Column<int>(type: "integer", nullable: false),
                    slidingrefreshtokenlifetime = table.Column<int>(type: "integer", nullable: false),
                    refreshtokenusage = table.Column<int>(type: "integer", nullable: false),
                    updateaccesstokenclaimsonrefresh = table.Column<bool>(type: "boolean", nullable: false),
                    refreshtokenexpiration = table.Column<int>(type: "integer", nullable: false),
                    accesstokentype = table.Column<int>(type: "integer", nullable: false),
                    enablelocallogin = table.Column<bool>(type: "boolean", nullable: false),
                    includejwtid = table.Column<bool>(type: "boolean", nullable: false),
                    alwayssendclientclaims = table.Column<bool>(type: "boolean", nullable: false),
                    clientclaimsprefix = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    pairwisesubjectsalt = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    userssolifetime = table.Column<int>(type: "integer", nullable: true),
                    usercodetype = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    devicecodelifetime = table.Column<int>(type: "integer", nullable: false),
                    cibalifetime = table.Column<int>(type: "integer", nullable: true),
                    pollinginterval = table.Column<int>(type: "integer", nullable: true),
                    coordinatelifetimewithusersession = table.Column<bool>(type: "boolean", nullable: true),
                    created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    updated = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    lastaccessed = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    noneditable = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_clients", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "IdentityProviders",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    scheme = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    displayname = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    enabled = table.Column<bool>(type: "boolean", nullable: false),
                    type = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    properties = table.Column<string>(type: "text", nullable: true),
                    created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    updated = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    lastaccessed = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    noneditable = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_identityproviders", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "IdentityResources",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    enabled = table.Column<bool>(type: "boolean", nullable: false),
                    name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    displayname = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    required = table.Column<bool>(type: "boolean", nullable: false),
                    emphasize = table.Column<bool>(type: "boolean", nullable: false),
                    showindiscoverydocument = table.Column<bool>(type: "boolean", nullable: false),
                    created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    updated = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    noneditable = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_identityresources", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ApiResourceClaims",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    apiresourceid = table.Column<int>(type: "integer", nullable: false),
                    type = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_apiresourceclaims", x => x.id);
                    table.ForeignKey(
                        name: "fk_apiresourceclaims_apiresources_apiresourceid",
                        column: x => x.apiresourceid,
                        principalSchema: "account",
                        principalTable: "ApiResources",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ApiResourceProperties",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    apiresourceid = table.Column<int>(type: "integer", nullable: false),
                    key = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    value = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_apiresourceproperties", x => x.id);
                    table.ForeignKey(
                        name: "fk_apiresourceproperties_apiresources_apiresourceid",
                        column: x => x.apiresourceid,
                        principalSchema: "account",
                        principalTable: "ApiResources",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ApiResourceScopes",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    scope = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    apiresourceid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_apiresourcescopes", x => x.id);
                    table.ForeignKey(
                        name: "fk_apiresourcescopes_apiresources_apiresourceid",
                        column: x => x.apiresourceid,
                        principalSchema: "account",
                        principalTable: "ApiResources",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ApiResourceSecrets",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    apiresourceid = table.Column<int>(type: "integer", nullable: false),
                    description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    value = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: false),
                    expiration = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    type = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_apiresourcesecrets", x => x.id);
                    table.ForeignKey(
                        name: "fk_apiresourcesecrets_apiresources_apiresourceid",
                        column: x => x.apiresourceid,
                        principalSchema: "account",
                        principalTable: "ApiResources",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ApiScopeClaims",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    scopeid = table.Column<int>(type: "integer", nullable: false),
                    type = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_apiscopeclaims", x => x.id);
                    table.ForeignKey(
                        name: "fk_apiscopeclaims_apiscopes_scopeid",
                        column: x => x.scopeid,
                        principalSchema: "account",
                        principalTable: "ApiScopes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ApiScopeProperties",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    scopeid = table.Column<int>(type: "integer", nullable: false),
                    key = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    value = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_apiscopeproperties", x => x.id);
                    table.ForeignKey(
                        name: "fk_apiscopeproperties_apiscopes_scopeid",
                        column: x => x.scopeid,
                        principalSchema: "account",
                        principalTable: "ApiScopes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientClaims",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    value = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    clientid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_clientclaims", x => x.id);
                    table.ForeignKey(
                        name: "fk_clientclaims_clients_clientid",
                        column: x => x.clientid,
                        principalSchema: "account",
                        principalTable: "Clients",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientCorsOrigins",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    origin = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    clientid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_clientcorsorigins", x => x.id);
                    table.ForeignKey(
                        name: "fk_clientcorsorigins_clients_clientid",
                        column: x => x.clientid,
                        principalSchema: "account",
                        principalTable: "Clients",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientGrantTypes",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    granttype = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    clientid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_clientgranttypes", x => x.id);
                    table.ForeignKey(
                        name: "fk_clientgranttypes_clients_clientid",
                        column: x => x.clientid,
                        principalSchema: "account",
                        principalTable: "Clients",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientIdPRestrictions",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    provider = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    clientid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_clientidprestrictions", x => x.id);
                    table.ForeignKey(
                        name: "fk_clientidprestrictions_clients_clientid",
                        column: x => x.clientid,
                        principalSchema: "account",
                        principalTable: "Clients",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientPostLogoutRedirectUris",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    postlogoutredirecturi = table.Column<string>(type: "character varying(400)", maxLength: 400, nullable: false),
                    clientid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_clientpostlogoutredirecturis", x => x.id);
                    table.ForeignKey(
                        name: "fk_clientpostlogoutredirecturis_clients_clientid",
                        column: x => x.clientid,
                        principalSchema: "account",
                        principalTable: "Clients",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientProperties",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    clientid = table.Column<int>(type: "integer", nullable: false),
                    key = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    value = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_clientproperties", x => x.id);
                    table.ForeignKey(
                        name: "fk_clientproperties_clients_clientid",
                        column: x => x.clientid,
                        principalSchema: "account",
                        principalTable: "Clients",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientRedirectUris",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    redirecturi = table.Column<string>(type: "character varying(400)", maxLength: 400, nullable: false),
                    clientid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_clientredirecturis", x => x.id);
                    table.ForeignKey(
                        name: "fk_clientredirecturis_clients_clientid",
                        column: x => x.clientid,
                        principalSchema: "account",
                        principalTable: "Clients",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientScopes",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    scope = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    clientid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_clientscopes", x => x.id);
                    table.ForeignKey(
                        name: "fk_clientscopes_clients_clientid",
                        column: x => x.clientid,
                        principalSchema: "account",
                        principalTable: "Clients",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientSecrets",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    clientid = table.Column<int>(type: "integer", nullable: false),
                    description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    value = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: false),
                    expiration = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    type = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_clientsecrets", x => x.id);
                    table.ForeignKey(
                        name: "fk_clientsecrets_clients_clientid",
                        column: x => x.clientid,
                        principalSchema: "account",
                        principalTable: "Clients",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "IdentityResourceClaims",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    identityresourceid = table.Column<int>(type: "integer", nullable: false),
                    type = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_identityresourceclaims", x => x.id);
                    table.ForeignKey(
                        name: "fk_identityresourceclaims_identityresources_identityresourceid",
                        column: x => x.identityresourceid,
                        principalSchema: "account",
                        principalTable: "IdentityResources",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "IdentityResourceProperties",
                schema: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    identityresourceid = table.Column<int>(type: "integer", nullable: false),
                    key = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    value = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_identityresourceproperties", x => x.id);
                    table.ForeignKey(
                        name: "fk_identityresourceproperties_identityresources_identityresour~",
                        column: x => x.identityresourceid,
                        principalSchema: "account",
                        principalTable: "IdentityResources",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_apiresourceclaims_apiresourceid_type",
                schema: "account",
                table: "ApiResourceClaims",
                columns: new[] { "apiresourceid", "type" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_apiresourceproperties_apiresourceid_key",
                schema: "account",
                table: "ApiResourceProperties",
                columns: new[] { "apiresourceid", "key" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_apiresources_name",
                schema: "account",
                table: "ApiResources",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_apiresourcescopes_apiresourceid_scope",
                schema: "account",
                table: "ApiResourceScopes",
                columns: new[] { "apiresourceid", "scope" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_apiresourcesecrets_apiresourceid",
                schema: "account",
                table: "ApiResourceSecrets",
                column: "apiresourceid");

            migrationBuilder.CreateIndex(
                name: "ix_apiscopeclaims_scopeid_type",
                schema: "account",
                table: "ApiScopeClaims",
                columns: new[] { "scopeid", "type" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_apiscopeproperties_scopeid_key",
                schema: "account",
                table: "ApiScopeProperties",
                columns: new[] { "scopeid", "key" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_apiscopes_name",
                schema: "account",
                table: "ApiScopes",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_clientclaims_clientid_type_value",
                schema: "account",
                table: "ClientClaims",
                columns: new[] { "clientid", "type", "value" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_clientcorsorigins_clientid_origin",
                schema: "account",
                table: "ClientCorsOrigins",
                columns: new[] { "clientid", "origin" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_clientgranttypes_clientid_granttype",
                schema: "account",
                table: "ClientGrantTypes",
                columns: new[] { "clientid", "granttype" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_clientidprestrictions_clientid_provider",
                schema: "account",
                table: "ClientIdPRestrictions",
                columns: new[] { "clientid", "provider" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_clientpostlogoutredirecturis_clientid_postlogoutredirecturi",
                schema: "account",
                table: "ClientPostLogoutRedirectUris",
                columns: new[] { "clientid", "postlogoutredirecturi" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_clientproperties_clientid_key",
                schema: "account",
                table: "ClientProperties",
                columns: new[] { "clientid", "key" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_clientredirecturis_clientid_redirecturi",
                schema: "account",
                table: "ClientRedirectUris",
                columns: new[] { "clientid", "redirecturi" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_clients_clientid",
                schema: "account",
                table: "Clients",
                column: "clientid",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_clientscopes_clientid_scope",
                schema: "account",
                table: "ClientScopes",
                columns: new[] { "clientid", "scope" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_clientsecrets_clientid",
                schema: "account",
                table: "ClientSecrets",
                column: "clientid");

            migrationBuilder.CreateIndex(
                name: "ix_identityproviders_scheme",
                schema: "account",
                table: "IdentityProviders",
                column: "scheme",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_identityresourceclaims_identityresourceid_type",
                schema: "account",
                table: "IdentityResourceClaims",
                columns: new[] { "identityresourceid", "type" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_identityresourceproperties_identityresourceid_key",
                schema: "account",
                table: "IdentityResourceProperties",
                columns: new[] { "identityresourceid", "key" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_identityresources_name",
                schema: "account",
                table: "IdentityResources",
                column: "name",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApiResourceClaims",
                schema: "account");

            migrationBuilder.DropTable(
                name: "ApiResourceProperties",
                schema: "account");

            migrationBuilder.DropTable(
                name: "ApiResourceScopes",
                schema: "account");

            migrationBuilder.DropTable(
                name: "ApiResourceSecrets",
                schema: "account");

            migrationBuilder.DropTable(
                name: "ApiScopeClaims",
                schema: "account");

            migrationBuilder.DropTable(
                name: "ApiScopeProperties",
                schema: "account");

            migrationBuilder.DropTable(
                name: "ClientClaims",
                schema: "account");

            migrationBuilder.DropTable(
                name: "ClientCorsOrigins",
                schema: "account");

            migrationBuilder.DropTable(
                name: "ClientGrantTypes",
                schema: "account");

            migrationBuilder.DropTable(
                name: "ClientIdPRestrictions",
                schema: "account");

            migrationBuilder.DropTable(
                name: "ClientPostLogoutRedirectUris",
                schema: "account");

            migrationBuilder.DropTable(
                name: "ClientProperties",
                schema: "account");

            migrationBuilder.DropTable(
                name: "ClientRedirectUris",
                schema: "account");

            migrationBuilder.DropTable(
                name: "ClientScopes",
                schema: "account");

            migrationBuilder.DropTable(
                name: "ClientSecrets",
                schema: "account");

            migrationBuilder.DropTable(
                name: "IdentityProviders",
                schema: "account");

            migrationBuilder.DropTable(
                name: "IdentityResourceClaims",
                schema: "account");

            migrationBuilder.DropTable(
                name: "IdentityResourceProperties",
                schema: "account");

            migrationBuilder.DropTable(
                name: "ApiResources",
                schema: "account");

            migrationBuilder.DropTable(
                name: "ApiScopes",
                schema: "account");

            migrationBuilder.DropTable(
                name: "Clients",
                schema: "account");

            migrationBuilder.DropTable(
                name: "IdentityResources",
                schema: "account");
        }
    }
}

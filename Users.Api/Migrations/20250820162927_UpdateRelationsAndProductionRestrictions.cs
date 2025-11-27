using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Users.Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRelationsAndProductionRestrictions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductionModels_Users_UserId",
                table: "ProductionModels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductionModels",
                table: "ProductionModels");

            migrationBuilder.RenameTable(
                name: "ProductionModels",
                newName: "Productions");

            migrationBuilder.RenameIndex(
                name: "IX_ProductionModels_UserId",
                table: "Productions",
                newName: "IX_Productions_UserId");

            migrationBuilder.AddColumn<int>(
                name: "UserModelIdUser",
                table: "Productions",
                type: "integer",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Productions",
                table: "Productions",
                column: "ProductionId");

            migrationBuilder.CreateIndex(
                name: "IX_Productions_AreaId",
                table: "Productions",
                column: "AreaId");

            migrationBuilder.CreateIndex(
                name: "IX_Productions_LineId",
                table: "Productions",
                column: "LineId");

            migrationBuilder.CreateIndex(
                name: "IX_Productions_MachineId",
                table: "Productions",
                column: "MachineId");

            migrationBuilder.CreateIndex(
                name: "IX_Productions_StationId",
                table: "Productions",
                column: "StationId");

            migrationBuilder.CreateIndex(
                name: "IX_Productions_UserModelIdUser",
                table: "Productions",
                column: "UserModelIdUser");

            migrationBuilder.AddForeignKey(
                name: "FK_Productions_AreaModels_AreaId",
                table: "Productions",
                column: "AreaId",
                principalTable: "AreaModels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Productions_Lines_LineId",
                table: "Productions",
                column: "LineId",
                principalTable: "Lines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Productions_Machines_MachineId",
                table: "Productions",
                column: "MachineId",
                principalTable: "Machines",
                principalColumn: "MachineId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Productions_Users_UserId",
                table: "Productions",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "IdUser",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Productions_Users_UserModelIdUser",
                table: "Productions",
                column: "UserModelIdUser",
                principalTable: "Users",
                principalColumn: "IdUser");

            migrationBuilder.AddForeignKey(
                name: "FK_Productions_WorkStations_StationId",
                table: "Productions",
                column: "StationId",
                principalTable: "WorkStations",
                principalColumn: "WorkStationId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Productions_AreaModels_AreaId",
                table: "Productions");

            migrationBuilder.DropForeignKey(
                name: "FK_Productions_Lines_LineId",
                table: "Productions");

            migrationBuilder.DropForeignKey(
                name: "FK_Productions_Machines_MachineId",
                table: "Productions");

            migrationBuilder.DropForeignKey(
                name: "FK_Productions_Users_UserId",
                table: "Productions");

            migrationBuilder.DropForeignKey(
                name: "FK_Productions_Users_UserModelIdUser",
                table: "Productions");

            migrationBuilder.DropForeignKey(
                name: "FK_Productions_WorkStations_StationId",
                table: "Productions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Productions",
                table: "Productions");

            migrationBuilder.DropIndex(
                name: "IX_Productions_AreaId",
                table: "Productions");

            migrationBuilder.DropIndex(
                name: "IX_Productions_LineId",
                table: "Productions");

            migrationBuilder.DropIndex(
                name: "IX_Productions_MachineId",
                table: "Productions");

            migrationBuilder.DropIndex(
                name: "IX_Productions_StationId",
                table: "Productions");

            migrationBuilder.DropIndex(
                name: "IX_Productions_UserModelIdUser",
                table: "Productions");

            migrationBuilder.DropColumn(
                name: "UserModelIdUser",
                table: "Productions");

            migrationBuilder.RenameTable(
                name: "Productions",
                newName: "ProductionModels");

            migrationBuilder.RenameIndex(
                name: "IX_Productions_UserId",
                table: "ProductionModels",
                newName: "IX_ProductionModels_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductionModels",
                table: "ProductionModels",
                column: "ProductionId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductionModels_Users_UserId",
                table: "ProductionModels",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "IdUser",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

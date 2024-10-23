using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ModifyBidsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0eb4172c-107d-4e9d-bb42-8cb4dab35714");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7ccd9240-ac2c-4760-b469-42389f267f40");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "9c0d5900-eef2-47ea-ae48-cd94d26bb09e", null, "Admin", "ADMIN" },
                    { "a19a4616-0bf5-4831-a0d2-83c5eea616a4", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9c0d5900-eef2-47ea-ae48-cd94d26bb09e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a19a4616-0bf5-4831-a0d2-83c5eea616a4");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0eb4172c-107d-4e9d-bb42-8cb4dab35714", null, "Admin", "ADMIN" },
                    { "7ccd9240-ac2c-4760-b469-42389f267f40", null, "User", "USER" }
                });
        }
    }
}

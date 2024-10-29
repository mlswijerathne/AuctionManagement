using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class @in : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1fb3fbc6-1c25-4c5f-9723-ab02d49ed59f");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "daa6c4de-f318-43eb-aaf3-a391bc7d44c1", "1" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "daa6c4de-f318-43eb-aaf3-a391bc7d44c1");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "07885444-9b1d-46d9-8d9f-3c5782475c8e", null, "User", "USER" },
                    { "3c536c97-068e-4cea-9baf-dc3ab5dd148b", null, "Admin", "ADMIN" }
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "Address", "ConcurrencyStamp", "ContactNumber", "PasswordHash", "PhoneNumber", "SecurityStamp", "UserName" },
                values: new object[] { "Colombo", "bd898dc0-64f4-4b6c-bbb1-bfd06a0a01d5", "0766298167", "AQAAAAIAAYagAAAAEFBWiD18nS6+R+ycnyZE5nO2VeMS6Ax6yLLg8pyaPY2O81Uot6KWDgTVyNCLd872EA==", null, "32b7be88-d2b8-4176-83f7-838494471909", "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "3c536c97-068e-4cea-9baf-dc3ab5dd148b", "1" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "07885444-9b1d-46d9-8d9f-3c5782475c8e");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "3c536c97-068e-4cea-9baf-dc3ab5dd148b", "1" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3c536c97-068e-4cea-9baf-dc3ab5dd148b");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1fb3fbc6-1c25-4c5f-9723-ab02d49ed59f", null, "User", "USER" },
                    { "daa6c4de-f318-43eb-aaf3-a391bc7d44c1", null, "Admin", "ADMIN" }
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "Address", "ConcurrencyStamp", "ContactNumber", "PasswordHash", "PhoneNumber", "SecurityStamp", "UserName" },
                values: new object[] { null, "1539e442-a2c5-465f-8783-4ee582ba4e2e", null, "AQAAAAIAAYagAAAAEJl1LMWeglpeAbKbfaeScHGfLugtQiYqgrom8z+oC5khrNQunODgjjqGbBxmeDJ8ww==", "0766298167", "51228250-ee39-4320-967a-874b161b5b0b", "admin@dreambid.com" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "daa6c4de-f318-43eb-aaf3-a391bc7d44c1", "1" });
        }
    }
}

using DreamBid.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace DreamBid.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Seed Roles
            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                }
            };

            builder.Entity<IdentityRole>().HasData(roles);

            // Create Admin User
            var hasher = new PasswordHasher<User>();
            var adminUser = new User
            {
                Id = "1", // Using a constant GUID for seeding
                UserName = "admin",
                NormalizedUserName = "ADMIN@DREAMBID.COM",
                Email = "admin@dreambid.com",
                NormalizedEmail = "ADMIN@DREAMBID.COM",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                FirstName = "Lakshitha",
                LastName = "Wijerathne",
                ContactNumber = "0766298167",
                Address = "Colombo",
                PhoneNumberConfirmed = true,
                TwoFactorEnabled = false,
                LockoutEnabled = false,
                AccessFailedCount = 0,
                Role = "Admin"
            };

            adminUser.PasswordHash = hasher.HashPassword(adminUser, "Admin@123");
            builder.Entity<User>().HasData(adminUser);

            // Seed Admin Role Assignment
            builder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>
                {
                    RoleId = roles[0].Id, // Admin role ID
                    UserId = adminUser.Id
                }
            );
        }

        public new DbSet<User> Users { get; set; }
        public DbSet<Auction> Auctions { get; set; }
        public DbSet<Bid> Bids { get; set; }
    }
}
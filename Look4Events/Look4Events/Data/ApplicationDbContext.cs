using System;
using System.Collections.Generic;
using System.Text;
using Look4Events.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Look4Events.Models.Events;

namespace Look4Events.Data
{


    public class ApplicationDbContext : IdentityDbContext<AppUser, AppRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Look4Events.Models.Events.Event> Events { get; set; }
    }
}

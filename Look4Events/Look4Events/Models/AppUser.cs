using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Look4Events.Models
{
    public class AppUser : IdentityUser
    {
        public AppUser() : base()
        {
        }

        public Guid identifier { get; set; }
        public string Rol { get; set; }
        [Required]
        public string Email { get; set; }
        public string Name { get; set; }
        public string LugarDeOrigen { get; set; }
        public DateTime FechaRegistro { get; set; }
        public DateTime FechaNacimiento { get; set; }


    }

}

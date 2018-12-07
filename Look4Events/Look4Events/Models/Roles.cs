using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Look4Events.Models
{
    public class Roles: IdentityRole
    {

            /*Creamos 3 constructores
                Un constructor vacío
                Un constructor  con un parametro
                Un constructor con 3 parametros
                */

            public Roles() : base()
            {

            }
            public Roles(string roleName) : base(roleName)
            {

            }
            public Roles(string roleName, string description, DateTime creationDate) : base(roleName)
            {
                this.Description = description;
                this.CreationDate = creationDate;

            }
            public string Description { get; set; }
            public DateTime CreationDate { get; set; }
        
        /*Despues de esto, Tenemos que cambiar el AplicationDbContext
        Le tenemos que especificar que va a usar los nuevos modelos que hemos creado*/
    }
}

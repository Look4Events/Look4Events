using Look4Events.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Look4Events.Services
{
    public interface IUsuarioService
    {
        Task<Usuario[]> GetUsuariosAsync();
    }
}

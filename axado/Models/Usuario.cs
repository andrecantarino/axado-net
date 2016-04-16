using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace axado.Models
{
    /* MODELO DE DADOS DO USUARIO */
    public class Usuario
    {
        public string name { get; set; }
        public string cpf { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}
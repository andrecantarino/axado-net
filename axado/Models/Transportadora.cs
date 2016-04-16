using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace axado.Models
{
    /* MODELO DE DADOS DA TRANSPORTADORA */
    public class Transportadora
    {
        public string _id { get; set; }
        public string name { get; set; }
        public string company_name { get; set; }
        public string cnpj { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string cnpjHidden { get; set; }
        public string transportadoraId { get; set; }
    }
}
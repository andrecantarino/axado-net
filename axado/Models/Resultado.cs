using System.Collections.Generic;

namespace axado.Models
{
    /* MODELO PARA EXIBIR O RESULTADO DA API */
    public class Resultado
    {
        public bool erro { get; set; }
        public string mensagem { get; set; }
        public IEnumerable<object> lista { get; set; }
    }

    /* MODELO PARA EXIBIR O RESULTADO DE UMA TRANSPORTADORA RETORNADO DA API */
    public class ResultadoDetails
    {
        public bool erro { get; set; }
        public string mensagem { get; set; }
        public IEnumerable<Transportadora> lista { get; set; }
    }

    /* MODELO PARA EXIBIR O RESULTADO DE UM USUARIO RETORNADO DA API */
    public class ResultadoUsuario
    {
        public bool erro { get; set; }
        public string mensagem { get; set; }
        public Usuario lista { get; set; }
    }
}
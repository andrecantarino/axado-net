using axado.Models;
using axado.Utilidade;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace axado.Controllers
{
    public class LoginController : Controller
    {
        private string _baseAdress = string.Format("{0}", rotas.api.caminhoApi());

        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string LoginUsuario(string json)
        {
            string result = string.Empty;
            if (!string.IsNullOrEmpty(json))
            {
                Usuario usu = JsonConvert.DeserializeObject<Usuario>(json);
                if (usu != null)
                {
                    RequestTask cliente = new RequestTask(_baseAdress + "usuario/login/");
                    result = Task.Run(() => cliente.ConsumirServicoRest_Post(usu)).Result;
                }
            }

            return result;
        }
    }
}
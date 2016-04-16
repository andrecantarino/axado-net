using axado.Models;
using axado.Utilidade;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace axado.Areas.Admin.Controllers
{
    public class TransportadoraController : Controller
    {
        private string _baseAdress = string.Format("{0}", rotas.api.caminhoApi());

        // GET: Admin/Transportadora
        public ActionResult Index()
        {
            /* 
             * VERIFICAR SE EXISTE COOKIE DE USUARIO 
             * SE NAO EXISTIR REDIRECIONAR PARA LOGIN
             */
            HttpCookie aCookie;
            ViewBag.number = 1;
            if (Request.Cookies.Count > 0)
            {
                for (int i = 0; i < Request.Cookies.Count; i++)
                {
                    aCookie = Request.Cookies["id"];

                    if (aCookie == null)
                    {
                        return Redirect("/login/");
                    }
                    else
                    {
                        if (aCookie.Value == "")
                        {
                            return Redirect("/login/");
                        }
                        else {
                            /* VERIFICA SE OS DADOS DO USUARIO EXISTEM NO BANCO DE DADOS */
                            RequestTask cliente = new RequestTask(_baseAdress + "usuario/"+ aCookie.Value.Replace("\"", ""));
                            string result = Task.Run(() => cliente.ConsumirServicoRest_Get()).Result;
                            ResultadoUsuario resultado = JsonConvert.DeserializeObject<ResultadoUsuario>(result);
                            if (!resultado.erro)
                            {
                                /* BUSCAR LISTA DE TRANSPORTADORAS */
                                ResultadoDetails resultadoDetails = JsonConvert.DeserializeObject<ResultadoDetails>(CarregarTransportadora());
                                if (!resultadoDetails.erro && resultadoDetails.lista != null && resultadoDetails.lista.Count() > 0)
                                {
                                    return View(resultadoDetails.lista);
                                }
                                return Redirect("/login/");
                            }
                            else {
                                return Redirect("/login/");
                            }
                        }
                    }
                }
            }

            return Redirect("/login/");
        }

        // GET: Admin/Transportadora/Novo
        public ActionResult Novo()
        {
            /* VERIFICAR SE COOKIE E LOGIN CONFEREM E DIRECIONAR PARA CADASTRO DE TRANSPORTADORA */
            HttpCookie aCookie;

            if (Request.Cookies.Count > 0)
            {
                for (int i = 0; i < Request.Cookies.Count; i++)
                {
                    aCookie = Request.Cookies["id"];

                    if (aCookie == null)
                    {
                        return Redirect("/login/");
                    }
                    else
                    {
                        if (aCookie.Value == "")
                        {
                            return Redirect("/login/");
                        }
                        else
                        {
                            RequestTask cliente = new RequestTask(_baseAdress + "usuario/" + aCookie.Value.Replace("\"", ""));
                            string result = Task.Run(() => cliente.ConsumirServicoRest_Get()).Result;
                            ResultadoUsuario resultado = JsonConvert.DeserializeObject<ResultadoUsuario>(result);

                            if (!resultado.erro)
                            {
                                return View();
                            }
                            else
                            {
                                return Redirect("/login/");
                            }
                        }
                    }
                }
            }

            return Redirect("/login/");
        }

        // GET: Admin/Transportadora/Editar
        public ActionResult Editar()
        {
            /* VERIFICAR SE COOKIE E LOGIN CONFEREM E DIRECIONAR PARA EDICAO DE TRANSPORTADORA */
            HttpCookie aCookie;

            if (Request.Cookies.Count > 0)
            {
                for (int i = 0; i < Request.Cookies.Count; i++)
                {
                    aCookie = Request.Cookies["id"];

                    if (aCookie == null)
                    {
                        return Redirect("/login/");
                    }
                    else
                    {
                        if (aCookie.Value == "")
                        {
                            return Redirect("/login/");
                        }
                        else
                        {
                            RequestTask cliente = new RequestTask(_baseAdress + "usuario/" + aCookie.Value.Replace("\"", ""));
                            string result = Task.Run(() => cliente.ConsumirServicoRest_Get()).Result;
                            ResultadoUsuario resultado = JsonConvert.DeserializeObject<ResultadoUsuario>(result);

                            if (!resultado.erro)
                            {
                                return View();
                            }
                            else
                            {
                                return Redirect("/login/");
                            }
                        }
                    }
                }
            }

            return Redirect("/login/");
        }

        // GET: Admin/Transportadora/Detalhe
        public ActionResult Detalhe()
        {
            /* VERIFICAR SE COOKIE E LOGIN CONFEREM E DIRECIONAR PARA DETALHE DA TRANSPORTADORA */
            HttpCookie aCookie;

            if (Request.Cookies.Count > 0)
            {
                for (int i = 0; i < Request.Cookies.Count; i++)
                {
                    aCookie = Request.Cookies["id"];

                    if (aCookie == null)
                    {
                        return Redirect("/login/");
                    }
                    else
                    {
                        if (aCookie.Value == "")
                        {
                            return Redirect("/login/");
                        }
                        else
                        {
                            RequestTask cliente = new RequestTask(_baseAdress + "usuario/" + aCookie.Value.Replace("\"", ""));
                            string result = Task.Run(() => cliente.ConsumirServicoRest_Get()).Result;
                            ResultadoUsuario resultado = JsonConvert.DeserializeObject<ResultadoUsuario>(result);

                            if (!resultado.erro)
                            {
                                return View();
                            }
                            else
                            {
                                return Redirect("/login/");
                            }
                        }
                    }
                }
            }

            return Redirect("/login/");
        }

        /// <summary>
        /// CarregarTransportadora
        /// </summary>
        /// <returns></returns>
        public string CarregarTransportadora()
        {
            /* CARREGAR LISTA DE TRANSPORTADORAS */
            try
            {
                RequestTask cliente = new RequestTask(_baseAdress + "transportadora/listar/");
                string result = Task.Run(() => cliente.ConsumirServicoRest_Get()).Result;
                return result;
            }
            catch
            {
               return string.Empty;
            }
        }

        /// <summary>
        /// Detalhe
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Detalhe(string id)
        {
            /* CARREGAR DETALHE DA TRANSPORTADORA */
            try
            {
                RequestTask cliente = new RequestTask(_baseAdress + "transportadora/" + id);
                string result = Task.Run(() => cliente.ConsumirServicoRest_Get()).Result;
                ResultadoDetails resultadoDetails = JsonConvert.DeserializeObject<ResultadoDetails>(result);
                if (!resultadoDetails.erro && resultadoDetails.lista != null && resultadoDetails.lista.Count() > 0)
                {
                    return View(resultadoDetails.lista.First());
                }
                else
                {
                    return RedirectToAction("Index", "Home");
                }              
            }
            catch (Exception exception)
            {
                return RedirectToAction("Index", "Home");
            }                     
        }

        /// <summary>
        /// Editar
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Editar(string id)
        {
            /* CARREGAR DADOS DA TRANSPORTADORA DA API E ENVIAR AO FORMULARIO DE EDICAO */
            try
            {
                RequestTask cliente = new RequestTask(_baseAdress + "transportadora/" + id);
                string result = Task.Run(() => cliente.ConsumirServicoRest_Get()).Result;
                ResultadoDetails resultadoDetails = JsonConvert.DeserializeObject<ResultadoDetails>(result);
                if (!resultadoDetails.erro && resultadoDetails.lista != null && resultadoDetails.lista.Count() > 0)
                {
                    return View(resultadoDetails.lista.First());
                }
                else
                {
                    return RedirectToAction("Index", "Home");
                }
            }
            catch (Exception exception)
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpPost]
        public string Salvar(string json)
        {
            /* ENVIAR DADOS PARA SALVAR DA TRANSPORTADORA PARA A API */
            string result = string.Empty;
            if (!string.IsNullOrEmpty(json))
            {
                Transportadora trans = JsonConvert.DeserializeObject<Transportadora>(json);
                if (trans != null)
                {
                    RequestTask cliente = new RequestTask(_baseAdress + "transportadora/salvar/");
                    result = Task.Run(() => cliente.ConsumirServicoRest_Post(trans)).Result;
                }
            }

            return result;
        }

        [HttpPost]
        public string EditarTransportadora(string json)
        {
            /* ENVIAR DADOS PARA EDICAO DA TRANSPORTADORA PARA A API */
            string result = string.Empty;
            if (!string.IsNullOrEmpty(json))
            {
                Transportadora trans = JsonConvert.DeserializeObject<Transportadora>(json);
                if (trans != null)
                {
                    RequestTask cliente = new RequestTask(_baseAdress + "transportadora/editar/" + trans.cnpjHidden + "/");
                    result = Task.Run(() => cliente.ConsumirServicoRest_Put(trans)).Result;
                }
            }

            return result;
        }

        [HttpPost]
        public string DeletarTransportadora(string cnpj) {
            /* ENVIAR DADOS PARA DELETAR TRANSPORTADORA PARA A API */
            string result = string.Empty;
            if (!string.IsNullOrEmpty(cnpj))
            {
                RequestTask cliente = new RequestTask(_baseAdress + "transportadora/deletar/" + cnpj);
                result = Task.Run(() => cliente.ConsumirServicoRest_Delete()).Result;
            }
            return result;
        }

        [HttpPost]
        public string BuscarTransportadora(string q)
        {
            /* ENVIAR DADOS PARA BUSCAR A TRANSPORTADORA NA API */
            string result = string.Empty;
            RequestTask cliente = new RequestTask(_baseAdress + "transportadora?q=" + q);
            result = Task.Run(() => cliente.ConsumirServicoRest_Get()).Result;

            return result;
        }

        [HttpPost]
        public string Avaliar(string json)
        {
            /* ENVIAR DADOS PARA AVALIAR DA TRANSPORTADORA PARA A API */
            string result = string.Empty;
            if (!string.IsNullOrEmpty(json))
            {
                Rating rat = JsonConvert.DeserializeObject<Rating>(json);
                if (rat != null)
                {
                    RequestTask cliente = new RequestTask(_baseAdress + "transportadora/avaliar");
                    result = Task.Run(() => cliente.ConsumirServicoRest_Post(rat)).Result;
                }
            }

            return result;
        }

        [HttpPost]
        public string BuscarAvaliacao(string cpf)
        {
            /* ENVIAR DADOS PARA BUSCAR TODAS AS AVALIACAOES DO USUARIO PARA A API */
            cpf = cpf.Replace("\"", "");
            string result = string.Empty;
            RequestTask cliente = new RequestTask(_baseAdress + "rating/" + cpf);
            result = Task.Run(() => cliente.ConsumirServicoRest_Get()).Result;

            return result;
        }
    }
}
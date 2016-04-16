using Newtonsoft.Json;
using axado.Models;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace axado.Utilidade
{
    public class RequestTask
    {
        protected readonly string _endpoint;

        /// <summary>
        /// 
        /// </summary>
        public RequestTask()
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="endpoint"></param>
        public RequestTask(string endpoint)
        {
            _endpoint = endpoint;
        }

        /// <summary>
        /// ConsumirServicoRest_Get
        /// </summary>
        /// <param name="uri"></param>
        /// <returns></returns>
        public async Task<string> ConsumirServicoRest_Get(string uri = "")
        {
            Resultado retErro = new Resultado();
            try
            {
                var cliente = new HttpClient();
                cliente.BaseAddress = new Uri(_endpoint);
                StringBuilder req = new StringBuilder();
                req.Append(uri);
                var response = cliente.GetAsync(req.ToString(), HttpCompletionOption.ResponseHeadersRead).Result;
                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadAsStringAsync();
                }
                else
                {
                    retErro.erro = true;
                    retErro.mensagem = response.RequestMessage.ToString();
                    return JsonConvert.SerializeObject(retErro);
                }

            }
            catch (Exception exception)
            {
                retErro.erro = true;
                retErro.mensagem = exception.Message;
                return JsonConvert.SerializeObject(retErro);
            }
        }

        /// <summary>
        /// ConsumirServicoRest_Post
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="header"></param>
        /// <returns></returns>
        public async Task<string> ConsumirServicoRest_Post<T>(T header, string url = "")
        {
            Resultado retErro = new Resultado();
            try
            {
                using (var cliente = new HttpClient())
                {
                    System.Net.ServicePointManager.Expect100Continue = false;
                    cliente.BaseAddress = new Uri(_endpoint);
                    cliente.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    string req = string.Format("{0}", url);
                    var response = cliente.PostAsJsonAsync(req.ToString(), header).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        return await response.Content.ReadAsStringAsync();
                    }
                    else
                    {
                        retErro.mensagem = "Erro ConsumirServicoRest_Post";
                        retErro.erro = true;
                        return JsonConvert.SerializeObject(retErro);
                    }
                }
            }
            catch (Exception e)
            {
                retErro.mensagem = e.ToString();
                retErro.erro = true;
                return JsonConvert.SerializeObject(retErro);
            }
        }

        /// <summary>
        /// ConsumirServicoRest_Put
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="header"></param>
        /// <returns></returns>
        public async Task<string> ConsumirServicoRest_Put<T>(T header, string url = "")
        {
            Resultado retErro = new Resultado();
            try
            {
                using (var cliente = new HttpClient())
                {
                    System.Net.ServicePointManager.Expect100Continue = false;
                    cliente.BaseAddress = new Uri(_endpoint);
                    cliente.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    string req = string.Format("{0}", url);
                    var response = cliente.PutAsJsonAsync(req.ToString(), header).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        return await response.Content.ReadAsStringAsync();
                    }
                    else
                    {
                        retErro.mensagem = "Erro ConsumirServicoRest_Put";
                        retErro.erro = true;
                        return JsonConvert.SerializeObject(retErro);
                    }
                }
            }
            catch (Exception e)
            {
                retErro.mensagem = e.ToString();
                retErro.erro = true;
                return JsonConvert.SerializeObject(retErro);
            }
        }

        /// <summary>
        /// ConsumirServicoRest_Delete
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="header"></param>
        /// <returns></returns>
        public async Task<string> ConsumirServicoRest_Delete(string url = "")
        {
            Resultado retErro = new Resultado();
            try
            {
                using (var cliente = new HttpClient())
                {
                    System.Net.ServicePointManager.Expect100Continue = false;
                    cliente.BaseAddress = new Uri(_endpoint);
                    string req = string.Format("{0}", url);
                    var response = cliente.DeleteAsync(req.ToString()).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        return await response.Content.ReadAsStringAsync();
                    }
                    else
                    {
                        retErro.mensagem = "Erro ConsumirServicoRest_Post";
                        retErro.erro = true;
                        return JsonConvert.SerializeObject(retErro);
                    }
                }
            }
            catch (Exception e)
            {
                retErro.mensagem = e.ToString();
                retErro.erro = true;
                return JsonConvert.SerializeObject(retErro);
            }
        }
    }
}
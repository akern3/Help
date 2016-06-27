using HelpServer.Context;
using HelpServer.Models;
using HelpServer.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace HelpServer.Controllers
{
    public class ObservacaoController : ApiController
    {

        HelpContext db = new HelpContext();


        IEnumerable<Observacao> observacoes = new List<Observacao>();
        static readonly IObservacaoRepository repositorio = new ObservacaoRepository();

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        // GET: api/Observacao
        public IEnumerable<Observacao> Get()
        {
            try
            {
                return repositorio.GetAll();
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }

        // GET: api/Observacao/5
        public Observacao Get(int id)
        {
            try
            {
                return repositorio.Get(id);
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            
        }

        // POST: api/Observacao
        public HttpResponseMessage Post([FromBody]Observacao value, int idSolicitacao)
        {
            try
            {
                value = repositorio.Add(value);

                var response = Request.CreateResponse<Observacao>(HttpStatusCode.Created, value);

                return response;
                //return Request.CreateResponse(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse<Observacao>(HttpStatusCode.BadRequest, value);
                // return Request.CreateResponse(HttpStatusCode.ExpectationFailed);
            }
        }

        // PUT: api/Observacao/5
        public void Put(int id, [FromBody]Observacao value)
        {
            try
            {
                repositorio.Update(id, value);
            }
            catch (Exception ex)
            {

                
            }
        }

        // DELETE: api/Observacao/5
        public void Delete(int id)
        {
            Observacao item = repositorio.Get(id);
            if (item == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            repositorio.Remove(item);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HelpServer.Models;
using HelpServer.Context;
using System.Data.Entity.Validation;
using HelpServer.Repositorios;

namespace HelpServer.Controllers
{
    public class SolicitacaoController : ApiController
    {


        static readonly ISolicitacaoRepository repositorio = new SolicitacaoRepository();


        // GET: api/Solicitacao
        public IEnumerable <Solicitacao> Get()
        {
            try
            {

                return repositorio.GetAll();

            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound); ;
            }
        }

        // GET: api/Solicitacao/5
        public Solicitacao Get(long id)
        {
            Solicitacao item = repositorio.Get(id);
            if (item == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return item;
        }

        // POST: api/Solicitacao
        public HttpResponseMessage Post([FromBody]Solicitacao value)
        {

            try
            {
                value = repositorio.Add(value);

                var response = Request.CreateResponse<Solicitacao>(HttpStatusCode.Created, value);

                return response;
            }
            catch (Exception ex)
            {

                throw;
            }
            

        }

        // PUT: api/Solicitacao/5
        public void Put(long id, [FromBody]Solicitacao value)
        {
            //todo: implementar alteração de solicitação

            //try
            //{
            //    var temp = db.db.Find(id);
            //    if (temp != null)
            //    {
            //        temp.andar = value.andar != "" ? value.andar : temp.andar ;
            //        temp.criticidade = value.criticidade > 0 ? value.criticidade : temp.criticidade;
            //        temp.data = value.data != null ? value.data : temp.data;
            //        temp.sala = value.sala != "" ? value.sala : temp.sala;
            //        temp.setor = value.setor > 0 ? value.setor : temp.setor;
            //    }
            //    db.SaveChanges();
            //    return Request.CreateResponse(HttpStatusCode.OK);
            //}
            //catch (Exception ex)
            //{

            //    throw ;
            //}
            
            //if (!repositorio.Update(value))
            //{
            //    throw new HttpResponseException(HttpStatusCode.NotFound);
            //}
            repositorio.Update(id,value);

        }

        // DELETE: api/Solicitacao/5
        public void Delete(long id)
        {

            Solicitacao item = repositorio.Get(id);
            if (item == null)
            {                                                                                                                     
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            repositorio.Remove(item);
        }
    }
}

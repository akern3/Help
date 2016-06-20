using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HelpServer.Models;
using HelpServer.Context;
using System.Data.Entity.Validation;

namespace HelpServer.Controllers
{
    public class SolicitacaoController : ApiController
    {


        HelpContext db = new HelpContext();


        public ICollection<Solicitacao> solicitacoes { get; set; }

        //public SolicitacaoController()
        //{

        //    solicitacoes = new List<Solicitacao>();
        //    solicitacoes.Add(new Solicitacao { id = 1, solicitante = "", andar = "3", sala = "314", criticidade = "alta", data = DateTime.Now, observacao = "Problema numero 1", responsavel = "" });
        //    solicitacoes.Add(new Solicitacao { id = 2, solicitante = "", andar = "2", sala = "213", criticidade = "media", data = DateTime.Now, observacao = "Problema numero 2", responsavel = "" });
        //    solicitacoes.Add(new Solicitacao { id = 3, solicitante = "", andar = "3", sala = "350", criticidade = "baixa", data = DateTime.Now, observacao = "Problema numero 3", responsavel = "" });

        //}

        // GET: api/Solicitacao
        public IQueryable <Solicitacao> Get()
        {
            try
            {

                return db.solicitacoes.AsQueryable();
                //return solicitacoes;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        // GET: api/Solicitacao/5
        public Solicitacao Get(long id)
        {
            try
            {
                return db.solicitacoes.Where(x => x.Id == id).First();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        // POST: api/Solicitacao
        public HttpResponseMessage Post([FromBody]Solicitacao value)
        {
            try
            {
                db.solicitacoes.Add(value);
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed);
            }
        }

        // PUT: api/Solicitacao/5
        public HttpResponseMessage Put(long id, [FromBody]Solicitacao value)
        {
            //todo: implementar alteração de solicitação
            var temp = db.solicitacoes.Find(id);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // DELETE: api/Solicitacao/5
        public HttpResponseMessage Delete(int id)
        {
            //todo: implementar exclusão de solicitação

            try
            {
                db.solicitacoes.Remove(db.solicitacoes.Where(x => x.Id == id).First());
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed);
            }
        }
    }
}

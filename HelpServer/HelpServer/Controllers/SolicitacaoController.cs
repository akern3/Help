using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HelpServer.Models;

namespace HelpServer.Controllers
{
    public class SolicitacaoController : ApiController
    {
        public ICollection<Solicitacao> solicitacoes { get; set; }

        public SolicitacaoController()
        {

            solicitacoes = new List<Solicitacao>();
            solicitacoes.Add(new Solicitacao { id = 1, solicitante = "", andar = "3", sala = "314", criticidade = "alta", data = DateTime.Now, observacao = "Problema numero 1", responsavel = "" });
            solicitacoes.Add(new Solicitacao { id = 2, solicitante = "", andar = "2", sala = "213", criticidade = "media", data = DateTime.Now, observacao = "Problema numero 2", responsavel = "" });
            solicitacoes.Add(new Solicitacao { id = 3, solicitante = "", andar = "3", sala = "350", criticidade = "baixa", data = DateTime.Now, observacao = "Problema numero 3", responsavel = "" });
            
        }
        

        // GET: api/Solicitacao
        public ICollection<Solicitacao> Get()
        {
            //todo: implementar busca da lista de solicitações
            return solicitacoes;
        }

        // GET: api/Solicitacao/5
        public Solicitacao Get(long id)
        {
            return solicitacoes.Where(x => x.id == id).First();
        }

        // POST: api/Solicitacao
        public HttpResponseMessage Post([FromBody]Solicitacao value)
        {
            //todo: implementar cadastro de solicitação no sistema
            solicitacoes.Add(value);
            return Request.CreateResponse(HttpStatusCode.Created);
        }

        // PUT: api/Solicitacao/5
        public HttpResponseMessage Put(long id, [FromBody]Solicitacao value)
        {
            //todo: implementar alteração de solicitação
            var solicitacaoASerAlterada = solicitacoes.Where(x => x.id == id).First();
            solicitacaoASerAlterada = value;
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // DELETE: api/Solicitacao/5
        public HttpResponseMessage Delete(int id)
        {
            //todo: implementar exclusão de solicitação
            solicitacoes.Remove(solicitacoes.Where(x => x.id == id).First());
            return Request.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}

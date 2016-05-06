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
            solicitacoes.Add(new Solicitacao { id = 1, solicitante = "joao paulo", andar = "3", sala = "314", criticidade = "alta", data = DateTime.Now, descricao = "Problema numero 1", responsavel = "guilherme" });
            solicitacoes.Add(new Solicitacao { id = 2, solicitante = "Mayara", andar = "2", sala = "213", criticidade = "media", data = DateTime.Now, descricao = "Problema numero 2", responsavel = "ingrid" });
            solicitacoes.Add(new Solicitacao { id = 3, solicitante = "guilherme", andar = "3", sala = "350", criticidade = "baixa", data = DateTime.Now, descricao = "Problema numero 3", responsavel = "peterson" });
        }
        

        // GET: api/Solicitacao
        public ICollection<Solicitacao> Get()
        {
            //todo: implementar busca da lista de solicitações
            
            return solicitacoes;
        }

        // GET: api/Solicitacao/5
        public IEnumerable<Solicitacao> Get(long id)
        {
            //todo: implementar busca de solicitação por id
            return solicitacoes.Where(x => x.id == id);
        }

        // POST: api/Solicitacao
        public void Post([FromBody]Solicitacao value)
        {
            //todo: implementar cadastro de solicitação no sistema
            solicitacoes.Add(value);

        }

        // PUT: api/Solicitacao/5
        public void Put(int id, [FromBody]string value)
        {
            //todo: implementar alteração de solicitação
        }

        // DELETE: api/Solicitacao/5
        public void Delete(int id)
        {
            //todo: implementar exclusão de solicitação
            solicitacoes.Remove(solicitacoes.Where(x => x.id == id).First());
        }
    }
}

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
        // GET: api/Solicitacao
        public ICollection<Solicitacao> Get()
        {
            //todo: implementar busca da lista de solicitações
            ICollection<Solicitacao> solicitacoes = new List<Solicitacao>();
            Solicitacao teste = new Solicitacao();
            solicitacoes.Add(new Solicitacao { id = 1, solicitante = "joao paulo", andar = "3", sala = "314", criticidade = "alta", data = DateTime.Now, descricao = "Problema numero 1", responsavel = "guilherme" });
            solicitacoes.Add(new Solicitacao { id = 1, solicitante = "Mayara", andar = "2", sala = "213", criticidade = "media", data = DateTime.Now, descricao = "Problema numero 2", responsavel = "ingrid" });
            solicitacoes.Add(new Solicitacao { id = 1, solicitante = "guilherme", andar = "3", sala = "350", criticidade = "baixa", data = DateTime.Now, descricao = "Problema numero 3", responsavel = "peterson" });
            return solicitacoes;
        }

        // GET: api/Solicitacao/5
        public string Get(int id)
        {
            //todo: implementar busca de solicitação por id
            return "value";
        }

        // POST: api/Solicitacao
        public void Post([FromBody]string value)
        {
            //todo: implementar cadastro de solicitação no sistema
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
        }
    }
}

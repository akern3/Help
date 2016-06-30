using HelpServer.Context;
using HelpServer.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace HelpServer.Repositorios
{
    public class SolicitacaoRepository : ISolicitacaoRepository
    {

        //private List<Solicitacao> db = new List<Solicitacao>();
        HelpContext db;

        public SolicitacaoRepository()
        { 
            this.db = new HelpContext();
        }


        public Solicitacao Add(Solicitacao solicitacao)
        {
            if (solicitacao == null)
            {
                throw new ArgumentNullException("item");
            }
            //solicitacao.Id = _nextId++;
            db.solicitacoes.Add(solicitacao);
            db.SaveChanges();
            return solicitacao;
        }

        public Solicitacao Get(long id)
        {

            Solicitacao solicitacao = db.solicitacoes.Where(x => x.Id == id).FirstOrDefault();
            solicitacao.observacao = db.observacao.Where(x => x.SolicitacaoId == solicitacao.Id);
            return solicitacao; 
        }

        public IEnumerable<Solicitacao> GetAll()
        {
            IEnumerable<Solicitacao> solicitacoes = db.solicitacoes;
            foreach (var cont  in solicitacoes)
            {
                cont.observacao = db.observacao.Where(x => x.SolicitacaoId == cont.Id);
            }
            return solicitacoes;
        }

        public void Remove(Solicitacao id)
        {
            db.solicitacoes.Remove(id);
            db.SaveChanges();
        }

        public bool Update(long id, Solicitacao item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }

            //db.Entry(item).State = EntityState.Modified;
            Solicitacao sol = db.solicitacoes.Find(id);

            sol.data = item.data;
            sol.criticidade = item.criticidade;
            sol.problemas = item.problemas;
            sol.sala = item.sala;
            sol.setor = item.setor;
            sol.status = item.status;

            db.SaveChanges();
            return true;
        }

        public bool UpdateStatus(long id, int status)
        {
            if (status < 1 || status > 3)
            {
                throw new ArgumentOutOfRangeException("status");
            }

            try
            {
                Solicitacao sol = db.solicitacoes.Find(id);
                sol.status = (Enumerations.Status)status;
                db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
            

        }

        public bool AlterarResponsavel(long id, string responsavel)
        {
            if (responsavel == null)
            {
                throw new ArgumentNullException("responsavel");
            }

            try
            {
                Solicitacao sol = db.solicitacoes.Find(id);
                sol.IdResponsavel = responsavel;
                db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

            
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HelpServer.Models;
using HelpServer.Context;
using System.Data.Entity;

namespace HelpServer.Repositorios
{
    public class ObservacaoRepository : IHelpRepository<Observacao>
    {

        private HelpContext db;
        public ObservacaoRepository()
        {
            this.db = new HelpContext();
        }


        public Observacao Add(Observacao item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }
            //solicitacao.Id = _nextId++;
            db.observacao.Add(item);
            db.SaveChanges();
            return item;
        }


        public Observacao Get(long id)
        {
            return db.observacao.Where(x => x.id == id).FirstOrDefault();
        }


        public IEnumerable<Observacao> GetAll()
        {
            return db.observacao;
        }


        public void Remove(Observacao id)
        {
            db.observacao.Remove(id);
            db.SaveChanges();
        }


        public bool Update(Observacao item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }
            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();
            return true;
        }
    }
}
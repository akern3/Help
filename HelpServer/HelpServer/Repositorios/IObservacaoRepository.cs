using HelpServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpServer.Repositorios
{
    interface IObservacaoRepository
    {
        IEnumerable<Observacao> GetAll();
        Observacao Get(long id);
        Observacao Add(Observacao item);
        void Remove(Observacao id);
        bool Update(long id, Observacao item);
    }
}

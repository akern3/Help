using HelpServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpServer.Repositorios
{
    interface ISolicitacaoRepository
    {
        IEnumerable<Solicitacao> GetAll();
        Solicitacao Get(long id);
        Solicitacao Add(Solicitacao item);
        void Remove(Solicitacao id);
        bool Update(long id,Solicitacao item);
    }
}

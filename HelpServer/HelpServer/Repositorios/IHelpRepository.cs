using HelpServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelpServer.Repositorios
{
    interface IHelpRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T Get(long id);
        T Add(T item);
        void Remove(T id);
        bool Update(T item);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HelpServer.Models
{
    public class Solicitacao
    {
        public long id { get; set; }
        public string descricao { get; set; }
        public string sala { get; set; }
        public string andar { get; set; }
        public string setor { get; set; }
        public DateTime data { get; set; }
        public string solicitante { get; set; }
        public string responsavel { get; set; }
        List<string> problemas { get; set; }
        public string criticidade { get; set; }
        public string status { get; set; }
    }

    
}
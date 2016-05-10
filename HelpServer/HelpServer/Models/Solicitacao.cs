using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace HelpServer.Models
{

    public class Solicitacao
    {

        public Solicitacao()
        {
            problemas = new List<string>();
        }
        [Key]
        public long id { get; set; }

        [StringLength(255, ErrorMessage = "O campo observação deve contar no maximo 255 caracteres!")]
        public string observacao { get; set; }

        [RegularExpression(@"\d{3]",ErrorMessage = "O campo sala deve contar apenas números")]
        public string sala { get; set; }

        public string andar { get; set; }

        public string setor { get; set; }

        public DateTime data { get; set; }

        public string solicitante { get; set; }

        public string responsavel { get; set; }

        ICollection<string> problemas { get; set; }

        public string criticidade { get; set; }

        public string status { get; set; }
    }

    
}
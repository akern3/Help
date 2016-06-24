using HelpServer.Enumerations;
using HelpServer.Repositorios;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
            observacao = new List<Observacao>();
            data = DateTime.Now;
        }

        [Key]
        public long Id { get; set; }

        public IEnumerable<Observacao> observacao { get; set; }

        [RegularExpression(@"\d{3}",ErrorMessage = "O campo 'sala' deve contar apenas números")]
        public string sala { get; set; }

        [StringLength(50, ErrorMessage = "O campo 'andar' deve contar no maximo 50 caracteres!")]
        public string andar { get; set; }

        public Setor setor { get; set; }

        private DateTime _data;
        [Index]
        public DateTime data
        {
            get { return _data; }
            set { _data = value; }
        }


        public string IdSolicitante { get; set; }

        public string IdResponsavel { get; set; }

        public IEnumerable<string> problemas { get; set; }

        public Criticidade criticidade { get; set; }

        public Status status { get; set; }
    }

    
}
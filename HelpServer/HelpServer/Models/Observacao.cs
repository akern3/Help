using HelpServer.Repositorios;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace HelpServer.Models
{
    public class Observacao 
    {

        public Observacao()
        {
            data = DateTime.Now;
        }

        [Key]
        public long id { get; set; }

        
        public Solicitacao Solicitacao { get; set; }

        [StringLength(255, ErrorMessage = "O campo observação deve contar no maximo 255 caracteres!")]
        public string Texto {get;set;}

        [ForeignKey("Solicitacao")]
        public long SolicitacaoId { get; set; }
        private DateTime _data;
        [Index]
        public DateTime data
        {
            get { return _data; }
            set { _data = value; }
        }

        public string IdUsuario { get;set;}

    }
}
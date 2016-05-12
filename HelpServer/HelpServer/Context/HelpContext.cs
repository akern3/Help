using HelpServer.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace HelpServer.Context
{
    public class HelpContext : DbContext
    {
        //Construtor HelpContext, para alterar o banco de dados no qual as informações são gravadas
        //altere a conectionString no arquivo Web.config
        public HelpContext() : base("DefaultConnection")
        {
        }


        #region DbSets para a criação de tabelas no banco de dados
        //Todos os DbSets devem ser criados dentro dessa região
        public DbSet<Solicitacao> solicitacoes { get; set; }
        //public DbSet<ApplicationUser> usuarios { get; set; }

        #endregion


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Solicitacao>().ToTable("Solicitacoes");
            //modelBuilder.Entity<ApplicationUser>().ToTable("Usuarios");
            base.OnModelCreating(modelBuilder);
        }

    }
}
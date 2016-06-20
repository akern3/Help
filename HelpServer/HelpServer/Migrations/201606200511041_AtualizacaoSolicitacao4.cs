namespace HelpServer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AtualizacaoSolicitacao4 : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Observacao", "SolicitacaoId");
            CreateIndex("dbo.Observacao", "data");
            CreateIndex("dbo.Solicitacoes", "data");
            AddForeignKey("dbo.Observacao", "SolicitacaoId", "dbo.Solicitacoes", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Observacao", "SolicitacaoId", "dbo.Solicitacoes");
            DropIndex("dbo.Solicitacoes", new[] { "data" });
            DropIndex("dbo.Observacao", new[] { "data" });
            DropIndex("dbo.Observacao", new[] { "SolicitacaoId" });
        }
    }
}

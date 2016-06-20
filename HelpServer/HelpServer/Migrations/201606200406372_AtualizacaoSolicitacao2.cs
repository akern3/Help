namespace HelpServer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AtualizacaoSolicitacao2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Observacao", "data", c => c.DateTime(nullable: false));
            AddColumn("dbo.Solicitacoes", "data", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Solicitacoes", "data");
            DropColumn("dbo.Observacao", "data");
        }
    }
}

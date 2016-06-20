namespace HelpServer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AtualizacaoSolicitacao3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Observacao", "SolicitacaoId", c => c.Long(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Observacao", "SolicitacaoId");
        }
    }
}

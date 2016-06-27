namespace HelpServer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AtualizacaoIdentity1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "nome", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "nome");
        }
    }
}

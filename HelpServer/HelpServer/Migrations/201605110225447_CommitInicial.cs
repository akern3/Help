namespace HelpServer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CommitInicial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Solicitacoes",
                c => new
                    {
                        id = c.Long(nullable: false, identity: true),
                        observacao = c.String(maxLength: 255),
                        sala = c.String(),
                        andar = c.String(),
                        setor = c.String(),
                        data = c.DateTime(nullable: false),
                        IdSolicitante = c.String(),
                        IdResponsavel = c.String(),
                        criticidade = c.String(),
                        status = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Solicitacoes");
        }
    }
}

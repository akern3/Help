namespace HelpServer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AtualizacaoSolicitacao1 : DbMigration
    {
        public override void Up()
        {
            
            CreateTable(
                "dbo.Observacao",
                c => new
                    {
                        id = c.Long(nullable: false, identity: true),
                        Texto = c.String(maxLength: 255),
                        IdUsuario = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.Solicitacoes",
                c => new
                    {
                        id = c.Long(nullable: false, identity: true),
                        sala = c.String(),
                        andar = c.String(maxLength: 50),
                        setor = c.Int(nullable: false),
                        IdSolicitante = c.String(),
                        IdResponsavel = c.String(),
                        criticidade = c.Int(nullable: false),
                        status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.id);
            

        }
        
        public override void Down()
        {

            DropTable("dbo.Solicitacoes");

            DropTable("dbo.Observacao");

        }
    }
}

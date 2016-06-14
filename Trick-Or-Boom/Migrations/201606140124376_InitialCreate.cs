namespace Trick_Or_Boom.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Levels",
                c => new
                    {
                        LevelId = c.Int(nullable: false, identity: true),
                        LevelNum = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.LevelId);
            
            CreateTable(
                "dbo.Timers",
                c => new
                    {
                        TimerId = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.TimerId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Timers");
            DropTable("dbo.Levels");
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Trick_Or_Boom.Models;

namespace Trick_Or_Boom.DAL
{
    public class TrickOrBoomContext : DbContext
    {
        public DbSet<Timer> GameTimer { get; set; }
        public DbSet<Level> GameLevel { get; set; }
    }
}
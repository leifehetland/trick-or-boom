using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Trick_Or_Boom.Models
{
    public class GameState
    {
        public int Id { get; set; }
        public int LevelNum { get; set; }
        public int Time { get; set; }

        public virtual ApplicationUser CreatedBy { get; set; }
    }
}
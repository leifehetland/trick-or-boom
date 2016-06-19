using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Trick_Or_Boom.Models;

namespace Trick_Or_Boom.DAL
{
    public class TrickOrBoomRepository
    {
        private TrickOrBoomContext context { get; set; }
        private IDbSet<ApplicationUser> Users { get { return context.Users; } }

        public TrickOrBoomRepository()
        {
            context = new TrickOrBoomContext();
        } 

        public TrickOrBoomRepository(TrickOrBoomContext _context)
        {
            context = _context;
        }

        public int GetLevel(string user_id)
        {
            var gameState = context.GameState.SingleOrDefault(g => g.CreatedBy.Id == user_id);
            if (gameState == null)
            {
                return 0;
            }
            return gameState.LevelNum;
            
        }
    }
}
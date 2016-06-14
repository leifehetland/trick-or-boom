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
        public TrickOrBoomContext context { get; set; }
        public IDbSet<ApplicationUser> Users { get { return context.Users; } }

        public TrickOrBoomRepository()
        {
            context = new TrickOrBoomContext();
        } 

        public TrickOrBoomRepository(TrickOrBoomContext _context)
        {
            context = _context;
        }

        public ApplicationUser GetUser(string user_id)
        {
            return context.Users.FirstOrDefault(i => i.Id == user_id);
        }
    }
}
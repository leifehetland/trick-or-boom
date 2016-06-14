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

        public TrickOrBoomRepository(TrickOrBoomContext _context)
        {
            context = _context;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Trick_Or_Boom.DAL;

namespace Trick_Or_Boom.Controllers
{
    public class GameStateController : ApiController
    {
        private TrickOrBoomContext db = new TrickOrBoomContext();
        private TrickOrBoomRepository repo = new TrickOrBoomRepository();
    }
}

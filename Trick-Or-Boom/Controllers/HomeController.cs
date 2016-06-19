using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;
using System.Web.Mvc;
using Trick_Or_Boom.DAL;

namespace Trick_Or_Boom.Controllers
{
    public class HomeController : Controller
    {
        private TrickOrBoomRepository repo = new TrickOrBoomRepository();

        public ActionResult Index()
        {
            var id = User.Identity.GetUserId();
            var level = repo.GetLevel(id);

            ViewBag.Level = level;

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
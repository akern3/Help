using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http.Cors;

namespace HelpServer.Controllers
{
    public class HomeController : Controller
    {
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}

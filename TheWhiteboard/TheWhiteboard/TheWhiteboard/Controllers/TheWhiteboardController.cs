using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TheWhiteboard.Controllers
{
    public class TheWhiteboardController : Controller
    {
        // GET: TheWhiteboard
        [RequireHttps]
        public ActionResult TheWhiteboard()
        {
            return View();
        }
    }
}
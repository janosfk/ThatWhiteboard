using System;
using System.Collections.Generic;
using System.Linq;
using System.Management.Instrumentation;
using System.Net.Mime;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using TheWhiteboard.Models;

namespace TheWhiteboard.Controllers
{
    public class TheWhiteboardController : Controller
    {
        // GET: TheWhiteboard
        //[RequireHttps]
        //[Authorize]
        public ActionResult TheWhiteboard()
        {
            //**
            //var currentUser = new UserVM
            //{
            //    UserName = User.Identity.Name,
            //    Manager = (User.Identity.Name.ToLower() == "elod") ? 1 : 0
            //};
            //return View(currentUser);
            return View();
        }
    }
}
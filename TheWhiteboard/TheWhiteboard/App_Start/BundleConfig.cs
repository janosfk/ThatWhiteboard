using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;


namespace TheWhiteboard
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/signalr").Include(
            "~/Scripts/jquery.signalr-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap.css",
                "~/Content/TheWhiteboard.css",
                "~/Content/site.css",
                "~/Content/toaster.css"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                //3rd party
                "~/Scripts/kinetic-v5.1.0.min.js",
                //"~/Scripts/jquery.signalr-{version}.js",
                //"~/signalr/hubs",

                //painting logic script
                "~/app/TheWhiteboard/theWhiteboardMain.js",

                //angular stuff
                "~/Scripts/angular.js",
                "~/Scripts/angular-route.js",
                "~/Scripts/angular-animate.js",
                "~/Scripts/toaster.js",

                "~/app/app.js",
                "~/app/TheWhiteboard/theWhiteboard.js",
                "~/app/TheWhiteboard/theWhiteboard-controller.js",
                "~/app/TheWhiteboard/theWhiteboard-data-repo.js",

                "~/Scripts/angular-local-storage.js",

                "~/app/Authentication/auth.js",
                "~/app/Authentication/auth-service.js",
                "~/app/Authentication/auth-controller.js",
                "~/app/Authentication/interceptor-service.js",

                "~/app/layout-controller.js"));
        }
    }
}
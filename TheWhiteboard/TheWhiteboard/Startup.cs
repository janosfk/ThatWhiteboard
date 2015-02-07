using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using System.Web;
using System.Web.Http;

[assembly: OwinStartup(typeof(TheWhiteboard.Startup))]

namespace TheWhiteboard
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            var config = new HttpConfiguration();
            WebApiConfig.Register(config);
            app.UseWebApi(config);

            app.MapSignalR();
        }
    }
}

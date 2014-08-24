using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;

namespace TheWhiteboard
{
	public partial class Startup
	{
	    public void ConfigureAuth(IAppBuilder app)
	    {
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login")
            });
            
            // Use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");

            //app.UseTwitterAuthentication(
            //   consumerKey: "",
            //   consumerSecret: "");

            app.UseFacebookAuthentication(
               appId: "333191586842763",
               appSecret: "373234094c01aa55660667df6bef3d08");

            app.UseGoogleAuthentication( 
                clientId:"38635698427-7eeb25vrsclkvumgcq6bnaqi3sd2d0nn.apps.googleusercontent.com",
                clientSecret: "FjNY-Hv6nnUHKDzdJ9-sv511");
	    }
	}
}
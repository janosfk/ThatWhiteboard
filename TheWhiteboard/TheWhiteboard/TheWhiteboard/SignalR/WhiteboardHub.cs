using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace TheWhiteboard.SignalR
{
    [HubName("whiteBoard")]
    public class WhiteboardHub : Hub
    {
        public void Echo(string message)
        {
            Clients.All.echo(message + " : " + DateTime.Now);
        }

        public void SendDraw(string drawObject)
        {
            Clients.AllExcept(new string[] { this.Context.ConnectionId }).HandleDraw(drawObject);
        }
    }
}
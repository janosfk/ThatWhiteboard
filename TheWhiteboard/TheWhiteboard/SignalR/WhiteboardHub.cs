using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace TheWhiteboard.SignalR
{
    [HubName("whiteBoard")]
    public class WhiteboardHub : Hub
    {

        private readonly static ConcurrentDictionary<string, int> _users;

        static WhiteboardHub()
        {
            _users = new ConcurrentDictionary<string, int>();
        }

        public override Task OnConnected()
        {
            string name = this.Context.User.Identity.Name;
            _users.AddOrUpdate(name, 0, (k, v) => v);
            Clients.All.SendUserList(_users.Keys);
            return base.OnConnected();
            
        }


        public override Task OnDisconnected(bool stopCalled)
        {
            int result;
            _users.TryRemove(this.Context.User.Identity.Name, out result);
            Clients.AllExcept(new string[] { this.Context.ConnectionId }).SendUserList(_users.Keys);
            return base.OnDisconnected(stopCalled);
        }

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
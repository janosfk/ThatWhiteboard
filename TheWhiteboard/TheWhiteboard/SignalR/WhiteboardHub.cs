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

        private readonly static ConcurrentDictionary<string, string> _users;

        private static int _u = 0; 

        static WhiteboardHub()
        {
            _users = new ConcurrentDictionary<string, string>();
        }

        public override Task OnConnected()
        {
            Clients.All.SendUserList(_users.Values);
            return base.OnConnected();

        }


        public override Task OnDisconnected(bool stopCalled)
        {
            string result;
            _users.TryRemove(this.Context.ConnectionId, out result);
            Clients.AllExcept(this.Context.ConnectionId).SendUserList(_users.Values);
            return base.OnDisconnected(stopCalled);
        }


        public void AddUser(string user)
        {
            _users.AddOrUpdate(this.Context.ConnectionId, user, (k, v) => v);
            Clients.All.SendUserList(_users.Values);

        }

        public void RemoveUser(string user)
        {
            string result;
            _users.TryRemove(this.Context.ConnectionId, out result);
            Clients.All.SendUserList(_users.Values);
        }


        public void Echo(string message)
        {
            Clients.All.echo(message + " : " + DateTime.Now);
        }

        public void SendDraw(string drawObject)
        {
            Clients.AllExcept(this.Context.ConnectionId).HandleDraw(drawObject);
        }
    }
}
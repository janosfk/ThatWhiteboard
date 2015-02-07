using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Newtonsoft.Json;
using TheWhiteboard.Repository;

namespace TheWhiteboard.Controllers
{
    public class RegisterController : ApiController
    {
        private UserRepository _repo = new UserRepository();

        public RegisterController()
        {   
        }

        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> Post(User data)
        {
            //var t = JsonConvert.DeserializeObject(data);

            if (data != null)
            {
                _repo.Register(data);
            }
            else
            {
                return BadRequest("No data");
            }
            return Ok();
        }
    }
}

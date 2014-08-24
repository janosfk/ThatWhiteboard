using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace TheWhiteboard.Models
{
    public class UserVM 
    {
        public string UserName { get; set; }
        public int Manager { get; set; }

        public string ViewModelJSON()
        {
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            string vm = JsonConvert.SerializeObject(this, settings);
            return vm;
        }
    }
}
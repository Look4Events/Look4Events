using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Look4Events.Models
{
    public class Attractions
    {
        public string id { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public Array images { get; set; }
        public string url { get; set; }
        public Array classifications { get; set; }
        public string locale { get; set; }
    }
}

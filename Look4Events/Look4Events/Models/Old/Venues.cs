using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Look4Events.Models
{
    public class Venues
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Locale { get; set; }
        public string Url { get; set; }
        public Location Location { get; set; } 
        public int Extensions { get; set; }
        public int Source { get; set; }
        public List<Market> Markets { get; set; }    
        public string Timezone { get; set; }
        public Address Address { get; set; } 
        public City City { get; set; } 
        public Country Country { get; set; } 
        public State State { get; set; } 
        public string PostalCode { get; set; }
        public List<Dma> Dmas { get; set; } 



    }
}

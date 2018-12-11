using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Look4Events.Models.Events
{
    public class Venue
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string PostalCode { get; set; }
        public City City { get; set; }
        public Location Location { get; set; }
    }
}

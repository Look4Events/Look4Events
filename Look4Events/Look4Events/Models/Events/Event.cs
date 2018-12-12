using Look4Events.Models.Events.Dates;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

    namespace Look4Events.Models.Events
    {
        public class Event
        {
            public string Name { get; set; }
            public string Type { get; set; }
            public string Id { get; set; }
            public string Url { get; set; }
            
            public List<Venue> Venues { get; set; }
            //public List<Images> Images { get; set; }
            //public Models.Events.Dates.Dates Dates { get; set; }
            //public int MyProperty { get; set; }
            //public Classifications Classifications { get; set; }
            
    }
    }


using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Look4Events.Models
{
    public class Dates
    {
        public Start Start { get; set; }
        public End End { get; set; }
        public Access Access { get; set; }
        public string Timezone { get; set; }
        public Status Status { get; set; }
        public Boolean SpanMultipleDays { get; set; }

    }
}

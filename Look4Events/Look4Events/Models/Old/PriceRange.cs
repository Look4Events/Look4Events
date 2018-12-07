using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Look4Events.Models
{
    public class PriceRange
    {
        public string Type { get; set; }
        public string Currency { get; set; }
        public double Min { get; set; }
        public double Max { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Look4Events.Models
{
    public class RangeDurationField
    {
        public Int64 UnitMillis { get; set; }
        public Boolean Precise { get; set; }
        public string Name { get; set; }
        public Type Type { get; set; }
        public Boolean Supported { get; set; }

    }
}

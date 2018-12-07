using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Look4Events.Models
{
    public class Type
    {
        public string Name { get; set; }
        public DurationType DurationType { get; set; }
        public RangeDurationType RangeDurationType { get; set; }
    }
}

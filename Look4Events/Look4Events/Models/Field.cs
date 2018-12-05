using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Look4Events.Models
{
    public class Field
    {
        public Boolean Lenient { get; set; }
        public Int32 MinimumValue { get; set; }
        public LeapDurationField LeapDurationField { get; set; }
        public Int32 MaximumValue { get; set; }
        public DurationField DurationField { get; set; }
        public RangeDurationField RangeDurationField { get; set; }
        public string Name { get; set; }
        public Type Type { get; set; }
        public Boolean Supported { get; set; }
    }
}

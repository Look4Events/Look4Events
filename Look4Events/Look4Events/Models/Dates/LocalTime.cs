using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Look4Events.Models.Events.Dates
{
    public class LocalTime
    {
        public Int32 MillisOfSecond { get; set; }
        public Int32 MillisOfDay { get; set; }
        public Int32 SecondOfMinute { get; set; }
        public Int32 MinuteOfHour { get; set; }
        public Int32 HourOfDay { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Look4Events.Models
{
    public class LocalTime
    {
        public Chronology Chronology { get; set; }
        public Int32 MillisOfSecond { get; set; }
        public Int32 MillisOfDay { get; set; }
        public Int32 SecondOfMinute { get; set; }
        public Int32 MinuteOfHour { get; set; }
        public Int32 HourOfDay { get; set; }
        public List<Value> Values { get; set; }
        public List<FieldType> FieldTypes { get; set; }
        public List<Field> Fields { get; set; }
        public string DateTime { get; set; }
        public Boolean DateTBD { get; set; }
        public Boolean DateTBA { get; set; }
        public Boolean TimeTBA { get; set; }
        public Boolean NoSpecificTime { get; set; }


    }
}

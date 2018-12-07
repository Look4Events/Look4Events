using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Look4Events.Models
{
    public class Start
    {
        public string LocalDate { get; set; }
        public LocalTime LocalTime { get; set; }
        public string DateTime { get; set; }
        public Boolean DateTBD { get; set; }
        public Boolean DateTBA { get; set; }
        public Boolean TimeTBA { get; set; }
        public Boolean NoSpecificTime { get; set; }


    }
}

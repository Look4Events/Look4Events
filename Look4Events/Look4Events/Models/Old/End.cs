using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Look4Events.Models
{
    public class End
    {
        public string LocalDate { get; set; }
        public LocalTime LocalTime { get; set; }
        public string DateTime { get; set; }
        public Boolean Approximate { get; set; }
        public Boolean NoSpecificTime { get; set; }

    }
}

using Look4Events.Models.Events.Dates;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Look4Events.Models.Events
{
    public class Start
    {
        public string Id { get; set; }
        public string LocalDate { get; set; }
        public Models.Events.Dates.LocalTime LocalTime { get; set; }
    }
}

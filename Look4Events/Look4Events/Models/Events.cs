using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Look4Events.Models
{
    public class Events
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public Location Location { get; set; }
        public string Url { get; set; }
        public Sales Sales { get; set; }
        public Dates Dates { get; set; }
        public List<PriceRange> PriceRanges { get; set; }
        public List<Attractions> Attractions { get; set; }
        public string pleaseNote { get; set; }
        public int extensions { get; set; }
        public int source { get; set; }
        public object promoter { get; set; }
        public Array promoters { get; set; }
        public Array images { get; set; }
        public Array venues { get; set; }
        public string info { get; set; }
        public Array classifications { get; set; }
        public int field { get; set; }










    }
}

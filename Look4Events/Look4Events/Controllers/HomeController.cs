using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Look4Events.Models;
using Look4Events.Models.Events;
using Newtonsoft.Json.Linq;
using System.Net.Http;

namespace Look4Events.Controllers
{
    public class HomeController : Controller
    {
        //prueba para usar el otro link
        public async Task<IActionResult> Prueba()
        {
            bool next = true;

            HttpClient client = new HttpClient();
            int i = 1;
            List<Event> eventos = new List<Event>();
            while (next)
            {
                HttpResponseMessage response = await client.GetAsync("https://app.ticketmaster.com/discovery/v2/events.json?apikey=h3I9tWkebYWN4j7RUCINFghyZEoQMjMi");
                if (response.IsSuccessStatusCode)
                {
                    string output = await response.Content.ReadAsStringAsync();
                    JObject sacaJson = JObject.Parse(output);

                    IList<JToken> results = sacaJson["_embedded"]["events"].Children().ToList();
                    IList<JToken> venues;

                    foreach (JToken result in results)
                    {
                        List<Venue> eventVenues = new List<Venue>();
                        venues = result["_embedded"]["venues"].Children().ToList();
                        foreach (JToken venue in venues)
                        {
                            Venue eventVenue = venue.ToObject<Venue>();

                            JToken locationJson = venue["location"];
                            Location location = locationJson.ToObject<Location>();


                            eventVenues.Add(eventVenue);
                        }

                        // JToken.ToObject is a helper method that uses JsonSerializer internally
                        Event searchResult = result.ToObject<Event>();
                        searchResult.Venues = eventVenues;
                        eventos.Add(searchResult);
                    }

                }
                next = false;
                //foreach (var item in items.Results)
                //{

                //    Event p = new Event
                //    {
                //        Name = item.Name,
                //        Type = item.Type,
                //        Id = item.Id,
                //        Url = item.Url

                //    };


                //    eventos.Add(p);
                //}
                //i++;
            }
            return View(eventos);

        } 
        //#################################################
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

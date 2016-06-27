using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace HelpServer
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "SolicitacoesCatchAllRoute",
                url: "solicitacoes/{*.}",
                defaults: new
                {
                    controller = "Home",
                    action = "Index",
                    id = UrlParameter.Optional
                }
            );

            routes.MapRoute(
                name: "ContasCatchAllRoute",
                url: "contas/{*.}",
                defaults: new
                {
                    controller = "Home",
                    action = "Index",
                    id = UrlParameter.Optional
                }
           );

            routes.MapRoute(
                 name: "PendentesCatchAllRoute",
                 url: "pendentes/{*.}",
                 defaults: new
                 {
                     controller = "Home",
                     action = "Index",
                     id = UrlParameter.Optional
                 }
            );

            routes.MapRoute(
                 name: "ReportCatchAllRoute",
                 url: "report/{*.}",
                 defaults: new
                 {
                     controller = "Home",
                     action = "Index",
                     id = UrlParameter.Optional
                 }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}

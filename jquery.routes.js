var Routes = {
    hash: false,
    routes: false,
    parameters: [],
    reload: function() {
        var self = this;
        self.hash = location.hash.replace("#!/", "");

        self.hash = self.hash.split("?");
        self.hash = self.hash[0];
        
        self.parameters = [];
        self.match_route(self.routes);
    },
    match_route: function(routes) {
        var self = this;

        var found = false;
        $.each(routes, function(uri, route) {
            //if (uri.slice(-1) !== "/") { uri=uri+"/"; }
            var regex = new RegExp("^" + self.to_regex(uri, route) + "$", 'gi');

            if (self.hash.match(regex)) {
                //console.log("FOUND : ", uri, "  | ", self.to_regex(uri, route), " | Match : ", self.hash.match(regex), " Hash : ", self.hash);
                self.parse(route);
                self.get_parameters(uri, route);
                //console.log("Found : ", uri, route);
                found = true;
                return true;
            }
        });

        return true;
    },
    init: function(routes) {
        var self = this;
        self.routes = routes;
        Routes.reload();
    },
    to_regex: function(uri, route) {
        var output = uri;
        if (typeof route.parameters !== "undefined") {
            $.each(route.parameters, function(key, value) {
                output = output.replace(":" + key, '(' + value + ')');
            })
        }
        return output;
    },
    parse: function(route) {
        var self = this;

        route.target = (route.target) ? route.target : "article";

        var jqxhr = $.get(route.template, function(html) {
            $(route.target).html(html);

            if (typeof route.meta !== "undefined") {
                self.load_meta_information(route.meta);
            }

            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            reload_ui();
            $("article > section#content-first").css("visibility", "visible");

            if (self.hash==="") {
                $("body").addClass("home");
            } else {
                $("body").removeClass("home"); 
            }
        });

        jqxhr.error(function() {
            $.get("site/errors/404.html", function(html) {
                $("article > section").html(html)
                    .append($('<div style="clear: both;">'));
            });
        });

    },
    get_parameters: function(uri, route) {
        var self = this;
        if (typeof route.parameters !== "undefined") {
            $.each(route.parameters, function(key, regex) {
                self.parameters[key] = self.hash.match("^" + self.to_regex(uri, route) + "$")[1];
            });
        }
    },
    load_meta_information: function(meta) {

        if (typeof meta.title !== "undefined") {
            $("title").html(meta.title);
            $("meta[name=title]").attr("content", meta.title);
        }

        if (typeof meta.keywords !== "undefined") {
            $("meta[name=keywords]").attr("content", meta.keywords);
        }

        if (typeof meta.description !== "undefined") {
            $("meta[name=description]").attr("content", meta.description);
        }
    }
}

$(document).ready(function(){
    if (typeof Routes.reload === 'function') {
        $(window).bind('hashchange', function() {
            Routes.reload();
        }).load(function() {
            //Routes.reload();
        });
    }
});

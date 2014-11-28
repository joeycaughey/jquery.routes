
var Routes = {
	hash: false,
	routes: false,
	parameters: [],
	reload: function() {
		var self = this;
		self.init(self.routes);
	},
	init: function(routes) {
		var self = this;
		var match = false;

		self.routes = routes;
		self.hash = location.hash.replace("#!/", "");

		$.each(routes, function(uri, route) {
			if (uri.slice(-1) !== "/") { uri=uri+"/"; }
			var regex = new RegExp("^"+self.to_regex(uri, route)+"$", 'gi');
			//console.log("^"+self.to_regex(uri, route)+"$");
			//console.log("route : ", self.hash, uri, route, self.to_regex(uri, route));
			if (self.hash.match(regex)) {		
				//console.log("hash : ", self.hash, regex.test(self.hash));
				//console.log("GOT : ", uri, route, self.to_regex(uri, route));
				
				self.parse(route);
				self.get_parameters(uri, route);
				match = true;
			}
		});

		if (self.hash == "" || self.hash == "/" || self.hash  == "home/") {
			self.parse({
				template: "site/home.html"
			})
		} else if (!match) {
			self.parse({
				template: self.hash
			})
		}
	},
	to_regex: function(uri, route) {
		var output = uri;
		if (typeof route.parameters !== "undefined") {
			$.each(route.parameters, function(key, value) {
				output = output.replace(":"+key, '('+value+')');
			})
		}
		return output;
	},
	parse: function(route) {
		Loading.show();
		var jqxhr = $.get(route.template, function(html) {
			$("article > section").html(html);
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
				console.log(self.hash, " | ", uri, " | ", self.hash.match("^"+self.to_regex(uri, route)+"$")[1]);
				self.parameters[key] = self.hash.match("^"+self.to_regex(uri, route)+"$")[1];
			});
		}
	}
}

if (typeof Routes.reload == 'function') { 
	$(window).bind('hashchange', function() {   
		Routes.reload();
	}).load(function() {
		Routes.reload();
	});
}

$(document).ready(function(){
	if (document.location!=Routes.hash) {
		//Routes.reload();
	};
});

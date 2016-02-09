
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
			if (self.hash.match(regex)) {		
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
		var self = this;

	
		if (typeof ProloaderShow === "function") {
                        ProloaderShow();
                } else if (typeof Loading.show === "function") {
                	Loading.show();
                }
                
		
		var jqxhr = $.get(route.template, function(html) {
			$("article > section").html(html);

			if (typeof route.meta !== "undefined") {
				self.load_meta_information(route.meta);
			}
			
			if (typeof ProloaderHide === "function") {
	                        ProloaderHide();
	                } else if (typeof Loading.hide === "function") {
	                	Loading.hide();
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
				self.parameters[key] = self.hash.match("^"+self.to_regex(uri, route)+"$")[1];
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

if (typeof Routes.reload == 'function') { 
	$(window).bind('hashchange', function() {   
		Routes.reload();
	}).load(function() {
		Routes.reload();
	});
}

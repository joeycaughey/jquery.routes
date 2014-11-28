jquery.routes
=============

jQuery Routing / HashBang #! 


----------------------------------------------------
USAGE AND INITIALIZATION
----------------------------------------------------
Include the jquery.routes.js and add instances of all your pages and parameters with corresponding regular expressions for accepted data type.   Then using hashbang (/#!/news/) to reference pages will replace (article > section) with the page template content.

```
$.getScript("/_assets/jquery.routes/jquery.routes.js", function() {
  	Routes.init({
  		"": {
  			template: "site/home.html"
  		},
  		"news/": {
  			template: "site/news/index.html"
  		},
  		"news/archives/:date/": {
  			template: "site/news/index.html",
  			parameters: {
  				date: "[0-9]{4}-[0-9]{1,2}"
  			}
  		},
  		"news/article/:slug/": {
  			template: "site/news/article.html",
  			parameters: {
  				slug: "[a-zA-Z0-9-]+"
  			}
  		},
  	});
});
```

----------------------------------------------------
Return Variables
----------------------------------------------------
All parameters are returned to the page as in the object (Routes.parameters)

```
parameters: {
    date: "[0-9]{4}-[0-9]{1,2}"
}

Returns as:
Routes.parameters.date
```

----------------------------------------------------
HTML
----------------------------------------------------
```
<article>
    <section>
    </section>
</article>
```
----------------------------------------------------
Errors
----------------------------------------------------
A non existant template page or redirection automatically loads a 404 template
site/errors/404.html





jquery.routes
=============

jQuery Routing / HashBang #! 


----------------------------------------------------
USAGE AND INITIALIZATION
----------------------------------------------------
Include the jquery.routes.js and add instances of all your pages and parameters with corresponding regular expressions for accepted data type.   Then using hashbang (/#!/news/) to reference pages will replace (article > section) with the page template content.


There are five components to a route:

"uri_path": {
  "template": "file_location",
  "target": "selector",
  "meta": {
      "title": "The meta and page title for the page",
      "description": "The meta description tag for the page",
      "keywords": "The meta kewords for the page"
  },
  "parameters:" {
    "name": "regex"
  }
}

1) "uri_path" - The uri page is the web url path with any dynamic variables that are defined by adding a colon(:) before the variable name.  

For example:  "articles/:date/" 
Where date is the parameter variable name that will be defined in parameters. Parameters are optional.

2) "template": The template "file_location" is the exact file location or the html content page.

3) "target" (optional) - The target is the id or selector of the part of the page that the content replacement should happen.

4) "meta" (optional) - The dynamic page title and meta tags can be replaced by adding meta values to your route.  These are optional.

5) "parameters" - Parameters define the format of accepted content to the parameter variable in the uri_path.  These parater formats are defined using regular expressions (regex).



----------------------------------------------------
EXAMPLES
----------------------------------------------------

```
$.getScript("/_assets/jquery.routes/jquery.routes.js", function() {

  		"news/": {
  			template: "news/index.html",
        meta: {
          title: "News title meta tag",
          description: "This is the description meta tag",
          keywords: "This is the keywords meta tag"
        }
  		},
  		"news/archives/:date/": {
  			template: "news/index.html",
  			parameters: {
  				date: "[0-9]{4}-[0-9]{1,2}"
  			}
  		},
  		"news/article/:slug/": {
  			template: "news/article.html",
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

Returns to the page available as a Javascript variable defined as:
Routes.parameters.date
```

----------------------------------------------------
HTML
----------------------------------------------------
```
<article>
    <section id="content-first>
    </section>
</article>
```
----------------------------------------------------
Errors
----------------------------------------------------
A non existant template page or redirection automatically loads a 404 template
(errors/404.html)





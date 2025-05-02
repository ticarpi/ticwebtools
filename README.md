# TicWebTools
A collection of web tools crafted for web app pentesting

---

## Files

* `responser.php` - a PHP tool for serving content based on URI parameter input
* `cspreflect.php` - a PHP tool for serving arbitrary CSP policies for use on online services like https://csper.io/evaluator
* `xss.js` - a basic XSS POC payload
* `libChex.js` - a toolkit for identifying outdated JavaScript libraries on a webpage
* `JSattack.js` - a tool to dump JavaScript-accessible data from a webpage, including: HTML5 storage, cookies, JS variables, objects, functions, and the full contents of the DOM
* `snyk_enum_cve.sh` - a script to pull CVE numbers and vuln refs from a Snyk package page (e.g. `./snyk_enum_cve.sh https://security.snyk.io/package/npm/jquery-ui/1.12.1`)

---

## How to use
This is a collection of tools and resources to be used on web application pentesting engagements.  
The files are to be hosted on a PHP web service.  
For some targets these resource files may need to be loaded over HTTPS to avoid browser errors and mischief.  

Simply git clone this repo and serve the files on a PHP server somewhere you can access them.  
`git clone https://github.com/ticarpi/ticwebtools`

You can host these files on a PHP service on a burner VPS if you like.  
> **DO NOT host these files on production systems!**  
> I offer no warranty, support, or pity(!) if you do so and suffer any negative impact from this.  
> ***You have been warned!***  

### Host with Docker
A simpler and safer way to use these is to host them locally, and then publish them temporarily online using `ngrok`.  
You can do this entirely in Docker containers and then burn them as soon as you're done.  

**PHP server on localhost:9090:**  
```
cd ticwebtools/
docker run -it --rm -p 9090:80 --name phphere -v "${PWD}:/var/www/html" php:7.4-apache
```

**ngrok service on HTTPS:**  
`docker run -it --rm --name ngrok --net="host" -e NGROK_AUTHTOKEN=ADD_TOKEN_HERE ngrok/ngrok:alpine http localhost:9090`
> Note: you will need a free ngrok Auth Token for this

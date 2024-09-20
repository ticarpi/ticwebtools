<?php
########################################################
# A PHP tool to serve CSP headers,                     #
# to use for testing arbitrary policies on             #
# online evaluators like: https://csper.io/evaluator   #
# Written by Andy Tyler (@ticarpi)                     #
# Software URL: https://github.com/ticarpi/ticwebtools #
########################################################

$filename = 'csp.txt';

if (file_exists($filename)) {
    $cspdata = file_get_contents($filename);
} else {
    $cspdata = "example policy not provided";
}

header('Content-Security-Policy: ' . $cspdata);


if ( isset($_POST['csp']) ) {
    $csp = $_POST['csp'];
    file_put_contents($filename, $csp);
}
?>
<html>
<body>
<form actions="cspreflect.php" method="post">
CSP: <input type="text" name="csp" size=70 /><br /><br />
<input type="submit" value="Submit" />
</form>

</body>
</html>


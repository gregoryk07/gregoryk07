<?php
/* Database credentials. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
define('DB_SERVER', 'sql113.infinityfree.com');
define('DB_USERNAME', 'if0_34384733');
define('DB_PASSWORD', 'GwuWCotbCMI7');
define('DB_NAME', 'if0_34384733_gregorykahub');
 
/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>
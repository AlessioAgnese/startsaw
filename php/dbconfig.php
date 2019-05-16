<?php
$DB_host     = 'localhost';
$DB_user     = 'root';
$DB_password = '';
$DB_name     = 'blog';
$link = mysqli_connect($DB_host, $DB_user, $DB_password, $DB_name);
if (!$link) {
	die ('Non riesco a connettermi: ' . mysqli_error());
}

?>
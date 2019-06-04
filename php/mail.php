<?php
include_once('dbconfig.php');
$data = file_get_contents('php://input');
$json = json_decode($data, true);
?>
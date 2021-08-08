<?php
    require_once('../dbconfig.php');

    $id = $_POST['eventID'];

    deleteEvent($id);
?>
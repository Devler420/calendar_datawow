<?php
    require_once('../dbconfig.php');

    $id = $_POST['eventID'];

    $data = getEventDetail($id);
    $data_json = json_encode($data);
    print_r($data_json);
?>
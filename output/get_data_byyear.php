<?php
    require_once('../dbconfig.php');

    if(isset($_POST['selectedDate'])) {
        $selectedDate = $_POST['selectedDate'];
        $day = $selectedDate[0];
        $month = $selectedDate[1];
        $year = $selectedDate[2];
    }
    $month = date("m", strtotime($month));

    $data = pulldataByYear($year);
    $data_json = json_encode($data);
    print_r($data);

?>
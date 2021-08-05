<?php
    require_once('../dbconfig.php');

    if(isset($_POST['selectedDate'])) {
        $selectedDate = $_POST['selectedDate'];
        $day = $selectedDate[0];
        $month = $selectedDate[1];
        $year = $selectedDate[2];
    }
    $month = date("m", strtotime($month));
    $fulldate = $day."-".$month."-".$year;
    $newDate = new DateTime($fulldate);
    $week = $newDate->format("W");
    $dayofweek = $newDate->format("l");
    if($dayofweek == "Sunday") {
        $week += 1;
    }

    $data = pulldataByWeek($week);
    $data_json = json_encode($data);
    print_r($data_json);

?>
<?php
    require_once('../dbconfig.php');

    $eventTitle = $_POST['eventTitle'];
    $eventDescription = $_POST['eventDesc'];
    $eventDateStart = $_POST['eventDateStart'];
    $eventTimeStart = $_POST['eventTimeStart'];
    $eventDateEnd = $_POST['eventDateEnd'];
    $eventTimeEnd = $_POST['eventTimeEnd'];
    $eventColor = $_POST['color'];
    

    $d = strtotime($eventDateStart);
    $e = strtotime($eventDateEnd);
    $DateSQLformat_start = date("Y-m-d", $d);
    $DateSQLformat_end = date("Y-m-d", $e);

    echo $eventTitle;
    echo $eventDescription;
    echo $eventDateStart;
    echo $eventTimeStart;
    echo $eventDateEnd;
    echo $eventTimeEnd;
    echo $eventColor;

    insertNewEvent($eventTitle, $eventDescription, $DateSQLformat_start, $DateSQLformat_end, $eventTimeStart, $eventTimeEnd, $eventColor);
?>
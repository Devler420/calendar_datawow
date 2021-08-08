<?php
    require_once('../dbconfig.php');

    $eventID = $_POST['eventID'];
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

    updateEvent($eventID, $eventTitle, $eventDescription, $DateSQLformat_start, $DateSQLformat_end, $eventTimeStart, $eventTimeEnd, $eventColor);
?>
<?php
    function createmysqlConnection() {
        // $servername = "localhost";
        // $username = "root";
        // $password = "";
        // $dbname = "calendar_datawow";

        $servername = "acp-db.crpkyjnpfhba.ap-southeast-1.rds.amazonaws.com";
        $username = "devler420";
        $password = "Bookboom";
        $dbname = "ACPDatabase";
        $port = "3306";
    
        // $conn = mysqli_connect($servername, $username, $password, $dbname);
        $conn = mysqli_connect($servername, $username, $password, $dbname, $port);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        return $conn;
    }

    function pulldataByDay($day, $month, $year) {
        $conn = createmysqlConnection();
        $sql = "SELECT * FROM `events` WHERE DAY(date_start) = ? AND MONTH(date_start) = ? AND YEAR(date_start) = ? ORDER BY time_start ASC"; //SELECT * FROM `events` WHERE DAY(date_start) = 28 AND MONTH(date_start) = 07 AND YEAR(date_start) = 2021 ORDER BY time_start ASC
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $day, $month, $year);
        $stmt->execute();
        $stmt->bind_result($id, $title, $description, $date_start, $date_end, $time_start, $time_end, $color, $timestamp);
        $dataByDay = array();

        while($stmt->fetch()) {
            $dataByDay_row = array(
                "id" => $id,
                "title" => $title,
                "description" => $description,
                "date_start" => $date_start,
                "date_end" => $date_end,
                "time_start" => $time_start,
                "time_end" => $time_end,
                "color" => $color,
                "timestamp" => $timestamp
            );
            array_push($dataByDay, $dataByDay_row);
        }
        $stmt->close();
        $conn->close();
        return $dataByDay;
    }

    function pulldataByWeek($week) {
        $conn = createmysqlConnection();
        $sql = "SELECT * FROM `events` WHERE WEEK(date_start) = ? ORDER BY date_start, time_start ASC"; //SELECT * FROM `events` WHERE WEEK(date_start) = 30 ORDER BY date_start, time_start ASC
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $week);
        $stmt->execute();
        $stmt->bind_result($id, $title, $description, $date_start, $date_end, $time_start, $time_end, $color, $timestamp);
        $dataByDay = array();

        while($stmt->fetch()) {
            $dataByDay_row = array(
                "id" => $id,
                "title" => $title,
                "description" => $description,
                "date_start" => $date_start,
                "date_end" => $date_end,
                "time_start" => $time_start,
                "time_end" => $time_end,
                "color" => $color,
                "timestamp" => $timestamp
            );
            array_push($dataByDay, $dataByDay_row);
        }
        $stmt->close();
        $conn->close();
        return $dataByDay;
    }

    function pulldataByMonth($month, $year) {
        $conn = createmysqlConnection();
        $sql = "SELECT * FROM `events` WHERE MONTH(date_start) = ? AND YEAR(date_start) = ? ORDER BY date_start ASC, time_start ASC"; //SELECT * FROM `events` WHERE MONTH(date_start) = 07 AND YEAR(date_start) = 2021 ORDER BY date_start ASC
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $month, $year);
        $stmt->execute();
        $stmt->bind_result($id, $title, $description, $date_start, $date_end, $time_start, $time_end, $color, $timestamp);
        $dataByMonth = array();

        while($stmt->fetch()) {
            $dataByMonth_row = array(
                "id" => $id,
                "title" => $title,
                "description" => $description,
                "date_start" => $date_start,
                "date_end" => $date_end,
                "time_start" => $time_start,
                "time_end" => $time_end,
                "color" => $color,
                "timestamp" => $timestamp
            );
            array_push($dataByMonth, $dataByMonth_row);
        }
        $stmt->close();
        $conn->close();
        return $dataByMonth;
    }

    function pulldataByYear($year) {
        $conn = createmysqlConnection();
        $sql = "SELECT * FROM `events` WHERE YEAR(date_start) = ? ORDER BY date_start ASC"; //SELECT * FROM `events` WHERE YEAR(date_start) = 2021 ORDER BY date_start ASC
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $year);
        $stmt->execute();
        $stmt->bind_result($id, $title, $description, $date_start, $date_end, $time_start, $time_end, $color, $timestamp);
        $dataByYear = array();

        while($stmt->fetch()) {
            $dataByYear_row = array(
                "id" => $id,
                "title" => $title,
                "description" => $description,
                "date_start" => $date_start,
                "date_end" => $date_end,
                "time_start" => $time_start,
                "time_end" => $time_end,
                "color" => $color,
                "timestamp" => $timestamp
            );
            array_push($dataByYear, $dataByYear_row);
        }
        $stmt->close();
        $conn->close();
        return $dataByYear;
    }

    function insertNewEvent($eventName, $description, $datebegin, $dateend, $timebegin, $timeend, $color) {
        $conn = createmysqlConnection();
        $sql = "INSERT INTO `events` (id, title, description, date_start, date_end, time_start, time_end, color) VALUES (0,?,?,?,?,?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssss", $eventName, $description, $datebegin, $dateend, $timebegin, $timeend, $color);

        $isSuccess = false;
        if($stmt->execute() === TRUE) {
            $isSuccess = true;
        } else {
            echo "Error: ".$sql."<br>".$conn->error;
        }
        $stmt->close();
        $conn->close();
        return $isSuccess;
    }

    function getEventDetail($xid) {
        $conn = createmysqlConnection();
        $sql = "SELECT * FROM `events` WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $xid);
        $stmt->execute();
        $stmt->bind_result($id, $title, $description, $date_start, $date_end, $time_start, $time_end, $color, $timestamp);
        $eventDetail = array();

        while($stmt->fetch()) {
            $eventDetail_row = array(
                "id" => $id,
                "title" => $title,
                "description" => $description,
                "date_start" => $date_start,
                "date_end" => $date_end,
                "time_start" => $time_start,
                "time_end" => $time_end,
                "color" => $color,
                "timestamp" => $timestamp
            );
            array_push($eventDetail, $eventDetail_row);
        }
        $stmt->close();
        $conn->close();
        return $eventDetail;
    }

    function updateEvent($id, $eventName, $description, $datebegin, $dateend, $timebegin, $timeend, $color) {
        $conn = createmysqlConnection();
        $sql = "UPDATE events SET title = ?, description = ?, date_start = ?, date_end = ?, time_start = ?, time_end = ?, color = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssssi",$eventName, $description, $datebegin, $dateend, $timebegin, $timeend, $color, $id);
        $isSuccess = false;
        if($stmt->execute() === TRUE) {
            $isSuccess = true;
        } else {
            echo "Error: ".$sql."<br>".$conn->error;
        }
        $stmt->close();
        $conn->close();
        return $isSuccess;
    }

    function deleteEvent($id) {
        $conn = createmysqlConnection();
        $sql = "DELETE FROM `events` WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);

        $isSuccess = false;
        if($stmt->execute() === TRUE) {
            $isSuccess = true;
        } else {
            echo "Error: ".$sql."<br>".$conn->error;
        }
        $stmt->close();
        $conn->close();
        return $isSuccess;
    }
?>
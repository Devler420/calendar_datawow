<?php
    function createmysqlConnection() {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "calendar_datawow";
    
        $conn = mysqli_connect($servername, $username, $password, $dbname);
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
        $sql = "SELECT * FROM `events` WHERE WEEK(date_start) = ? ORDER BY date_start, time_start AS"; //SELECT * FROM `events` WHERE WEEK(date_start) = 30 ORDER BY date_start, time_start ASC
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
        $sql = "SELECT * FROM `events` WHERE MONTH(date_start) = ? AND YEAR(date_start) = ? ORDER BY date_start ASC"; //SELECT * FROM `events` WHERE MONTH(date_start) = 07 AND YEAR(date_start) = 2021 ORDER BY date_start ASC
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
    
    
    // $conn = createmysqlConnection();
                    // $sql = "SELECT * FROM events WHERE MONTH(datetime_start) = '07'";
                    // $result = mysqli_query($conn,$sql);
                    // if (mysqli_num_rows($result) > 0) {
                    //     while ($row = mysqli_fetch_assoc($result)) {
                    //         echo "<p>";
                    //         echo $row['title'];
                    //         echo $row['datetime_start'];
                    //         echo "</p>";
                    //     }
                    // } else {
                    //     echo "There are no Data";
                    // }
?>
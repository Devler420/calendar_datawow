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
    
    
?>
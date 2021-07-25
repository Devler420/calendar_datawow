<?php
    include_once('dbconfig.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=chrome">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WowWee Caldendar</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="jquery-ui.min.css">
    <link rel="stylesheet" href="jquery.timepicker.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body onload="setdateString()">

    <div id="dialog-form" title="Add Event">
        <div style="display: flex; width: 100%; justify-content: space-between; cursor: move;">
            <p>Setting up your event.</p>
            <button id="dialog-close" onclick="closeAddEventDialog()">X</button>
        </div>
        <form>
            <fieldset>
                <div>
                    <label>Event Title</label>
                    <input type="text" name="name" id="name" value="Add title"/>
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" value="Event's Details"/>
                </div>
                <div>
                    <label>Date Start</label>
                    <input type="text" id="date_start"/>
                    <label>Time Start</label>
                    <input type="text" id="time_start"/>
                </div>
                <div>
                    <label>Date End</label>
                    <input type="text" id="date_end"/>
                    <label>Time End</label>
                    <input type="text" id="time_end"/>
                </div>
                <div>
                    <button>Add Event</button>
                </div>

            <!-- Allow form submission with keyboard without duplicating the dialog button -->
            <input type="submit" tabindex="-1" style="position:absolute; top:-1000px"/>
            </fieldset>
        </form>
    </div>

    <div class="heading">
        <h1>Better than Google Calendar</h1>
    </div>

    <div class="container">
        <div class="calendar-container">
            <div class="year">
                <button onclick="toPrevYear()" class="toPrevYear">&#60;</button>
                    <div>
                        <h1></h1>
                        <p class="full-date1"></p>
                    </div>
                <button onclick="toNextYear()" class="toNextYear">&#62;</button>
            </div>
            <div class="month">
                <div value="0">JAN</div>
                <div value="1">FEB</div>
                <div value="2">MAR</div>
                <div value="3">APR</div>
                <div value="4">MAY</div>
                <div value="5">JUN</div>
                <div value="6">JUL</div>
                <div value="7">AUG</div>
                <div value="8">SEP</div>
                <div value="9">OCT</div>
                <div value="10">NOV</div>
                <div value="11">DEC</div>
            </div>
            <div class="weekdays">
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
            </div>
            <div class="days">
            </div>
        </div>

        <div class="menu-container">
            <!-- change from button => picture/something later // or maybe change to drop-down -->
            <div id="button-today">
                <strong>TODAY</strong>
            </div>
            <div class="menu">
                <div id="button-day" class="tablink active">DAY</div>
                <div id="button-week" class="tablink">WEEK</div>
                <div id="button-month" class="tablink">MONTH</div>
                <div id="button-year" class="tablink">YEAR</div>
            </div>
            <div id="button-add-event">
                <strong>ADD EVENT</strong>
            </div>
        </div>

        <div class="event-container">
            <div class="full-date2">
                <p></p>
            </div>

            <!-- Day-tab -->
            <div id="day-tab"   class="event-tab" style="display: block;">
                <table id="day-table">
                    <thead>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Event</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>16.00</td>
                            <td>19.00</td>
                            <td>Event 1</td>
                        </tr>
                        <tr>
                            <td>20.00</td>
                            <td>22.00</td>
                            <td>Event 2</td>
                        </tr>
                        <tr>
                            <td>01.00</td>
                            <td>03.30</td>
                            <td>Event 3</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Week-tab -->
            <div id="week-tab"  class="event-tab" >
                <table id="week-table">
                    <thead>
                        <th>Time</th>
                        <th>SUN</th>
                        <th>MON</th>
                        <th>TUE</th>
                        <th>WED</th>
                        <th>THU</th>
                        <th>FRI</th>
                        <th>SAT</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>00.00</td>
                        </tr>
                        <tr>
                            <td>01.00</td>
                        </tr>
                        <tr>
                            <td>02.00</td>
                        </tr>
                        <tr>
                            <td>03.00</td>
                        </tr>
                        <tr>
                            <td>04.00</td>
                        </tr>
                        <tr>
                            <td>05.00</td>
                        </tr>
                        <tr>
                            <td>06.00</td>
                        </tr>
                        <tr>
                            <td>07.00</td>
                        </tr>
                        <tr>
                            <td>08.00</td>
                        </tr>
                        <tr>
                            <td>09.00</td>
                        </tr>
                        <tr>
                            <td>10.00</td>
                        </tr>
                        <tr>
                            <td>11.00</td>
                        </tr>
                        <tr>
                            <td>12.00</td>
                        </tr>
                        <tr>
                            <td>13.00</td>
                        </tr>
                        <tr>
                            <td>14.00</td>
                        </tr>
                        <tr>
                            <td>15.00</td>
                        </tr>
                        <tr>
                            <td>16.00</td>
                        </tr>
                        <tr>
                            <td>17.00</td>
                        </tr>
                        <tr>
                            <td>18.00</td>
                        </tr>
                        <tr>
                            <td>19.00</td>
                        </tr>
                        <tr>
                            <td>20.00</td>
                        </tr>
                        <tr>
                            <td>21.00</td>
                        </tr>
                        <tr>
                            <td>22.00</td>
                        </tr>
                        <tr>
                            <td>23.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Month-tab -->
            <div id="month-tab" class="event-tab" >
                <?php
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
                <table id="month-table">
                    <thead>
                        <th>Date</th>
                        <th>Event</th>
                        <th>Time</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1 Jul</td>
                            <td>Event 1</td>
                            <td>16.00-19.00</td>
                        </tr>
                        <tr>
                            <td>2 Jul</td>
                            <td>Event 2</td>
                            <td>20.00-22.00</td>
                        </tr>
                        <tr>
                            <td>6 Jul</td>
                            <td>Event 3</td>
                            <td>01.00-03.30</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Year-tab -->
            <div id="year-tab"  class="event-tab">
                <div class="year-outer">
                    <h3>JAN</h3>
                    <div class="year-inner">
                        <h4 class="year-inner-days">3</h4>
                        <h4 class="year-inner-days">4</h4>
                        <h4 class="year-inner-days">8</h4>
                        <h4 class="year-inner-days">14</h4>
                    </div>
                </div>
                <div class="year-outer">
                    <h3>FEB</h3>
                    <div class="year-inner">
                        <h4 class="year-inner-days">3</h4>
                        <h4 class="year-inner-days">4</h4>
                        <h4 class="year-inner-days">8</h4>
                        <h4 class="year-inner-days">14</h4>
                    </div>
                </div>
                <div class="year-outer">
                    <h3>MAR</h3>
                    <div class="year-inner">
                        <h4 class="year-inner-days">3</h4>
                        <h4 class="year-inner-days">4</h4>
                        <h4 class="year-inner-days">8</h4>
                        <h4 class="year-inner-days">14</h4>
                    </div>
                </div>
                <div class="year-outer">
                    <h3>APR</h3>
                    <div class="year-inner">
                        <h4 class="year-inner-days">3</h4>
                        <h4 class="year-inner-days">4</h4>
                        <h4 class="year-inner-days">8</h4>
                        <h4 class="year-inner-days">14</h4>
                    </div>
                </div>
                <div class="year-outer">
                    <h3>MAY</h3>
                    <div class="year-inner">
                        <h4>No Events</h4>
                    </div>
                </div>
                <div class="year-outer">
                    <h3>JUN</h3>
                    <div class="year-inner">
                        <h4 class="year-inner-days">3</h4>
                        <h4 class="year-inner-days">4</h4>
                        <h4 class="year-inner-days">8</h4>
                        <h4 class="year-inner-days">14</h4>
                    </div>
                </div>
                <div class="year-outer">
                    <h3>JUL</h3>
                    <div class="year-inner">
                        <h4 class="year-inner-days">3</h4>
                        <h4 class="year-inner-days">4</h4>
                        <h4 class="year-inner-days">8</h4>
                        <h4 class="year-inner-days">14</h4>
                    </div>
                </div>
                <div class="year-outer">
                    <h3>AUG</h3>
                    <div class="year-inner">
                        <h4 class="year-inner-days">3</h4>
                        <h4 class="year-inner-days">8</h4>
                        <h4 class="year-inner-days">14</h4>
                    </div>
                </div>
                <div class="year-outer">
                    <h3>SEP</h3>
                    <div class="year-inner">
                        <h4 class="year-inner-days">3</h4>
                        <h4 class="year-inner-days">4</h4>
                        <h4 class="year-inner-days">8</h4>
                        <h4 class="year-inner-days">14</h4>
                    </div>
                </div>
                <div class="year-outer">
                    <h3>OCT</h3>
                    <div class="year-inner">
                        <h4 class="year-inner-days">3</h4>
                        <h4 class="year-inner-days">4</h4>
                        <h4 class="year-inner-days">8</h4>
                        <h4 class="year-inner-days">14</h4>
                    </div>
                </div>
                <div class="year-outer">
                    <h3>NOV</h3>
                    <div class="year-inner">
                        <h4 class="year-inner-days">3</h4>
                        <h4 class="year-inner-days">14</h4>
                    </div>
                </div>
                <div class="year-outer">
                    <h3>DEC</h3>
                    <div class="year-inner">
                        <h4 class="year-inner-days">3</h4>
                        <h4 class="year-inner-days">4</h4>
                        <h4 class="year-inner-days">8</h4>
                        <h4 class="year-inner-days">14</h4>
                    </div>
                </div>
            </div> 

        </div>
    </div>
    <script src="script.js"></script>
    <script src="jquery-3.6.0.min.js"></script>
    <script src="jquery-ui.min.js"></script>
    <script src="datepair.js"></script>
    <script src="jquery.timepicker.min.js"></script>
</body>
</html>
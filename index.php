<?php
    include_once('dbconfig.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=chrome">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendar</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="jquery-ui-1.12.1/jquery-ui.min.css">
    <link rel="stylesheet" href="css/jquery.timepicker.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sarabun&display=swap" rel="stylesheet">
</head>
<body>

    <div id="dialog-form">
        <div style="display: flex; width: 100%; justify-content: space-between; cursor: move; border: 1px solid black; background-color: lemonchiffon;">
            <p id="dialogHeading">Setting up your event.</p>
            <span class="material-icons-outlined" id="dialog-close" onclick="closeAddEventDialog()">close</span>
        </div>
        <form action="" method="POST" autocomplete="off" id="event_data">
            <fieldset style="padding: 2px 0;">
                <div style="display: none;">
                    <label>ID</label>
                    <input type="text" name="eventID" id="event_id"/>
                </div>
                <div style="display: flex;">
                    <label style="padding-right: 12px;">Event Title</label>
                    <input type="text" name="eventTitle" id="event_name" size="50" title="Event's name"/>
                </div>
                <div style="display: flex;">
                    <label style="padding-right: 6px;">Description</label>
                    <textarea type="text" name="eventDesc" id="event_desc" rows="3" cols="50"></textarea>
                </div>
                <div style="display: flex; align-items: center;">
                    <label style="padding-right: 12px;">Date Start</label>
                    <input type="text" name="eventDateStart" id="date_start" style="width: 20%;"/>
                    <label style="padding: 0 10px 0 10px;">Time Start</label>
                    <input type="text" name="eventTimeStart" id="time_start" style="width: 20%;"/>
                </div>
                <div style="display: flex; align-items: center;">
                    <label style="padding-right: 23px;">Date End</label>
                    <input type="text" name="eventDateEnd" id="date_end" style="width: 20%;"/>
                    <label style="padding: 0 20px 0 10px;">Time End</label>
                    <input type="text" name="eventTimeEnd" id="time_end" style="width: 20%;"/>
                </div>
                <div style="display: flex; align-items: center; margin: 3px 0px;">
                    <div style="margin-right: 10px; font-weight: bold;">Color</div>
                    <div class="colorpick" style="background-color: #ffadad" colorName="#ffadad"><span class="material-icons-outlined" style="opacity: 0;">done</span></div>
                    <div class="colorpick" style="background-color: #ffd6a5" colorName="#ffd6a5"><span class="material-icons-outlined" style="opacity: 0;">done</span></div>
                    <div class="colorpick" style="background-color: #fdffb6" colorName="#fdffb6"><span class="material-icons-outlined" style="opacity: 0;">done</span></div>
                    <div class="colorpick" style="background-color: #caffbf" colorName="#caffbf"><span class="material-icons-outlined" style="opacity: 0;">done</span></div>
                    <div class="colorpick" style="background-color: #9bf6ff" colorName="#9bf6ff"><span class="material-icons-outlined" style="opacity: 0;">done</span></div>
                    <div class="colorpick" style="background-color: #a0c4ff" colorName="#a0c4ff"><span class="material-icons-outlined" style="opacity: 0;">done</span></div>
                    <div class="colorpick" style="background-color: #bdb2ff" colorName="#bdb2ff"><span class="material-icons-outlined" style="opacity: 0;">done</span></div>
                    <div class="colorpick" style="background-color: #ffc6ff" colorName="#ffc6ff"><span class="material-icons-outlined" style="opacity: 0;">done</span></div>
                    <input type="text" name="color" id="color" style="display: none;"/>
                </div>
                <div>
                    <input type="submit" name="submit" value="Add Event" id="addEventButton" onclick="submitEventDetails();"></input>
                    <input type="submit" name="submit" value="Edit Event" id="editEventButton" onclick="updateEventDetails();"></input>
                </div>
            </fieldset>
        </form>
    </div>

    <div class="heading">
        <h1>Calendar Wow</h1>
    </div>

    <div class="container">
        <div class="calendar-container">
            <div class="year">
                <span class="material-icons-outlined" onclick="toPrevYear()" id="toPrevYear">arrow_back_ios</span>
                    <div>
                        <h1></h1>
                        <p class="full-date1"></p>
                    </div>
                <span class="material-icons-outlined" onclick="toNextYear()" id="toNextYear">arrow_forward_ios</span>
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
            <div id="button-today" onclick="today()">
                <strong>TODAY</strong>
            </div>
            <div class="menu">
                <div id="button-day" class="tablink">DAY</div>
                <div id="button-week" class="tablink">WEEK</div>
                <div id="button-month" class="tablink">MONTH</div>
                <div id="button-year" class="tablink">YEAR</div>
            </div>
            <div id="button-add-event">
                <strong>ADD EVENT</strong>
            </div>
            <span class="material-icons-outlined" id="pin">push_pin</span>
        </div>

        <div class="event-container">
            <div class="full-date2">
                <p></p>
            </div>

            <!-- Day-tab -->
            <div id="day-tab"   class="event-tab">
                <table id="day-table">
                    <thead>
                        <tr style="background-color: #04AA6D; color: white;">
                            <th>ID</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Event</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>

            <!-- Week-tab -->
            <div id="week-tab"  class="event-tab" style="position: relative;">
                <table id="week-table">
                    <thead>
                        <tr style="color: white;">
                            <th>Time</th>
                            <th>SUN</th>
                            <th>MON</th>
                            <th>TUE</th>
                            <th>WED</th>
                            <th>THU</th>
                            <th>FRI</th>
                            <th>SAT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="00:00">
                            <td>00.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="01:00">
                            <td>01.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="02:00">
                            <td>02.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="03:00">
                            <td>03.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="04:00">
                            <td>04.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="05:00">
                            <td>05.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="06:00">
                            <td>06.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="07:00">
                            <td>07.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="08:00">
                            <td>08.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="09:00">
                            <td>09.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="10:00">
                            <td>10.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="11:00"> 
                            <td>11.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="12:00">
                            <td>12.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="13:00">
                            <td>13.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="14:00">
                            <td>14.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="15:00">
                            <td>15.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="16:00">
                            <td>16.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="17:00">
                            <td>17.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="18:00">
                            <td>18.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="19:00">
                            <td>19.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="20:00">
                            <td>20.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="21:00">
                            <td>21.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="22:00">
                            <td>22.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                        <tr id="23:00">
                            <td>23.00</td>
                            <td class="wSUN"></td>
                            <td class="wMON"></td>
                            <td class="wTUE"></td>
                            <td class="wWED"></td>
                            <td class="wTHU"></td>
                            <td class="wFRI"></td>
                            <td class="wSAT"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Month-tab -->
            <div id="month-tab" class="event-tab">
                <table id="month-table">
                    <thead>
                        <tr style="background-color: #04AA6D; color: white;">
                            <th>ID</th>
                            <th>Date</th>
                            <th>Event</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>

            <!-- Year-tab -->
            <div id="year-tab"  class="event-tab">
                <div class="year-outer">
                    <h3>JAN</h3>
                    <div class="year-inner" id="jan">

                    </div>
                </div>
                <div class="year-outer">
                    <h3>FEB</h3>
                    <div class="year-inner" id="feb">

                    </div>
                </div>
                <div class="year-outer">
                    <h3>MAR</h3>
                    <div class="year-inner" id="mar">

                    </div>
                </div>
                <div class="year-outer">
                    <h3>APR</h3>
                    <div class="year-inner" id="apr">

                    </div>
                </div>
                <div class="year-outer">
                    <h3>MAY</h3>
                    <div class="year-inner" id="may">

                    </div>
                </div>
                <div class="year-outer">
                    <h3>JUN</h3>
                    <div class="year-inner" id="jun">

                    </div>
                </div>
                <div class="year-outer">
                    <h3>JUL</h3>
                    <div class="year-inner" id="jul">

                    </div>
                </div>
                <div class="year-outer">
                    <h3>AUG</h3>
                    <div class="year-inner" id="aug">

                    </div>
                </div>
                <div class="year-outer">
                    <h3>SEP</h3>
                    <div class="year-inner" id="sep">
                        
                    </div>
                </div>
                <div class="year-outer">
                    <h3>OCT</h3>
                    <div class="year-inner" id="oct">
                        
                    </div>
                </div>
                <div class="year-outer">
                    <h3>NOV</h3>
                    <div class="year-inner" id="nov">
                        
                    </div>
                </div>
                <div class="year-outer">
                    <h3>DEC</h3>
                    <div class="year-inner" id="dec">
                        
                    </div>
                </div>
            </div> 

        </div>
    </div>
    <script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
        }
    </script>
    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="jquery-ui-1.12.1/jquery-ui.min.js"></script>
    <script src="js/datepair.js"></script>
    <script src="js/jquery.timepicker.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>
//Today's date
var date = new Date();

/////////////////////////////////LEFT SIDE CONTAINER SECTION/////////////////////////////////////////////

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

const weekdays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];

var mode_day = false;
var mode_week = false;
var mode_month = false;
var mode_year = false;

var mode_CreateEvent = false;

function loadCalendar() {
    //getMonth() index number starts from 0
    const month = date.getMonth();

    //get LastDate of the current month
    const lastDate = new Date(date.getFullYear(), date.getMonth()+1,0).getDate();

    //get First Week Day of the current month
    const FirstWdayofMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    //get Last Week Day of the current month
    const LastWdayofMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDay();

    //get Last date of the previous month
    const LastdayofPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    //Display the Year on the left-side container
    document.querySelector(".year h1").innerHTML = date.getYear()+1900;

    //Display the days of the current month on the left-side container
    const daysInMonth = document.querySelector(".days");
    let daysRowCount = 0;
    let days = "";
    for (let i = LastdayofPrevMonth-FirstWdayofMonth+1 ; i <= LastdayofPrevMonth  ; i++) {
        days += `<div class="prev-date">${i}</div>`;
        daysRowCount++;
    }
    for (let i = 1 ; i <= lastDate ; i++) {
        if(i === date.getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
            days += `<div class="today selected-date">${i}</div>`;
            daysRowCount++;
            continue;
        }
        days += `<div>${i}</div>`;
        daysRowCount++;
    }
    for (let i = 1 ; i <= 13-LastWdayofMonth  ; i++) {
        days += `<div class="next-date">${i}</div>`;
        daysRowCount++;
        if(daysRowCount == 42) {
            break;
        }
    }
    daysInMonth.innerHTML = days;
    addListenertoDateSelection()
}

loadCalendar();

function toPrevYear() {
    date.setFullYear(date.getFullYear() - 1);
    loadCalendar();
}

function toNextYear() {
    date.setFullYear(date.getFullYear() + 1);
    loadCalendar();
}

//Set initial today's date
function setdateString() {
    $(".full-date1").children().remove();
    $(".full-date2").children().remove();
    let xwday = weekdays[date.getDay()]; //Wed
    let xmonth = months[date.getMonth()]; //Jul
    let xday = date.getDate(); //21
    let xyear = date.getFullYear(); //2021
    let mainshowdate = `<span id="xmonth">${xmonth}</span> <span id="xwday">${xday}</span>, <span id="xyear">${xyear}</span>`;
    document.querySelector(".full-date1").innerHTML = mainshowdate;
    document.querySelector('.full-date2').innerHTML = mainshowdate;
}

//Listener for today selection
document.querySelector('.today').addEventListener("click", (event)=> {
    $(".today").addClass("selected-date");
    $(".today").css({'background-color' : 'lightgreen'});
});

// Listener for Date selection
function addListenertoDateSelection() {
    document.querySelectorAll('.days > div').forEach(item => {
        item.addEventListener('click', (event) => {
            let selectedDate = new Date(getSelectedDate());
            console.log(selectedDate.getMonth())

            $(".full-date1").children().remove();
            $(".full-date2").children().remove();
            let mainshowdate = `<span id="xmonth"></span> <span id="xwday"></span>, <span id="xyear"></span>`;
            document.querySelector(".full-date1").innerHTML = mainshowdate;
            document.querySelector('.full-date2').innerHTML = mainshowdate;
            
            if(event.target.classList.value == "prev-date") {
                document.querySelector('.full-date2 span#xmonth').innerHTML = months[date.getMonth()-1];
                document.querySelector('.full-date2 span#xwday').innerHTML = event.target.innerHTML;
                document.querySelector('.full-date2 span#xyear').innerHTML = date.getFullYear();
            }
            else if(event.target.classList.value == "next-date") {
                document.querySelector('.full-date2 span#xmonth').innerHTML = months[date.getMonth()+1];
                document.querySelector('.full-date2 span#xwday').innerHTML = event.target.innerHTML;
                document.querySelector('.full-date2 span#xyear').innerHTML = date.getFullYear();
            }
            else {
                document.querySelector('.full-date2 span#xmonth').innerHTML = months[date.getMonth()];
                document.querySelector('.full-date2 span#xwday').innerHTML = event.target.innerHTML;
                document.querySelector('.full-date2 span#xyear').innerHTML = date.getFullYear();
            }
    
            if(document.querySelector('div.days').classList.contains('selected-date')) {
                document.querySelector('div.days').classList.remove('selected-date');
            }
    
            $(".today").css({'background-color' : ''});
            $(".selected-date").removeClass("selected-date");
            event.target.classList.add("selected-date");
            $(".full-date1").html($(".full-date2").html());
    
            if(mode_day == true) {
                displayDatabyDay();
            } else if (mode_week == true) {
                displayDatabyWeek();
            } else if (mode_month == true) {
                displayDatabyMonth();
            } else if (mode_year == true) {
                displayDatabyYear();
            }
        })
    });
}

//Listener for Month selection
document.querySelectorAll('.month > div').forEach(item => {
    item.addEventListener('click', (event) => {
        $(".full-date1").children().remove();
        $(".full-date2").children().remove();
        let mainshowdate = `<span id="xmonth"></span> <span id="xwday"></span>, <span id="xyear"></span>`;
        document.querySelector(".full-date1").innerHTML = mainshowdate;
        document.querySelector('.full-date2').innerHTML = mainshowdate;

        date.setMonth(event.target.attributes.value.value);
        document.querySelector('.full-date2 span#xmonth').innerHTML = months[event.target.attributes.value.value];
        document.querySelector('.full-date2 span#xwday').innerHTML = "1";
        document.querySelector('.full-date2 span#xyear').innerHTML = date.getFullYear();
        $(".full-date1").html($(".full-date2").html());
        loadCalendar();
        if(date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
            document.querySelector('.full-date1 span#xwday').innerHTML = new Date().getDate();
            document.querySelector('.full-date2 span#xwday').innerHTML = new Date().getDate();
            loadCalendar();
        } else {
            $(document).ready(function() {
                $('div.days > div').not(".prev-date").first().addClass("selected-date");
            });
        }
        if(mode_day == true) {
            displayDatabyDay();
        } else if (mode_week == true) {
            displayDatabyWeek();
        } else if (mode_month == true) {
            displayDatabyMonth();
        } else if (mode_year == true) {
            
        }
    })
});

//Listener for Year selection
document.querySelector('#toPrevYear').addEventListener('click', (event)=> {
    let selectedMonth = document.querySelector('.full-date1 span#xmonth').innerHTML;
    $(".full-date1").children().remove();
    $(".full-date2").children().remove();
    let mainshowdate = `<span id="xmonth"></span> <span id="xwday"></span>, <span id="xyear"></span>`;
    document.querySelector(".full-date1").innerHTML = mainshowdate;
    document.querySelector('.full-date2').innerHTML = mainshowdate;

    document.querySelector('.full-date2 span#xmonth').innerHTML = selectedMonth;
    document.querySelector('.full-date2 span#xwday').innerHTML = "1";
    document.querySelector('.full-date2 span#xyear').innerHTML = date.getFullYear();
    $(".full-date1").html($(".full-date2").html());

    if(date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
        loadCalendar();
    } else {
        $(document).ready(function() {
            $('div.days > div').not(".prev-date").first().addClass("selected-date");
        });
    }

    if(mode_day == true) {
        displayDatabyDay();
    } else if (mode_week == true) {
        displayDatabyWeek();
    } else if (mode_month == true) {
        displayDatabyMonth();
    } else if (mode_year == true) {
        displayDatabyYear();
    }
});

document.querySelector('#toNextYear').addEventListener('click', (event)=> {
    let selectedMonth = document.querySelector('.full-date1 span#xmonth').innerHTML;
    $(".full-date1").children().remove();
    $(".full-date2").children().remove();
    let mainshowdate = `<span id="xmonth"></span> <span id="xwday"></span>, <span id="xyear"></span>`;
    document.querySelector(".full-date1").innerHTML = mainshowdate;
    document.querySelector('.full-date2').innerHTML = mainshowdate;

    document.querySelector('.full-date2 span#xmonth').innerHTML = selectedMonth;
    document.querySelector('.full-date2 span#xwday').innerHTML = "1";
    document.querySelector('.full-date2 span#xyear').innerHTML = date.getFullYear();
    $(".full-date1").html($(".full-date2").html());
    
    if(date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
        loadCalendar();
    } else {
        $(document).ready(function() {
            $('div.days > div').not(".prev-date").first().addClass("selected-date");
        });
    }

    if(mode_day == true) {
        displayDatabyDay();
    } else if (mode_week == true) {
        displayDatabyWeek();
    } else if (mode_month == true) {
        displayDatabyMonth();
    } else if (mode_year == true) {
        displayDatabyYear();
    }
});

/* ////////////////////////////////////MENU CONTAINER SECTION///////////////////////////////////////////// */

//Listener for Menu selection
document.querySelectorAll('.menu > div').forEach(item => {
    item.addEventListener('click', (event) => {
        let x = event.target.id;
        let tabId, byParam;
        if(x == "button-day") {
            tabId = "day-tab",
            byParam = "byday"
            if(mode_day == false) {
                displayDatabyDay();
            }
            mode_day = true;
            mode_week = false;
            mode_month = false;
            mode_year = false;
        }
        else if(x == "button-week") {
            tabId = "week-tab",
            byParam = "byweek"
            if(mode_week == false) {
                displayDatabyWeek();
            }
            mode_day = false;
            mode_week = true;
            mode_month = false;
            mode_year = false;
        }
        else if(x == "button-month") {
            tabId = "month-tab",
            byParam = "bymonth"
            if(mode_month == false) {
                displayDatabyMonth();
            }
            mode_day = false;
            mode_week = false;
            mode_month = true;
            mode_year = false;
        }
        else if(x == "button-year") {
            tabId = "year-tab",
            byParam = "byyear"
            if(mode_year == false) {
                displayDatabyYear();
            }
            mode_day = false;
            mode_week = false;
            mode_month = false;
            mode_year = true;
        }
        openTabs(event.target, tabId);
    })
});

//Listener for Add Event button
document.querySelector('#button-add-event').addEventListener('click', (event)=> {
    mode_CreateEvent = true;
    openAddEventDialog();
});

function openAddEventDialog() {
    document.getElementById('dialog-form').style.display = "block";

    $('#dialog-form').draggable();
    $('#date_start').datepicker({
        dateFormat: 'dd-M-yy'
    }); 
    $('#date_end').datepicker({
        dateFormat: 'dd-M-yy',
        'autoclose': true
    }); 
    $('#time_start').timepicker({
        'showDuration': true,
        'timeFormat': 'H:i:s'
    });
    $('#time_end').timepicker({
        'showDuration': true,
        'timeFormat': 'H:i:s'
    });

    $('#event_id').val('');
    $('#event_name').val('');
    $('#event_desc').val('');
    $('#date_start').val('');
    $('#time_start').val('');
    $('#date_end').val('');
    $('#time_end').val('');
    $('#color').val('');

    $('.colorpick > span').css({"opacity" : "0"});
    $('.colorpick > span').removeAttr('id');

    if(mode_CreateEvent == true) {
        $(`#addEventButton`).css({"display" : ""});
        $(`#editEventButton`).css({"display" : "none"});
        $(`#dialogHeading`).text("Setting up your event.");
    } else {
        $(`#addEventButton`).css({"display" : "none"});
        $(`#editEventButton`).css({"display" : ""});
        $(`#dialogHeading`).text("Edit your event.");
    }
}

//Listener for Add Event's Color Selector
document.querySelectorAll('.colorpick').forEach(item => {
    item.addEventListener('click', (event) => {
        $('.colorpick > span').siblings().prevObject.css({"opacity" : "0"});
        $('.colorpick > span').siblings().prevObject.removeAttr('id');
        $(event.target).css({"opacity":"1"});
        $(event.target).attr('id','selected-color');
        $('#color').val(event.target.parentNode.getAttribute("colorName"));
    })
  });

function submitEventDetails() {
    let eventname = $('#event_name').val();
    let eventDesc = $('#event_desc').val();
    let eventDateStart = $('#date_start').val();
    let eventTimeStart = $('#time_start').val();
    let eventDateEnd = $('#date_end').val();
    let eventTimeEnd = $('#time_end').val();
    let color  = $('#color').val();

    if(eventname!="" && eventDesc!="" && eventDateStart!="" && eventTimeStart!="" && eventDateEnd!="" && eventTimeEnd!="" && color!="") {
        $.ajax({
            url: "output/insert_new_event.php",
            type: "POST",
            data: {
                eventTitle: eventname,
                eventDesc: eventDesc,
                eventDateStart: eventDateStart,
                eventTimeStart: eventTimeStart,
                eventDateEnd: eventDateEnd,
                eventTimeEnd: eventTimeEnd,
                color: color
            },
            success: function(data) {
                if(mode_day == true) {
                    displayDatabyDay();
                } else if(mode_week == true) {
                    displayDatabyWeek();
                } else if(mode_month == true) {
                    displayDatabyMonth();
                } else if(mode_year == true) {
                    displayDatabyYear();
                }
            }
        }).done(function() {
            console.log("Success.");
        }).fail(function() {
            console.log("Error occurred.");
        }).always(function() {
            console.log("Complete.");
        });
        closeAddEventDialog();
    } else {
        alert('Please fill all the field !');
    }
}

function updateEventDetails() {
    let eventID = $('#event_id').val();
    let eventname = $('#event_name').val();
    let eventDesc = $('#event_desc').val();
    let eventDateStart = $('#date_start').val();
    let eventTimeStart = $('#time_start').val();
    let eventDateEnd = $('#date_end').val();
    let eventTimeEnd = $('#time_end').val();
    let color  = $('#color').val();

    if(eventname!="" && eventDesc!="" && eventDateStart!="" && eventTimeStart!="" && eventDateEnd!="" && eventTimeEnd!="" && color!="") {
        $.ajax({
            url: "output/update_event.php",
            type: "POST",
            data: {
                eventID: eventID,
                eventTitle: eventname,
                eventDesc: eventDesc,
                eventDateStart: eventDateStart,
                eventTimeStart: eventTimeStart,
                eventDateEnd: eventDateEnd,
                eventTimeEnd: eventTimeEnd,
                color: color
            },
            success: function(data) {
                if(mode_day == true) {
                    displayDatabyDay();
                } else if(mode_week == true) {
                    displayDatabyWeek();
                } else if(mode_month == true) {
                    displayDatabyMonth();
                } else if(mode_year == true) {
                    displayDatabyYear();
                }
            }
        }).done(function() {
            console.log("Success.");
        }).fail(function() {
            console.log("Error occurred.");
        }).always(function() {
            console.log("Complete.");
        });
        closeAddEventDialog();
    } else {
        alert('Please fill all the field !');
    }
}

function closeAddEventDialog() {
    document.getElementById('dialog-form').style.display = "none";
}

function today() {
    date = new Date();
    loadCalendar();
    setdateString();
    displayDatabyDay();
    openTabs(document.getElementById('button-day'), "day-tab");
    mode_day = true;
    mode_week = false;
    mode_month = false;
    mode_year = false;
}

/////////////////////////////////RIGHT SIDE CONTAINER SECTION/////////////////////////////////////////////

//Get current selection Day,Month,Year to use as parameters for pulling data from database
function getSelectedDate() {
    let Sday = document.querySelector('.full-date1 span#xwday').innerText;
    let Smonth = document.querySelector('.full-date1 span#xmonth').innerText;
    let Syear = document.querySelector('.full-date1 span#xyear').innerText;
    let arrSelectedDate = new Array(Sday,Smonth,Syear);
    return arrSelectedDate;
}

//Open & Close Tabs function (Day, Week, Month, Year)
function openTabs(e, tabId) {
    var i, tabcontent, tablink;
    tabcontent = document.getElementsByClassName('event-tab');
    for (i=0 ; i < tabcontent.length ; i++) {
        tabcontent[i].style.display = "none";
    }

    tablink = document.getElementsByClassName('tablink');
    for (i=0 ; i < tablink.length ; i++) {
        tablink[i].className = tablink[i].className.replace(' active','');
    }
    if(tabId == "year-tab") {
        document.getElementById(tabId).style.display = "flex";
    } else if (tabId == "month-tab") {
        document.getElementById(tabId).style.display = "block";
    } else if (tabId == "week-tab") {
        document.getElementById(tabId).style.display = "block";
    } else if (tabId == "day-tab") {
        document.getElementById(tabId).style.display = "block";
    }
    e.className += ' active';
}

function displayDatabyDay() {

    let selectedDate = new Date(getSelectedDate());
    let dayofSelectedDate = selectedDate.getDate();
    let monthofSelectedDate = months[selectedDate.getMonth()];
    let yearofSelectedDate = selectedDate.getFullYear();

    let showdate = 
    `<span id="xmonth">${monthofSelectedDate}</span> <span id="xwday">${dayofSelectedDate}</span>, <span id="xyear">${yearofSelectedDate}</span>`;
    document.querySelector('.full-date2').innerHTML = showdate;

    $('#day-table > tbody > tr').remove();

    let template = 
    "\
    <tr> \
        <td>{{[[--ID--]]}}</td> \
        <td>{{[[--time_start--]]}}</td> \
        <td>{{[[--time_end--]]}}</td> \
        <td id='eventid_{{[[--ID--]]}}'>{{[[--event_name--]]}}<div class='delete'><span class='material-icons-outlined dl'>clear</span></div><div class='edit'><span class='material-icons-outlined ed'>edit</span></div></td> \
    </tr> \
    ";

    //Retrive data from server side (MySQL Apache)
    $.ajax({
        url: "output/get_data_byday.php",
        type: "POST",
        data: {selectedDate : getSelectedDate()},
        success: function(data) {
            let obj = JSON.parse(data);
            if(obj.length == 0) {
                let row = template;
                row = row.replace("{{[[--ID--]]}}","-");
                row = row.replace("{{[[--ID--]]}}","-");
                row = row.replace("{{[[--time_start--]]}}","-");
                row = row.replace("{{[[--time_end--]]}}","-");
                row = row.replace("{{[[--event_name--]]}}","No Event");
                $('#day-table tbody').append(row)
            } else {
                for (let i = 0 ; i < obj.length ; i++) {
                    let row = template;
                    row = row.replace("{{[[--ID--]]}}",obj[i].id);
                    row = row.replace("{{[[--ID--]]}}",obj[i].id);
                    row = row.replace("{{[[--time_start--]]}}",obj[i].time_start.substring(0,5));
                    row = row.replace("{{[[--time_end--]]}}",obj[i].time_end.substring(0,5));
                    row = row.replace("{{[[--event_name--]]}}",obj[i].title);
                    $('#day-table tbody').append(row)
                }
            }
            UpdateEventListener();
            DeleteEventListener();
        }
    }).done(function() {
        console.log("Success.");
    }).fail(function() {
        console.log("Error occurred.");
    }).always(function() {
        console.log("Complete.");
    });
}

function displayDatabyWeek() {

    $('#week-table td').css({'background-color' : '' , 'border-color' : ''});
    $('#week-table td.wSUN').empty();
    $('#week-table td.wMON').empty();
    $('#week-table td.wTUE').empty();
    $('#week-table td.wWED').empty();
    $('#week-table td.wTHU').empty();
    $('#week-table td.wFRI').empty();
    $('#week-table td.wSAT').empty();
    let selectedDate = new Date(getSelectedDate());
    let firstWeekDay = new Date(selectedDate.getFullYear(),selectedDate.getMonth(), selectedDate.getDate()-selectedDate.getDay());
    let LastWeekDay = new Date(selectedDate.getFullYear(),selectedDate.getMonth(), selectedDate.getDate()+(6-selectedDate.getDay()));

    let showdate = 
    `<span id="xmonth">${months[firstWeekDay.getMonth()]}</span> <span id="xwday">${firstWeekDay.getDate()}</span>, <span id="xyear">${firstWeekDay.getFullYear()}</span>-
    <span id="xmonth">${months[LastWeekDay.getMonth()]}</span> <span id="xwday">${LastWeekDay.getDate()}</span>, <span id="xyear">${LastWeekDay.getFullYear()}</span>`;
    document.querySelector('.full-date2').innerHTML = showdate;

    let template = 
    "\
    <tr> \
        <td>{{[[--time_start--]]}}</td> \
        <td>{{[[--time_end--]]}}</td> \
        <td>{{[[--event_name--]]}}</td> \
    </tr> \
    ";

    let eventTitleTemplate = 
    "\
    {{[[--event_name--]]}}\
    ";

    $.ajax({
        url: "output/get_data_byweek.php",
        type: "POST",
        data: {selectedDate : getSelectedDate()},
        success: function(data) {
            let obj = JSON.parse(data);
            for (let i = 0 ; i < obj.length ; i++) {
                let row = template;
                let weekdayID = "w"+weekdays[new Date(obj[i].date_start).getDay()].toUpperCase();
                let timestart = obj[i].time_start.substring(0,2);
                let timeend = obj[i].time_end.substring(0,2);
                let timecount = obj[i].time_end.substring(0,2) - obj[i].time_start.substring(0,2);
                let color = obj[i].color;
                let eventTitle = eventTitleTemplate;
                eventTitle = eventTitle.replace("{{[[--event_name--]]}}",obj[i].title);

                for(let j = 0 ; j <= timecount ; j++) {
                    let xtimestart = 0;
                    if ((parseInt(timestart)+j) >= 10) {
                        xtimestart = (parseInt(timestart)+j);
                    } else {
                        xtimestart = "0"+(parseInt(timestart)+j);
                    }
                    $(`#${xtimestart}\\:00`).children(`.${weekdayID}`).css({"background-color":`${color}`, "border-color":`${color}`});
                    if (j == 0) {
                        $(`#${xtimestart}\\:00`).children(`.${weekdayID}`).append(eventTitle);
                    }
                }
            }
        }
    }).done(function() {
        console.log("Success.");
    }).fail(function() {
        console.log("Error occurred.");
    }).always(function() {
        console.log("Complete.");
    });
}

function displayDatabyMonth() {

    let selectedDate = new Date(getSelectedDate());
    let monthofSelectedDate = months[selectedDate.getMonth()];
    let yearofSelectedDate = selectedDate.getFullYear();

    let showdate = 
    `<span id="xmonth">${monthofSelectedDate}</span> <span id="xwday"></span> <span id="xyear">${yearofSelectedDate}</span>`;
    document.querySelector('.full-date2').innerHTML = showdate;

    $('#month-table > tbody > tr').remove();

    let template = 
    "\
    <tr> \
        <td>{{[[--ID--]]}}</td> \
        <td>{{[[--date_start--]]}}</td> \
        <td id='eventid_{{[[--ID--]]}}'>{{[[--event_name--]]}}<div class='delete'><span class='material-icons-outlined dl'>clear</span></div><div class='edit'><span class='material-icons-outlined ed'>edit</span></div></td> \
        <td>{{[[--time--]]}}</td> \
    </tr> \
    ";

    $.ajax({
        url: "output/get_data_bymonth.php",
        type: "POST",
        data: {selectedDate : getSelectedDate()},
        success: function(data) {
            let obj = JSON.parse(data);
            if(obj.length == 0) {
                let row = template;
                    row = row.replace("{{[[--ID--]]}}","-");
                    row = row.replace("{{[[--ID--]]}}","-");
                    row = row.replace("{{[[--date_start--]]}}","-");
                    row = row.replace("{{[[--event_name--]]}}","No Event");
                    row = row.replace("{{[[--time--]]}}","-");
                    $('#month-table tbody').append(row);
            } else {
                for (let i = 0 ; i < obj.length ; i++) {
                    let newDateFormat = obj[i].date_start.split('-');
                    let row = template;
                    row = row.replace("{{[[--ID--]]}}",obj[i].id);
                    row = row.replace("{{[[--ID--]]}}",obj[i].id);
                    row = row.replace("{{[[--date_start--]]}}",newDateFormat[2]+"-"+months[parseInt(newDateFormat[1])-1]);
                    row = row.replace("{{[[--event_name--]]}}",obj[i].title);
                    row = row.replace("{{[[--time--]]}}",obj[i].time_start.substring(0,5)+"-"+obj[i].time_end.substring(0,5));
                    $('#month-table tbody').append(row);
                }
            }
            UpdateEventListener();
            DeleteEventListener();
        }
    }).done(function() {
        console.log("Success.");
    }).fail(function() {
        console.log("Error occurred.");
    }).always(function() {
        console.log("Complete.");
    });
}

function displayDatabyYear() {
    let selectedDate = new Date(getSelectedDate());
    let yearofSelectedDate = selectedDate.getFullYear();

    let showdate = 
    `<span id="xmonth"></span> <span id="xwday"></span> <span id="xyear">${yearofSelectedDate}</span>`;
    document.querySelector('.full-date2').innerHTML = showdate;

    $('.year-inner-days').remove();
    $('.year-inner > h4').remove();

    let template = 
    '\
    <div class="year-inner-days"> \
        <span id="year-days">{{[[--date_start--]]}}</span> \
        <div id="dul-event">{{[[--numofDulplicateEvent--]]}}</div> \
    </div> \
    ';

    let noEventTemplate = "<h4>No Event</h4>";

    $.ajax({
        url: "output/get_data_byyear.php",
        type: "POST",
        data: {selectedDate : getSelectedDate()},
        success: function(data) {
            let obj = JSON.parse(data);
            let dulplicateEvent = 1;
            for (let i = 0 ; i < obj.length ; i++) {
                if(i != obj.length-1 && obj[i].date_start == obj[i+1].date_start) {
                    dulplicateEvent++;
                    continue;
                } else if(i == obj.length-1 || obj.length == 0) {

                }
                let m = months[parseInt(obj[i].date_start.substring(5,7))-1].toLowerCase();
                let d = parseInt(obj[i].date_start.substring(8));
                let row = template;
                row = row.replace("{{[[--date_start--]]}}", d);
                if(dulplicateEvent == 1) {
                    row = row.replace('<div id="dul-event">{{[[--numofDulplicateEvent--]]}}</div>', '');
                } else {
                    row = row.replace("{{[[--numofDulplicateEvent--]]}}", dulplicateEvent);
                }
                $(`#${m}`).append(row);
                dulplicateEvent = 1;
            }
            //Append "No Event"
            for (let i = 0 ; i <= 11 ; i++) {
                let m = months[i].toLowerCase(); //jan jul
                if ($(`#${m}`)[0].firstElementChild == null) {
                    $(`#${m}`).append(noEventTemplate);
                }
            }
        }
    }).done(function() {
        console.log("Success.");
    }).fail(function() {
        console.log("Error occurred.");
    }).always(function() {
        console.log("Complete.");
    });
}

//Listener for Edit/Update button
function UpdateEventListener() {
    document.querySelectorAll('.edit > span').forEach(item => {
        item.addEventListener('click', (event) => {
            mode_CreateEvent = false;
            let id = event.target.parentNode.parentNode.id.substring(8);
            $.ajax({
                url: "output/get_event_detail.php",
                type: "POST",
                data: {
                    eventID: id
                },
                success: function(data) {
                    let obj = JSON.parse(data);
                    openAddEventDialog();
                    showExistEventDetailtoUpdate(obj);
                }
            }).done(function() {
                console.log("Success.");
            }).fail(function() {
                console.log("Error occurred.");
            }).always(function() {
                console.log("Complete.");
            });
        })
    });
}

function showExistEventDetailtoUpdate($eventdetail) {
    let $id = $eventdetail[0].id;
    $('#event_id').val($id);
    $('#event_name').val($eventdetail[0].title);
    $('#event_desc').val($eventdetail[0].description);
    $('#date_start').val($eventdetail[0].date_start);
    $('#time_start').val($eventdetail[0].time_start);
    $('#date_end').val($eventdetail[0].date_end);
    $('#time_end').val($eventdetail[0].time_end);
    $('#color').val($eventdetail[0].color);

    //set color check mark
    $(`[colorName='${$eventdetail[0].color}'] > span`).css({"opacity" : "1"});
    $(`[colorName='${$eventdetail[0].color}']`).children().attr('id','selected-color');
}

//Listener for Delete button
function DeleteEventListener() {
    document.querySelectorAll('.delete > span').forEach(item => {
        item.addEventListener('click', (event) => {
            if(confirm("Are you sure you want to delete?")) {
                let id = event.target.parentNode.parentNode.id.substring(8);
                $.ajax({
                    url: "output/delete_event.php",
                    type: "POST",
                    data: {
                        eventID: id
                    },
                    success: function(data) {
                        if(mode_day == true) {
                            displayDatabyDay();
                        } else if(mode_week == true) {
                            displayDatabyWeek();
                        } else if(mode_month == true) {
                            displayDatabyMonth();
                        } else if(mode_year == true) {
                            displayDatabyYear();
                        }
                    }
                }).done(function() {
                    console.log("Success.");
                }).fail(function() {
                    console.log("Error occurred.");
                }).always(function() {
                    console.log("Complete.");
                });
            } else {
                return;
            }
        })
    });
}

setdateString();
openTabs(document.getElementById('button-month'), "month-tab");
displayDatabyMonth();
mode_day = false;
mode_week = false;
mode_month = true;
mode_year = false;
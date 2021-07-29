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
    "Sat",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sun"
];

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
            days += `<div class="today">${i}</div>`;
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
    let xwday = weekdays[date.getDay()]; //Wed
    let xmonth = months[date.getMonth()]; //Jul
    let xday = date.getDate(); //21
    let xyear = date.getFullYear(); //2021
    let mainshowdate = `<span id="xmonth">${xmonth}</span> <span id="xwday">${xday}</span>, <span id="xyear">${xyear}</span>`;
    document.querySelector(".full-date1").innerHTML = mainshowdate;
    document.querySelector('.full-date2').innerHTML = mainshowdate;
}

//Listener for Date selection
document.querySelector('div.days').addEventListener("click", (event)=> {
    console.log(event.target)
    if(event.target.classList.value == "prev-date") {
        // document.querySelector('.full-date2').innerHTML = months[date.getMonth()-1]+" "+event.target.innerHTML+" "+date.getFullYear();
        document.querySelector('.full-date2 span#xmonth').innerHTML = months[date.getMonth()-1];
        document.querySelector('.full-date2 span#xwday').innerHTML = event.target.innerHTML;
        document.querySelector('.full-date2 span#xyear').innerHTML = date.getFullYear();
    }
    else if(event.target.classList.value == "next-date") {
        // document.querySelector('.full-date2').innerHTML = months[date.getMonth()+1]+" "+event.target.innerHTML+" "+date.getFullYear();
        document.querySelector('.full-date2 span#xmonth').innerHTML = months[date.getMonth()+1];
        document.querySelector('.full-date2 span#xwday').innerHTML = event.target.innerHTML;
        document.querySelector('.full-date2 span#xyear').innerHTML = date.getFullYear();
    }
    else {
        // document.querySelector('.full-date2').innerHTML = months[date.getMonth()]+" "+event.target.innerHTML+" "+date.getFullYear();
        document.querySelector('.full-date2 span#xmonth').innerHTML = months[date.getMonth()];
        document.querySelector('.full-date2 span#xwday').innerHTML = event.target.innerHTML;
        document.querySelector('.full-date2 span#xyear').innerHTML = date.getFullYear();
    }

    if(document.querySelector('div.days').classList.contains('selected-date')) {
        document.querySelector('div.days').classList.remove('selected-date');
    }

    $(document).ready(function() {
        $(".today").css({'background-color' : 'aqua'}); //still set to Aqua cuz' haven't found a way to delete or reset.
        $(".selected-date").removeClass("selected-date");
        event.target.classList.add("selected-date");
        $(".full-date1").html($(".full-date2").html());
    });
});

//Listener for Month selection
document.querySelector('div.month').addEventListener('click', (event)=> {
    date.setMonth(event.target.attributes.value.value);
    document.querySelector('.full-date2 span#xmonth').innerHTML = months[event.target.attributes.value.value];
    document.querySelector('.full-date2 span#xwday').innerHTML = "1";
    document.querySelector('.full-date2 span#xyear').innerHTML = date.getFullYear();
    $(".full-date1").html($(".full-date2").html());
    loadCalendar();
    if(date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
        loadCalendar();
    }
    else {
        $(document).ready(function() {
            $('div.days > div').not(".prev-date").first().addClass("selected-date");
        })
    }
    console.log(getSelectedDate());
});

//Listener for Year selection
document.querySelector('.toPrevYear').addEventListener('click', (event)=> {
    document.querySelector('.full-date2 span#xwday').innerHTML = "1";
    document.querySelector('.full-date2 span#xyear').innerHTML = date.getFullYear();
    $(".full-date1").html($(".full-date2").html());
});

document.querySelector('.toNextYear').addEventListener('click', (event)=> {
    document.querySelector('.full-date2 span#xwday').innerHTML = "1";
    document.querySelector('.full-date2 span#xyear').innerHTML = date.getFullYear();
    $(".full-date1").html($(".full-date2").html());
});

/* ////////////////////////////////////MENU CONTAINER SECTION///////////////////////////////////////////// */

//Listener for Menu selection
document.querySelector('div.menu').addEventListener('click', (event)=> {
    let x = event.target.id;
    let tabId, byParam;
    if(x == "button-day") {
        tabId = "day-tab",
        byParam = "byday"
        displayDatabyDay();
    }
    else if(x == "button-week") {
        tabId = "week-tab",
        byParam = "byweek"
        displayDatabyWeek();
    }
    else if(x == "button-month") {
        tabId = "month-tab",
        byParam = "bymonth"
        displayDatabyMonth();
    }
    else if(x == "button-year") {
        tabId = "year-tab",
        byParam = "byyear"
        displayDatabyYear();
    }
    openTabs(event.target, tabId);
});

//Listener for Add Event button
document.querySelector('#button-add-event').addEventListener('click', (event)=> {
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
}

function today() {
    date = new Date();
    loadCalendar();
    setdateString();
    displayDatabyDay();
    openTabs(document.getElementById('button-day'), "day-tab");
}

function closeAddEventDialog() {
    document.getElementById('dialog-form').style.display = "none";
}

/////////////////////////////////RIGHT SIDE CONTAINER SECTION/////////////////////////////////////////////

//Get current selection Day,Month,Year to use as parameters for pulling data from database
function getSelectedDate() {
    let Sday = document.getElementById('xwday').innerText;
    let Smonth = document.getElementById('xmonth').innerText;
    let Syear = document.getElementById('xyear').innerText;
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
    } else {
        document.getElementById(tabId).style.display = "block";
    }
    e.className += ' active';
}

function displayDatabyDay() {

    $('#day-table > tbody > tr').remove();

    let template = 
    "\
    <tr> \
        <td>{{[[--time_start--]]}}</td> \
        <td>{{[[--time_end--]]}}</td> \
        <td>{{[[--event_name--]]}}</td> \
    </tr> \
    ";

    //Retrive data from server side (MySQL Apache)
    $.ajax({
        url: "output/get_data_byday.php",
        type: "POST",
        data: {selectedDate : getSelectedDate()},
        success: function(data) {
            // console.log(data);
            let obj = JSON.parse(data);
            console.log(obj)
            for (let i = 0 ; i < obj.length ; i++) {
                let row = template;
                row = row.replace("{{[[--time_start--]]}}",obj[i].time_start.substring(0,5));
                row = row.replace("{{[[--time_end--]]}}",obj[i].time_end.substring(0,5));
                row = row.replace("{{[[--event_name--]]}}",obj[i].title);
                $('#day-table tbody').append(row)
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

function displayDatabyWeek() {

    $('#week-table > tbody').css({'background-color' : '' , 'border-color' : ''});

    let template = 
    "\
    <tr> \
        <td>{{[[--time_start--]]}}</td> \
        <td>{{[[--time_end--]]}}</td> \
        <td>{{[[--event_name--]]}}</td> \
    </tr> \
    ";

    // <tr id="21:00">
    //     <td>21.00</td>
    //     <td class="wSUN"></td>
    //     <td class="wMON"></td>
    //     <td class="wTUE"></td>
    //     <td class="wWED"></td>
    //     <td class="wTHU"></td>
    //     <td class="wFRI"></td>
    //     <td class="wSAT" style="background-color: yellow;"></td>
    // </tr>

    $.ajax({
        url: "output/get_data_byweek.php",
        type: "POST",
        data: {selectedDate : getSelectedDate()},
        success: function(data) {
            // console.log("DATA: "+data);
            let obj = JSON.parse(data);
            console.log(obj)
            for (let i = 0 ; i < obj.length ; i++) {
                let row = template;
                let weekdayID = "w"+weekdays[new Date(obj[i].date_start).getDay()].toUpperCase();
                let timestart = obj[i].time_start.substring(0,2);
                let timeend = obj[i].time_end.substring(0,2);
                let timecount = obj[i].time_end.substring(0,2) - obj[i].time_start.substring(0,2);
                let color = obj[i].color;

                for(let j = 0 ; j <= timecount ; j++) {
                    let xtimestart = 0;
                    if ((parseInt(timestart)+j) >= 10) {
                        xtimestart = (parseInt(timestart)+j);
                    } else {
                        xtimestart = "0"+(parseInt(timestart)+j);
                    }
                    $(`#${xtimestart}\\:00`).children(`.${weekdayID}`).css({"background-color":`${color}`, "border-color":`${color}`});
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

    $('#month-table > tbody > tr').remove();

    let template = 
    "\
    <tr> \
        <td>{{[[--date_start--]]}}</td> \
        <td>{{[[--event_name--]]}}</td> \
        <td>{{[[--time--]]}}</td> \
    </tr> \
    ";

    $.ajax({
        url: "output/get_data_bymonth.php",
        type: "POST",
        data: {selectedDate : getSelectedDate()},
        success: function(data) {
            // console.log(data);
            let obj = JSON.parse(data);
            console.log(obj)
            for (let i = 0 ; i < obj.length ; i++) {
                let newDateFormat = obj[i].date_start.split('-');
                let row = template;
                row = row.replace("{{[[--date_start--]]}}",newDateFormat[2]+"-"+months[parseInt(newDateFormat[1])-1]);
                row = row.replace("{{[[--event_name--]]}}",obj[i].title);
                row = row.replace("{{[[--time--]]}}",obj[i].time_start.substring(0,5)+"-"+obj[i].time_end.substring(0,5));
                $('#month-table tbody').append(row)
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

function displayDatabyYear() {

    $('.year-inner-days').remove();

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
            console.log(obj)
            let dulplicateEvent = 1;
            for (let i = 0 ; i < obj.length ; i++) {
                // console.log(obj[i]);
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
                // console.log($(`#${m}`)[0].firstElementChild);
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

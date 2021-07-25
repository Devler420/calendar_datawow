//Today's date
const date = new Date();

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
    let mainshowdate = `<span id="xmonth">${xmonth} </span><span id="xwday">${xday}, </span><span id="xyear">${xyear} </span>`;
    document.querySelector(".full-date1").innerHTML = mainshowdate;
    document.querySelector('.full-date2').innerHTML = mainshowdate;
}

//Listener for Date selection
document.querySelector('div.days').addEventListener("click", (event)=> {
    console.log(event.target)
    if(event.target.classList.value == "prev-date") {
        // document.querySelector('.full-date2').innerHTML = months[date.getMonth()-1]+" "+event.target.innerHTML+" "+date.getFullYear();
        document.querySelector('.full-date2 span#xmonth').innerHTML = months[date.getMonth()-1]+" ";
        document.querySelector('.full-date2 span#xwday').innerHTML = event.target.innerHTML+", ";
        document.querySelector('.full-date2 span#xyear').innerHTML = date.getFullYear();
    }
    else if(event.target.classList.value == "next-date") {
        // document.querySelector('.full-date2').innerHTML = months[date.getMonth()+1]+" "+event.target.innerHTML+" "+date.getFullYear();
        document.querySelector('.full-date2 span#xmonth').innerHTML = months[date.getMonth()+1]+" ";
        document.querySelector('.full-date2 span#xwday').innerHTML = event.target.innerHTML+", ";
        document.querySelector('.full-date2 span#xyear').innerHTML = date.getFullYear();
    }
    else {
        // document.querySelector('.full-date2').innerHTML = months[date.getMonth()]+" "+event.target.innerHTML+" "+date.getFullYear();
        document.querySelector('.full-date2 span#xmonth').innerHTML = months[date.getMonth()]+" ";
        document.querySelector('.full-date2 span#xwday').innerHTML = event.target.innerHTML+", ";
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
    document.querySelector('.full-date2 span#xmonth').innerHTML = months[event.target.attributes.value.value]+" ";
    document.querySelector('.full-date2 span#xwday').innerHTML = "1, ";
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
});

//Listener for Year selection
document.querySelector('.toPrevYear').addEventListener('click', (event)=> {
    document.querySelector('.full-date2 span#xwday').innerHTML = "1, ";
    document.querySelector('.full-date2 span#xyear').innerHTML = date.getFullYear();
    $(".full-date1").html($(".full-date2").html());
});

document.querySelector('.toNextYear').addEventListener('click', (event)=> {
    document.querySelector('.full-date2 span#xwday').innerHTML = "1, ";
    document.querySelector('.full-date2 span#xyear').innerHTML = date.getFullYear();
    $(".full-date1").html($(".full-date2").html());
});

/* ////////////////////////////////////MENU CONTAINER SECTION///////////////////////////////////////////// */

//Listener for Menu selection
document.querySelector('div.menu').addEventListener('click', (event)=> {
    let x = event.target.id;
    let tabId;
    if(x == "button-day") {
        tabId = "day-tab"
    }
    else if(x == "button-week") {
        tabId = "week-tab"
    }
    else if(x == "button-month") {
        tabId = "month-tab"
    }
    else if(x == "button-year") {
        tabId = "year-tab"
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

function closeAddEventDialog() {
    document.getElementById('dialog-form').style.display = "none";
}

//EVENT Input dialog
// var dialog = $("#dialog-form").dialog({
//     autoOpen: false,
//     height: 400,
//     width: 300,
//     model: true,
//     buttons: {
//         "Add event": addEvent(),
//         Cancel: function() {
//             dialog.dialog("close");
//         }
//     },
//     close: function() {
//         //somecode for the CLOSE function
//     }
// });

/////////////////////////////////RIGHT SIDE CONTAINER SECTION/////////////////////////////////////////////

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


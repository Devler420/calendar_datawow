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
]

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

//Change full date according to user's input
function setdateString() {
    document.querySelector(".full-date1").innerHTML = date.toDateString().substr(3);
    document.querySelector('.full-date2').innerHTML = date.toDateString().substr(3);
}

//Listener for Date selection
document.querySelector('div.days').addEventListener("click", (event)=> {
    // console.log(event.target.classList.value)
    if(event.target.classList.value == "prev-date") {
        document.querySelector('.full-date2').innerHTML = months[date.getMonth()-1]+" "+event.target.innerHTML+" "+date.getFullYear();
    }
    else if(event.target.classList.value == "next-date") {
        document.querySelector('.full-date2').innerHTML = months[date.getMonth()+1]+" "+event.target.innerHTML+" "+date.getFullYear();
    }
    else {
        document.querySelector('.full-date2').innerHTML = months[date.getMonth()]+" "+event.target.innerHTML+" "+date.getFullYear();
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
    document.querySelector('.full-date2').innerHTML = months[event.target.attributes.value.value]+" 1 "+date.getFullYear();
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
    document.querySelector('.full-date2').innerHTML = months[event.target.attributes.value.value]+" 1 "+date.getFullYear();
    $(".full-date1").html($(".full-date2").html());
});

document.querySelector('.toNextYear').addEventListener('click', (event)=> {
    
});

/////////////////////////////////RIGHT SIDE CONTAINER SECTION/////////////////////////////////////////////
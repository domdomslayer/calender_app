var eventList  = [];
var demoEvent = { year:2022, month:1, day:4, title:"課題提出"};
var demoEvent2 = { year:2022, month:1, day:1, title:"お正月"};
var demoEvent3 = { year:2022, month:1, day:2, title:"20時からアルバイト"};
eventList.push(demoEvent);
eventList.push(demoEvent2);
eventList.push(demoEvent3);


function showEvent(id){
    var year = id.substr(0, 4);
    var month = id.substr(4, 2);
    var day = id.substr(6, 2);
    if(isEvent(year, month-1, day)){
        document.getElementById(id).style.visibility = "visible";
    }
}

function hideEvent(id){
    var year = id.substr(0, 4);
    var month = id.substr(4, 2);
    var day = id.substr(6, 2);
    if(isEvent(year, month-1, day)){
        document.getElementById(id).style.visibility = "hidden";
    }
}

function isEvent(year, month, day){
    for(record in eventList){
        if(eventList[record].year == year && eventList[record].month == (month+1) && eventList[record].day == day){
            return true;
        }
    }
    return false;
}

function addEvent(){
    var eventTitle =  document.getElementById("eventTitle").value;
    var eventDate = document.getElementById("eventDate").value;
    var eventYear = parseInt(eventDate.substr(0, 4));
    var eventMonth = parseInt(eventDate.substr(5, 2));
    var eventDay = parseInt(eventDate.substr(8, 2));
    if(isEvent(eventYear, eventMonth-1, eventDay)){
        alert("予定を登録できるのは1日あたり1件です。");
    }else{
        var newEvent = { year:eventYear, month:eventMonth, day:eventDay, title:eventTitle};
        eventList.push(newEvent);
    }
    document.getElementById("eventTitle").value = "";
    showCalendar(currentMonth, currentYear);
}

function deleteEvent(id){
    var year = id.substr(0, 4);
    var month = id.substr(4, 2);
    var day = id.substr(6, 2);
    var answer = window.confirm(year+'年'+ month +'月'+ day + '日の予定を削除します。よろしいですか？');
    if(answer){
        for(record in eventList){
            if(eventList[record].year == year && eventList[record].month == (month) && eventList[record].day == day){
                eventList.splice(record,1);
                showCalendar(currentMonth, currentYear);
                return;
            }
        }
    }
}

function setEventId(year, month, day){
    var monthStr;
    var dayStr;
    if(month<10){
        monthStr = "0" + (month+1);
    }else{
        monthStr = "" + (month+1)
    }
    if(day<10){
        dayStr = "0" + day;
    }else{
        dayStr = "" + day;
    }
    var eventId = year + monthStr + dayStr;
    return eventId;
}

function getEventTitle(year, month, day){
    for(record in eventList){
        if(eventList[record].year == year && eventList[record].month == (month+1) && eventList[record].day == day){
            return eventList[record].title;
        }
    }
}
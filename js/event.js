var eventList  = [];
var demoEvent = { year:2022, month:1, day:4, title:"課題提出"};
eventList.push(demoEvent)
console.log(eventList);


function showEvent(id){
    var year = id.substr(0, 4);
    var month = id.substr(4, 2);
    var day = id.substr(6, 2);
    console.log(year, month, day);
    if(isEvent(year, month-1, day)){
        document.getElementById(id).style.visibility = "visible";
    }
    
}

function hideEvent(id){
    document.getElementById(id).style.visibility = "hidden";
}

function isEvent(year, month, day){
    for(record in eventList){
        if(eventList[record].year == year && eventList[record].month == (month+1) && eventList[record].day == day){
            return true;
        }
    }
    return false;
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
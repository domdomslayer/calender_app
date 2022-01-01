function showEvent(id){
    var year = id.substr(0, 4);
    var month = id.substr(4, 2);
    var day = id.substr(6, 2);
    document.getElementById(id).innerHTML = "イベントデモ：課題提出日";	
    document.getElementById(id).style.visibility = "visible";
}

function hideEvent(id){
    document.getElementById(id).style.visibility = "hidden";
}

function isEvent(year, month, day){
    for(record in eventList){
        if(record.year == year && record.month == month && record.day == day){
            return true;
        }else{
            return false;
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

var eventList  = [];
var demoEvent = { year:2022, month:1, day:4, title:"課題提出"};
eventList.push(demoEvent)

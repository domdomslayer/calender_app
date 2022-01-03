var eventList  = [];
var demoEvent = { year:2022, month:1, day:4, title:"課題提出"};
var demoEvent2 = { year:2022, month:1, day:1, title:"お正月"};
var demoEvent3 = { year:2022, month:1, day:2, title:"20時からアルバイト"};
eventList.push(demoEvent);
eventList.push(demoEvent2);
eventList.push(demoEvent3);


//データベース設定
var db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});

/*
db.collection("events").where("year", "==", 2022).where("month", "==", 1).where("day", "==", 3).get().then(snapShot => {
    snapShot.forEach(doc => {
      console.log(`${doc.data().year}年${doc.data().month}月${doc.data().day}日：${doc.data().title}`);
    })
})
*/

async function showEvent(id){
    var year = parseInt(id.substr(0, 4));
    var month = parseInt(id.substr(4, 2));
    var day = parseInt(id.substr(6, 2));
    await db.collection("events").where("year", "==", year).where("month", "==", month).where("day", "==", day)
    .get()
    .then((querySnapshot) => {
        if(querySnapshot.size == 1){
            document.getElementById(id).style.visibility = "visible";
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

async function hideEvent(id){
    var year = parseInt(id.substr(0, 4));
    var month = parseInt(id.substr(4, 2));
    var day = parseInt(id.substr(6, 2));
    await db.collection("events").where("year", "==", year).where("month", "==", month).where("day", "==", day)
    .get()
    .then((querySnapshot) => {
        if(querySnapshot.size == 1){
            document.getElementById(id).style.visibility = "hidden";
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

async function isEvent(year, month, day, cell, eventId, eventView, deleteFunc){
    await db.collection("events").where("year", "==", year).where("month", "==", month).where("day", "==", day)
    .get()
    .then((querySnapshot) => {
        if(querySnapshot.size == 1){
            cell.className += " isEvent";
            var eventTitle;
            querySnapshot.forEach(doc => {
                eventTitle = doc.data().title;
              })
            eventView = "<div class ='event' id=\"" + eventId + "\">" + eventTitle + "</div> ";
            if(getMode() == "DELETE"){
                deleteFunc = " onclick=deleteEvent('"+ eventId + "') ";
            }
        }
        cell.innerHTML = "<span" + deleteFunc + "onmouseover=\"showEvent('"+ eventId + "')\" onmouseout=\"hideEvent('"+ eventId + "')\">" + day + "</span>" + eventView;
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

async function addEvent(){
    var eventTitle =  document.getElementById("eventTitle").value;
    var eventDate = document.getElementById("eventDate").value;
    var eventYear = parseInt(eventDate.substr(0, 4));
    var eventMonth = parseInt(eventDate.substr(5, 2));
    var eventDay = parseInt(eventDate.substr(8, 2));

    await db.collection("events").where("year", "==", eventYear).where("month", "==", eventMonth).where("day", "==", eventDay)
    .get()
    .then((querySnapshot) => {
        if(querySnapshot.size == 1){
            alert("予定を登録できるのは1日あたり1件です。");
        }else{
            var newEvent = { year:eventYear, month:eventMonth, day:eventDay, title:eventTitle};
            db.collection("events").add(newEvent)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }

        document.getElementById("eventTitle").value = "";
        reload();
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
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
                reload();
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
    var eventTitle =  db.collection("events").where("year", "==", 2022).where("month", "==", 1).where("day", "==", 3).get().then(snapShot => {
        snapShot.forEach(doc => {
            return doc.data().title;
        })
    });
    //console.log(year, month, day, eventTitle);
    return eventTitle;


}

/*
deleteEvent()
*/
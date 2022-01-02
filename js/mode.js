//閲覧モードか削除モードか
document.getElementsByClassName("toViewMode-Button")[0].style.display = "none";
document.getElementsByClassName("toViewMode-Button")[1].style.display = "none";
var mode = "VIEW";

function getMode(){
    return mode;
}

function toDeleteMode(){
    document.getElementsByClassName("toViewMode-Button")[0].style.display = "inline";
    document.getElementsByClassName("toViewMode-Button")[1].style.display = "inline";
    document.getElementsByClassName("toDeleteMode-Button")[0].style.display = "none";
    document.getElementsByClassName("toDeleteMode-Button")[1].style.display = "none";
    mode = "DELETE";
    showCalendar(currentMonth, currentYear);
}

function toViewMode(){
    document.getElementsByClassName("toDeleteMode-Button")[0].style.display = "inline";
    document.getElementsByClassName("toDeleteMode-Button")[1].style.display = "inline";
    document.getElementsByClassName("toViewMode-Button")[0].style.display = "none";
    document.getElementsByClassName("toViewMode-Button")[1].style.display = "none";
    mode = "VIEW";
    showCalendar(currentMonth, currentYear);
}
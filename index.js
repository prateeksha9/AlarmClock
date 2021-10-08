const display = document.getElementById('clock');
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;

let alarmTime = null;
let alarmTimeout = null;

const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.setAlarm')
const alarmList = [];
let count =1;
const clear = document.getElementsByClassName('clear-alarm')



// function to play the alarm at correct time
function ringing(now){
    audio.play();
    alert(notify)
    // remove(now);
}


// function to update time and check the array constantly
function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const now = `${hour}:${minutes}`;
    // console.log(seconds)

    display.innerText=`${hour} : ${minutes}`;
    if(alarmList.includes(now) && count === 1){
        count = count + 1;
        ringing(now);
    } else if( seconds === 59){
        count = 1;
        

    }
}


// set the correct format of time
function formatTime(time) {
    if ( time < 10 ) {
        return '0' + time;
    }
    return time;
}


// function to clear alarm
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}      


// event to Delete a particular alarm
myList.addEventListener('click', e=> {
    console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})


// remove an alarm from the array
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                  // Clear contents
    alarmList.push.apply(alarmList, newList);
    
    console.log("newList", newList);
    console.log("alarmList", alarmList);
}


// display new alarm on webpage
function showNewAlarm(newAlarm){
    
    const html =`
    <li class = "time-list">
        
            <span class="time">${newAlarm}</span>
            <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>    
            
    </li>`
    myList.innerHTML += html
};


// event to set a new alarm when a form is submitted and added to the array
addAlarm.addEventListener('submit', e=> {
    e.preventDefault();
    const newAlarm = addAlarm.alarmTime.value;
    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else{
        alert("Invalid Time Entered")
    }
            
})

setInterval(updateTime, 1000);








// function setAlarm() {
//     if(alarmTime) {
//         const current = new Date();
//         const timeToAlarm = new Date(alarmTime);

//         if (timeToAlarm > current) {
//             const timeout = timeToAlarm.getTime() - current.getTime();
//             alarmTimeout = setTimeout(() => audio.play(), timeout);
//             alert('Alarm set');
//         }
//     }
// }

// function setAlarmTime(value) {
//     alarmTime = value;
// }
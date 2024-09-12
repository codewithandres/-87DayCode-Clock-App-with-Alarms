const Elementclock = {
    clock: document.querySelector('.clock'),
    hourHand: document.querySelector('.hour--hand'),
    minuteHand: document.querySelector('.mainute--hand'),
    secondHand: document.querySelector('.secont--hand'),
    am: document.querySelector('.am'),
    pm: document.querySelector('.pm'),
};

const ringAlarm = () => {
    alarmRing = true;
    const audioAlarm = new Audio('./assets/alarm.mp3');
    audioAlarm.play;

    audioAlarm.addEventListener('ended', () => {
        alarmRing = false;
    });
};

let alarmRing = false;

const setTime = ({ secondHand, minuteHand, hourHand, am, pm }) => {
    const now = new Date();
    const today = now.getDay();

    const seconds = now.getSeconds();
    const secondsDegrees = (seconds / 60) * 360 + 180;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const minutes = now.getMinutes();
    const minutesDegrees = (minutes / 60) * 360 + 180;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

    const hours = now.getHours();
    const hourDegrees = (hours / 60) * 360 + 180;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    if (hours >= 12) {
        am.classList.remove('active');
        pm.classList.add('active');
    } else {
        am.classList.add('active');
        pm.classList.remove('active');
    }

    let minutesString = minutes.toString();
    if (minutesString.length < 2) {
        minutesString = `0  + ${minutesString}`;
    }
    let hourString = hours.toString();
    if (hourString.length < 2) {
        hourString = `0  + ${hourString}`;
    }

    alarms.map(({ days, time, active }) => {
        let dayMacht = false;

        days.map(day => {
            if (day === today) {
                dayMacht = true;
            }
        });

        if (
            time === `${hourString}:${minutesString}` &&
            active &&
            dayMacht &&
            alarmRing === false
        )
            ringAlarm();
    });

    const tick = new Audio('./assets/tick.mp3');
    tick.play;
};

const alarms = [
    {
        id: 1,
        time: '9:47',
        name: 'Wake up',
        active: true,
        days: [1, 2, 3, 4, 5, 6],
    },
    {
        id: 2,
        time: '12:00',
        name: 'Wake up',
        active: false,
        days: [1, 2, 3, 4, 5, 6],
    },
    {
        id: 3,
        time: '12:00',
        name: 'Wake up',
        active: false,
        days: [1, 2, 3, 4, 5, 6],
    },
    {
        id: 4,
        time: '12:00',
        name: 'Wake up',
        active: false,
        days: [1, 2, 3, 4, 5],
    },
    {
        id: 5,
        time: '12:00',
        name: 'Wake up',
        active: false,
        days: [1, 2, 3, 4, 5],
    },
    {
        id: 6,
        time: '12:00',
        name: 'Wake up',
        active: false,
        days: [1, 2, 3, 4, 5],
    },
    {
        id: 7,
        time: '12:00',
        name: 'Wake up',
        active: false,
        days: [1, 2, 3, 4, 5],
    },
];

const alarmList = document.querySelector('.alarms');

const dayName = day => ['L', 'M', 'M', 'J', 'V', 'S', 'D'][day];

const initAlarm = () => {
    if (!alarms.length)
        alarmList.innerHTML = `<div class="no-alarms">No Alarms, click on below + button to  add one </div> `;

    alarms.map(({ days, id, name, time, active }) => {
        const alarmElement = document.createElement('div');
        alarmElement.classList.add('alarm');
        alarmElement.dataset.id = id;

        let alarmDays = '';

        days.map(day => {
            const dayeLeater = dayName(day);
            alarmDays += `<div class="day">${dayeLeater}</div>`;
        });

        const activeAAlarm = active ? 'checked' : '';
        alarmElement.innerHTML = ` 
               <div class="head">
                    <div class="name">${name}</div>
                </div>
                <div class="body">
                    <div class="left">
                        <div class="time">${time}</div>
                         <label class="toggle">
                            <input type="checkbox" class="checkbox" hidden ${activeAAlarm} />
                            <div class="track"></div>
                            <div class="thumb"></div>
                        </label>
                    </div>

                    <div class="days">${alarmDays}</div>
                </div>
                <div class="delete">
                    <i class="ri-delete-bin-4-line icon--delete"></i>
                </div> 
        `;
        alarmList.appendChild(alarmElement);
    });
};
// funcionality to delete allarm or active inactive

alarmList.addEventListener('click', event => {
    if (event.target.closest('.checkbox')) {
        const alarmID = parseInt(event.target.closest('.alarm').dataset.id);
        const alarm = alarms.find(alarm => alarm.id === alarmID);

        alarm.active = !alarm.active;
    }
    if (event.target.closest('.delete')) {
        const alarmID = parseInt(event.target.closest('.alarm').dataset.id);
        const alarm = alarms.find(alarm => alarm.id === alarmID);

        alarms.splice(alarms.indexOf(alarm), 1);
        alarmList.removeChild(event.target.closest('.alarm'));
    }
});

initAlarm();

const initClock = ({ clock }) => {
    const numbers = clock.querySelector('.numbers');
    const lines = clock.querySelector('.lines');

    for (let i = 1; i <= 12; i++) {
        numbers.innerHTML += ` <div class="number" style="--i: ${i}"><span>${i}</span></div>`;
        lines.innerHTML += ` <div class="line" style="--i: ${i}"></div>`;
    }
    setInterval(() => setTime(Elementclock), 1000);
};

initClock(Elementclock);

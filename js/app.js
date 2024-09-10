const Elementclock = {
    clock: document.querySelector('.clock'),
    hourHand: document.querySelector('.hour--hand'),
    minuteHand: document.querySelector('.mainute--hand'),
    secondHand: document.querySelector('.secont--hand'),
    am: document.querySelector('.am'),
    pm: document.querySelector('.pm'),
};

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
};

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

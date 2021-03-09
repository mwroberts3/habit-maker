function loadHabits(token) {
    let currentDate = new Date(new Date().getTime());
    currentDate.setHours(0,0,0,0);

    fetch(`http://${localIP ? localIP : 'localhost'}:5050/habits`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
            Timestamp: currentDate
        }
    })
    .then(res => res.json())
    .then(habits => {
    if (habits.message == "jwt expired") {
        localStorage.removeItem('token');
        loginMain.classList.remove('hidden');
        afterAuthMain.classList.add('hidden');
        authError.textContent = 'session expired';
    } else {
        habits.forEach(habit => {
            // check to see if habit has already been updated during calander day
            let alreadyUpdated;
            habit.updatedToday ? alreadyUpdated = 'already-updated' : '';

            let activeHabit;
            habit.active ? activeHabit = 'active' : activeHabit = 'passive';

            habitList.innerHTML += `
            <div class="habit-card habit-card-${habit.description} ${alreadyUpdated}">
                <p class="description">${habit.description}</p>
                <p class="${activeHabit}">${activeHabit}</p>
                <p class="goal">Goal: ${habit.daysLogged} / ${habit.goal} (${habit.daysLeft})</p>
                <div class="delete-habit-btn">X</div>
            </div>
        `;
            updatedTodayCheck(habit);
        })

    }
    newHabitBtn.classList.remove('hidden');
    return habits;
})
.then((habits) => {
    const deleteBtns = document.querySelectorAll('.delete-habit-btn');
    timeCheck(habits, token);

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
        deleteHabit(e.target.parentNode.children[0].textContent, token);
        });
    });
})
.then(() => {
    let habitCards = document.querySelectorAll('.habit-card');

    habitCards.forEach((card) => {
        card.addEventListener('click', (e) => {
            let habitDescription;
            if (e.target.parentNode.tagName === 'DIV') {
                habitDescription = e.target.parentNode.classList[1].substring(11);
            } else {
                habitDescription = e.target.classList[1].substring(11);
            }
            
            if (!card.classList.contains('already-updated')) {
                card.classList.add('already-updated');
                logHabit(habitDescription);
            }
        });
    });
})
.catch(err => console.log(err));
}

function logHabit(habitDescription) {
    let lastUpdated = new Date(new Date().getTime());
    lastUpdated.setHours(0,0,0,0);
    console.log(lastUpdated);

    // I guess need to check this new date against the previous lastUpdated date to see if it's the following calender day

    // as of 2/26 both the createdAt property and lastUpdated property are dialed back to 12AM of the current day

    fetch(`http://${localIP ? localIP : 'localhost'}:5050/habits/log-habit`, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + activeToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            habitDesc: habitDescription,
            lastUpdated
        })
    })
    .then((res) => {
        return res.json();
    })
    .then(habit => {
        // need to check if goal has been reached
        console.log(habit);
        updatedTodayCheck(habit);
        habitList.innerHTML = '';
        loadHabits(activeToken);
    })
    .catch(err => console.log(err))
}

function timeCheck(habits, token) {  
    // probably need to check each habit for lastUpdate and once clock rolls over past midnight have them reset...
    // I guess this only really comes into play if the app is left running and a realtime change is necessary
    console.log(habits);

    const timeRemainingDisplay = document.getElementById('time-remaining-display');

    // get timestamp of current date at 12am
    startOfDay = new Date(Date.now());
    startOfDay.setHours(0,0,0,0);
    
    let minutes = 1440 - ((Date.now() - startOfDay.getTime()) / (1000 * 60)).toFixed(0);
    let hours = Math.floor(minutes/60);

    if (minutes - hours * 60 < 10) {
        timeRemainingDisplay.textContent = `${hours}:0${minutes - hours * 60}`;
    } else {
        timeRemainingDisplay.textContent = `${hours}:${minutes - hours * 60}`;
    } 

    setInterval(() => {
        // probably need to check each habit for lastUpdate and once clock rolls over past midnight have them reset...
        // I guess this only really comes into play if the app is left running and a realtime change is necessary
        console.log(habits);
        
        // get hours and minutes left in the day
        minutes = 1440 - ((Date.now() - startOfDay.getTime()) / (1000 * 60)).toFixed(0);
        hours = Math.floor(minutes/60);

        if (minutes - hours * 60 < 10) {
            timeRemainingDisplay.textContent = `${hours}:0${minutes - hours * 60}`;
        } else {
            timeRemainingDisplay.textContent = `${hours}:${minutes - hours * 60}`;
        } 

        if (minutes == 0) {
            fetch(`http://${localIP ? localIP : 'localhost'}:5050/habits/times-up`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(habits)
            })
            .then(() => {
                habitList.innerHTML = '';
                loadHabits(token);
            })
        }

        // updatedTodayCheck(habit);
    }, 30000) 
}

function updatedTodayCheck(habit) {
    // also need to live update goal dayspassed, streak and skip days

    if (habit.updatedToday && habit.active) {
        // For active hobbies
        document.querySelector(`.habit-card-${habit.description}`).classList.add('logged','logged-active');
    } else if (habit.updatedToday && !habit.active) {
        // for passive hobbies
        document.querySelector(`.habit-card-${habit.description}`).classList.add('logged', 'logged-passive');
    }
}

function deleteHabit(habitDesc, token) {
    fetch(`http://${localIP ? localIP : 'localhost'}:5050/habits/delete-habit`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ description: habitDesc })
    })
    .then(() => {
        location.reload();
    })
    .catch(err => console.log(err));
}
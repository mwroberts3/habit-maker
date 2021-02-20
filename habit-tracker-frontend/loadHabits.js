const login = document.getElementById('login'),
loginEmail = document.getElementById('login-email'),
loginPassword = document.getElementById('login-pw'),
loginBtn = document.getElementById('login-submit'),
signUpBtn = document.getElementById('signup-submit'),
signUpConfirmPw = document.getElementById('signup-confirm-pw'),
loginSignUpForm = document.getElementById('login-signup-form'),
authError = document.getElementById('auth-error');

const loginMain = document.getElementById('login-main'),
afterAuthMain = document.getElementById('after-auth-main');

const newHabitBtn = document.getElementById('new-habit-btn'),
newHabitFormOverlay = document.getElementById('habit-form-overlay'),
submitNewHabitBtn = document.getElementById('submit-new-habit'),
newHabitForm = document.getElementById('new-habit-form');

const habitList = document.getElementById('habit-list');

// Check for existing token data


// Signup for new account
signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (signUpConfirmPw.classList.contains('hidden')) {
        signUpConfirmPw.classList.remove('hidden');
        loginBtn.classList.add('hidden');
        signUpBtn.textContent = 'Confirm';
    } else {
        fetch('http://localhost:5050/signup', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": loginEmail.value,
                "password": loginPassword.value,
                "confirmPassword": signUpConfirmPw.children[0].value,
            })
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            if (res.token) {
                localStorage.setItem('token', res.token);
                loginMain.classList.add('hidden');
                habitList.innerHTML = '';
                afterAuthMain.classList.remove('hidden');
                loadHabits(res.token);
            } else {
                authError.textContent = res.message;
            }
        })
        .catch(err => console.log(err));
    };
});

// Load habits after loggin in
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();

    fetch('http://localhost:5050/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": loginEmail.value,
            "password": loginPassword.value
        })
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        if (res.token) {
            localStorage.setItem('token', res.token);
            loginMain.classList.add('hidden');
            habitList.innerHTML = '';
            afterAuthMain.classList.remove('hidden');
            loadHabits(res.token);
        } else {
            authError.textContent = res.message;
        }
    })
    .catch(err => console.log(err));
});

// add & submit new habit
newHabitBtn.addEventListener('click', () => {
    newHabitFormOverlay.classList.remove('hidden');
});

newHabitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const activeToken = localStorage.getItem('token');
    const formData = new FormData(newHabitForm);
    let formDataObj = {};

    for (let key of formData.keys()) {
        formDataObj[key] = formData.get(key);
    }    

    fetch('http://localhost:5050/habits/add-habit', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + activeToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObj)
    });

    newHabitFormOverlay.classList.add('hidden');
    habitList.innerHTML = '';
    loadHabits(localStorage.getItem('token'));
});

function loadHabits(token) {
    if (token) {
        fetch('http://localhost:5050/habits', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(res => res.json())
        .then(habits => {
        habits.forEach(habit => {
            console.log(habit);
            let activeHabit;
            habit.active ? activeHabit = 'active' : activeHabit = 'passive';

            if (habit.skipDays.option) {
                habitList.innerHTML += `
                <div class="habit-card">
                    <p class="description">${habit.description}</p>
                    <p class="${activeHabit}">${activeHabit}</p>
                    <p class="createdAt">${habit.createdAt.substring(0, 10)}</p>
                    <p class="goal">Goal: ${habit.goal}</p>
                    <p class="streak">Streak: ${habit.streak}</p>
                    <p class="skipDays">Skips Days: ${habit.skipDays.count}(${habit.skipDays.streakUnlock})</p>
                </div>
            `;
            } else {
                habitList.innerHTML += 
                `<div class="habit-card">
                    <p class="description">${habit.description}</p>
                    <p class="${activeHabit}">${activeHabit}</p>
                    <p class="createdAt">${habit.createdAt.substring(0, 10)}</p>
                    <p class="goal">Goal: ${habit.goal}</p>
                    <p class="streak">Streak: ${habit.streak}</p>
                </div>`
            }
        })
        newHabitBtn.classList.remove('hidden');
    })
    .catch(err => console.log(err));
}}

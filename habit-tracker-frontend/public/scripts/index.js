// check for localIP
if (typeof localIP === 'undefined') {
    localIP = null;
};

const login = document.getElementById('login'),
loginEmail = document.getElementById('login-email'),
loginPassword = document.getElementById('login-pw'),
loginBtn = document.getElementById('login-submit'),
signUpBtn = document.getElementById('signup-submit'),
signUpConfirmPw = document.getElementById('signup-confirm-pw'),
loginSignUpForm = document.getElementById('login-signup-form'),
logoutBtn = document.getElementById('logout-btn'),
authError = document.getElementById('auth-error'),
storeSessionCheckbox = document.getElementById('store-session-checkbox'),
rememberMeContainer = document.getElementById('remember-me-container');

const loginMain = document.getElementById('login-main'),
afterAuthMain = document.getElementById('after-auth-main');

const newHabitBtn = document.getElementById('new-habit-btn'),
newHabitFormOverlay = document.getElementById('habit-form-overlay'),
newHabitForm = document.getElementById('new-habit-form');

const habitList = document.getElementById('habit-list');

let activeToken;

// Check for existing token data
if (localStorage.getItem('token')) {
    activeToken = localStorage.getItem('token');

    loginMain.classList.add('hidden');
    habitList.innerHTML = '';
    afterAuthMain.classList.remove('hidden');
    loadHabits(activeToken);
};

// Signup for new account
signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (signUpConfirmPw.classList.contains('hidden')) {
        signUpConfirmPw.classList.remove('hidden');
        loginBtn.classList.add('hidden');
        rememberMeContainer.classList.add('hidden');
        signUpBtn.textContent = 'Confirm';
    } else {
        fetch(`http://${localIP ? localIP : 'localhost'}:5050/signup`, {
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

    fetch(`http://${localIP ? localIP : 'localhost'}:5050/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: loginEmail.value,
            password: loginPassword.value,
            rememberMe: storeSessionCheckbox.checked 
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
    if (newHabitFormOverlay.classList.contains('hidden')) {
        newHabitBtn.textContent = 'Close';
    } else {
        newHabitBtn.textContent = 'Add Habit';
    }
    newHabitFormOverlay.classList.toggle('hidden');
});

newHabitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(newHabitForm);
    let formDataObj = {};

    // add local timezone date
    let date = new Date(new Date(Date.now()).getTime());
    date = date.setHours(0,0,0,0);
    formData.append('createdAtDate', new Date(date));

    for (let key of formData.keys()) {
        formDataObj[key] = formData.get(key);
    }    

    fetch(`http://${localIP ? localIP : 'localhost'}:5050/habits/add-habit`, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + activeToken,
            'Content-Type': 'application/json',
            Timestamp: new Date(date)
        },
        body: JSON.stringify(formDataObj)
    })
    .then(() => {
        newHabitBtn.textContent = 'Add Habit';
        newHabitFormOverlay.classList.add('hidden');
        habitList.innerHTML = '';
        loadHabits(localStorage.getItem('token'));
    })
    .catch(err => console.log(err));

});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    location.reload();
});

// log habit for the day
// when clicking a habit from the view habit page, should change updatedToday to true in database
let habitCards = document.querySelectorAll('.habit-card');

habitCards.forEach((card) => {
    console.log(card);
    card.addEventListener('click', (e) => {
        logHabit(e);
    });
});

